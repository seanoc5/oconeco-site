# Email migration — captured Phase 1 outputs

In-flight scratchpad for the Google Workspace migration (issue #19). This file holds the values produced during **Phase 1** (Google Workspace setup) that will be applied at GoDaddy during **Phase 4** (DNS cutover). Once Phase 5 completes, fold these into `docs/dns-hygiene.md` and delete this file.

**Do not apply any record below to GoDaddy yet** unless explicitly marked "already applied."

---

## Mailboxes (Phase 1 step 3 — DONE)

| Address | Role | Status |
|---|---|---|
| `sean@oconeco.com` | Super Admin | created in Workspace; backup from WorkMail still pending (Phase 2) |
| `john@oconeco.com` | User | created in Workspace; backup from WorkMail still pending (Phase 2) |
| `carol@oconeco.com` | User | created in Workspace; **no WorkMail backup** (fresh mailbox) |

---

## Domain verification (Phase 1 step 2 — DONE, already in DNS)

**Record present at GoDaddy now:**
- Type: TXT
- Name: `oconeco.com` (apex)
- Value: `google-site-verification=DMLxRfgQdb1LwU9I-bGhljLZbbmG0IKnSLe4bmgZpvg`

Applied automatically via the Google × GoDaddy signup partnership during Workspace signup. **Keep this record indefinitely** — Google occasionally re-verifies.

---

## DKIM (Phase 1 step 4 — generated, NOT yet applied to DNS)

- **Selector:** `google`
- **DNS host (TXT name):** `google._domainkey.oconeco.com`
- **Bit length:** 2048
- **Generated:** 2026-05-29

**TXT value (to apply at GoDaddy in Phase 4):**

```
v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAn02bxEoWyR1HCOePKC10xVo+qponDUQaJT81AWQZjBmkVYiJG9FbX8Srj8QPRe0/ffkdNX8ujUoRarAeFFF1BR/EI4CFAVJLoDXd9ESO/wsx+z/hCuN8BQibpSSXsGVl2B7V4K7MFPRkhiaxLHbXPBJbm4faYFDhWEFfqbuLmd31XgdRgu4n7FWhAAuvM7alnZxs6BbYrbblPoB3Q7jrvsZPdAcpJFUCMy9JC8B8XIFsxzbRdIJIZ1pqNZixQUHOZYx9HJRJLWQ5Dxnr4QaZPpYkCF+HdBr4iiQa1WRontJ247wmIWhCsc3V2C1ff+miNuhp+gKNSzP7CTs06Q1SiwIDAQAB
```

**Length note:** This value exceeds the 255-character per-string limit for a TXT record (RFC 1035). A single TXT RR must be split into multiple quoted strings. GoDaddy's UI auto-splits when you paste the full string; Cloudflare's UI also auto-splits. **Don't manually pre-split** — paste the whole thing as-is and trust the UI.

**Important:** The `Start authentication` button in Google Workspace Admin (Apps → Google Workspace → Gmail → Authenticate email) **must not be clicked yet**. That tells Google to begin signing outbound mail with DKIM — only relevant once the TXT is at GoDaddy and Phase 4 cutover is underway.

---

## Target MX (Phase 4 cutover — NOT yet applied)

| Field | Value |
|---|---|
| Type | MX |
| Name | `oconeco.com` (apex) |
| Priority | `1` |
| Value | `SMTP.GOOGLE.COM.` (trailing dot if your UI requires FQDN form) |
| TTL | 300 (during cutover; raise to 3600 after stable) |

This single-record MX replaced the older 5-record set (`ASPMX.L.GOOGLE.COM`, `ALT1.ASPMX.L.GOOGLE.COM`, etc.) in 2023. **Do not add the old records** — single MX is all that's needed.

---

## Target SPF (Phase 4)

| Field | Value |
|---|---|
| Type | TXT |
| Name | `oconeco.com` (apex) |
| Value | `v=spf1 include:_spf.google.com ~all` |

Note `~all` (soft fail) initially. Move to `-all` (hard fail) after a few weeks of clean delivery, once you're confident no third-party services need to send "from" oconeco.com.

---

## Target DMARC (Phase 4)

| Field | Value |
|---|---|
| Type | TXT |
| Name | `_dmarc.oconeco.com` |
| Value | `v=DMARC1; p=quarantine; rua=mailto:postmaster@oconeco.com; pct=100;` |

Start at `p=quarantine`, not `p=reject`. After a week of clean delivery + DMARC aggregate reports show no surprises, tighten to `p=reject`.

---

## Current state at GoDaddy DNS (pre-cutover — verified 2026-05-29)

- **MX:** `10 inbound-smtp.us-east-1.amazonaws.com.` (WorkMail — still live)
- **SPF:** not present
- **DMARC:** not present
- **DKIM at `google._domainkey`:** not present
- **TXT at apex:** only the Google verification TXT above

Mail flows through WorkMail. The Google Workspace mailboxes exist but receive no mail until Phase 4.

---

## Phase 4 cutover checklist (when ready, after Phase 2 + 3 complete)

1. Lower TTL on current WorkMail MX at GoDaddy to 300 seconds. Wait 24 hours.
2. Final Docker imapsync pass per mailbox (sean@, john@) so Google has every message.
3. At GoDaddy DNS:
   - Delete WorkMail MX
   - Add MX `1 SMTP.GOOGLE.COM.`
   - Add SPF TXT at apex (value above)
   - Add DKIM TXT at `google._domainkey` (value above)
   - Add DMARC TXT at `_dmarc` (value above)
4. Wait 30 minutes for propagation.
5. Verify with the dig commands below.
6. In Google Workspace Admin → Apps → Gmail → Authenticate email → click **Start authentication** (this is the right time).
7. Send mail-tester.com test from sean@oconeco.com — target 10/10.

---

## Verification (run after Phase 4 cutover, NOT now)

```bash
dig +short MX oconeco.com @1.1.1.1
# expect: 1 smtp.google.com.

dig +short TXT oconeco.com @1.1.1.1
# expect: google-site-verification AND v=spf1 include:_spf.google.com ~all

dig +short TXT google._domainkey.oconeco.com @1.1.1.1
# expect: the DKIM TXT (may be returned as multiple concatenated strings)

dig +short TXT _dmarc.oconeco.com @1.1.1.1
# expect: v=DMARC1; p=quarantine; rua=mailto:postmaster@oconeco.com; pct=100;
```
