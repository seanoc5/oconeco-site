# DNS Hygiene Runbook — oconeco.com

Operational runbook for the records that should exist at the registrar / Cloudflare DNS dashboard to harden the domain against email spoofing and clarify its non-email posture.

This is a **runbook for Sean** (domain owner). Agents cannot apply these records — only the dashboard owner can. Verification commands at the end let Sean confirm each change after applying.

The baseline audit (`context/raw/report.pdf`) flagged **Technical / Domain Health: 62/D-** because SPF was not detected. The records below address that finding.

## 1. SPF — `v=spf1 -all`

**Record:** TXT at the apex (`oconeco.com`)

**Value:**
```
v=spf1 -all
```

**Why this exact value:** `oconeco.com` does not currently send email (per `context/raw/please-help-me-think-shiny-bunny.md`). The strictest valid SPF is therefore `-all` with no authorized senders — any host claiming to send mail "from" oconeco.com is unauthorized, and receivers should hard-fail it. This is the textbook configuration for a non-sending domain and closes the gap the audit flagged.

If/when oconeco.com starts sending email (e.g. through a transactional provider), revisit this record to include the provider's `include:` mechanism before the `-all`.

## 2. DMARC — `p=reject`

**Record:** TXT at `_dmarc.oconeco.com`

**Value:**
```
v=DMARC1; p=reject; rua=mailto:postmaster@oconeco.com;
```

**Why:** DMARC tells receivers what to do when SPF/DKIM fail. `p=reject` is the strongest policy and is appropriate for a non-sending domain — there should be no legitimate mail to deliver in the first place.

**Caveat on `rua`:** The aggregate-report mailbox (`postmaster@oconeco.com`) must actually exist, or DMARC reports will bounce and large receivers may eventually stop sending them. Options:

- Create a `postmaster@` mailbox (or alias) that can receive mail. This requires MX records (see §4) — adding them just to receive DMARC reports is fine.
- Use a free DMARC aggregation service such as **dmarcian** or **Postmark DMARC** and point `rua` at the address they provide. This is the lower-maintenance option.
- Omit `rua` entirely — the policy still enforces, you just lose visibility into spoofing attempts.

## 3. DKIM — N/A (placeholder)

**No DKIM record is needed** while oconeco.com is not sending email. DKIM is set up per sending source (e.g. by the transactional email provider) when email starts flowing.

When that day comes, the provider will give Sean a CNAME or TXT record to publish at a selector subdomain like `<selector>._domainkey.oconeco.com`.

## 4. MX records — absent (intentional)

**No MX records should exist** as long as oconeco.com is not receiving email. Absence of MX means receivers know not to attempt delivery.

The exception is if Sean adopts option (i) under §2 (real `postmaster@` mailbox to receive DMARC reports) — at that point MX records pointing at the chosen mail provider become required.

## Verification

After applying records at the registrar/Cloudflare dashboard, verify from any shell:

```bash
dig +short TXT oconeco.com           # expect: "v=spf1 -all"
dig +short TXT _dmarc.oconeco.com    # expect: DMARC TXT
dig +short MX oconeco.com            # expect: empty (no email)
```

DNS propagation is usually under a minute on Cloudflare but can take up to the TTL on older caches. If `dig` returns nothing immediately, retry against `@1.1.1.1` or `@8.8.8.8` to bypass any local resolver caching:

```bash
dig +short TXT oconeco.com @1.1.1.1
```

## Related

- Audit findings: `context/raw/report.pdf` (Technical / Domain Health: 62/D-)
- Non-email posture: `context/raw/please-help-me-think-shiny-bunny.md`
