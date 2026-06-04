---
title: "About"
slug: "about"
description: "OconEco was founded by John O'Connor — 60 years of designing national-scale measurement systems, from IMF 1964 to FAND today."
sectionContext: "John O'Connor's lineage, OconEco's research note, and how to work with us."
---

> **Strawman.** Replaces the legacy `/about-us/` once IA is approved. Per Website Brief §"About" — career timeline + AI-augmented workflow note + contact.

# About OconEco

OconEco was founded by John O'Connor. The career timeline below spans 60 years of designing decision-support systems for measuring what countries — and later, smaller jurisdictions — actually have.

## Career timeline

| Year | Role | Institution |
|---|---|---|
| **1964** | Joined as one of the first designers of computerized economic data systems | IMF |
| **1968** | Contributor to the System of National Accounts (SNA) | UN Statistical Commission |
| **1970s** | Field work on national accounting in Bolivia and other Latin American economies | IMF |
| **1986** | Chief of Comparative Analysis and Data; built the World Bank DataBank | World Bank |
| **1995** | Led MEP 1995 — the methodological program that pioneered the *Changing Wealth of Nations* | World Bank |
| **2006–present** | Founder, OconEco. Long-form development of the FAND balance-sheet framework. | OconEco |
| **2025–present** | FAND public release: 200+ countries, 1950–2025, plus US state and county extensions | OconEco |

FAND is the continuation of MEP 1995 — what the Changing Wealth of Nations would look like if you could rebuild it with modern data, modern compute, and the lessons of three decades watching what worked and what didn't.

## AI-augmented research

FAND's pace and breadth — 128 builder scripts, 200+ countries, 3,258 US counties, a closed balance-sheet identity verified to $0.000000 — would not be possible without close collaboration with AI tooling. The methodological decisions are John's; the codification, validation, and documentation are done in tight loops with AI assistants. The decision is John's; the typing is shared. We say this explicitly because the institutional audience deserves to know how the work gets done.

## Contact

The contact form lives at [/contact/](/contact/).

*(Placeholder. Replace with the About content packet — portrait, sharpened timeline entries, and finalized AI-augmented workflow note.)*

## Working with OconEco

OconEco's commercial work brings the FAND framework to specific decisions where comprehensive wealth accounting outperforms GDP-anchored analysis. Typical engagements include regional balance-sheet assessments for economic-development authorities, place-based capital-allocation reviews for institutional investors, and analytic-tool design for organizations managing natural-resource or human-capital portfolios.

We're based in NE Florida and take a small number of new engagements per quarter. To discuss whether your problem fits, use the form below — or email Sean O'Connor at [sean@oconeco.com](mailto:sean@oconeco.com) directly. Either way, please include a one-paragraph description of the decision you're trying to inform.

<div id="contact" class="contact-form-wrapper">

<div id="contact-thanks" class="contact-thanks" role="status" hidden>
  <p><strong>Thanks — your message is in.</strong> Sean will reply from <em>sean@oconeco.com</em> within a few business days. If you don't hear back, check your spam folder or email directly.</p>
</div>

<div id="contact-error" class="contact-error" role="alert" hidden>
  <p><strong>Something went wrong.</strong> Please email <a href="mailto:sean@oconeco.com">sean@oconeco.com</a> directly.</p>
</div>

<form id="contact-form" class="contact-form" method="post" action="/api/contact" novalidate>
  <div class="contact-field">
    <label for="cf-name">Your name</label>
    <input id="cf-name" name="name" type="text" required maxlength="200" autocomplete="name" />
  </div>

  <div class="contact-field">
    <label for="cf-email">Your email</label>
    <input id="cf-email" name="email" type="email" required maxlength="200" autocomplete="email" />
  </div>

  <div class="contact-field">
    <label for="cf-org">Organization <span class="contact-optional">(optional)</span></label>
    <input id="cf-org" name="organization" type="text" maxlength="200" autocomplete="organization" />
  </div>

  <div class="contact-field">
    <label for="cf-message">One paragraph describing the decision you're trying to inform</label>
    <textarea id="cf-message" name="message" rows="6" required minlength="20" maxlength="5000"></textarea>
  </div>

  <div class="contact-hp" aria-hidden="true">
    <label>If you're human, leave this blank<input type="text" name="website" tabindex="-1" autocomplete="off" /></label>
  </div>

  <div id="cf-turnstile" class="contact-turnstile"></div>

  <button type="submit" class="contact-submit">Send</button>

  <noscript>
    <p class="contact-noscript">This form needs JavaScript for spam protection. If you can't enable it, email <a href="mailto:sean@oconeco.com">sean@oconeco.com</a> instead.</p>
  </noscript>
</form>

</div>

<script>
(function () {
  var params = new URLSearchParams(location.search);
  var state = params.get('contact');
  var form = document.getElementById('contact-form');
  var thanks = document.getElementById('contact-thanks');
  var error = document.getElementById('contact-error');
  if (state === 'sent' && form && thanks) {
    form.hidden = true;
    thanks.hidden = false;
    document.getElementById('contact').scrollIntoView({behavior: 'smooth', block: 'start'});
  } else if (state === 'error' && error) {
    error.hidden = false;
    document.getElementById('contact').scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  var siteKeyMeta = document.querySelector('meta[name="turnstile-site-key"]');
  var siteKey = siteKeyMeta ? siteKeyMeta.getAttribute('content') : null;
  if (siteKey && form) {
    window.onloadTurnstileCallback = function () {
      if (window.turnstile) {
        window.turnstile.render('#cf-turnstile', { sitekey: siteKey });
      }
    };
    var s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback';
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }
})();
</script>
