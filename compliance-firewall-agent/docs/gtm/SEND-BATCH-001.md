# Send Batch 001 — the first 10 outbound emails

**Created 2026-09-07.** Status: **nothing sent.** This is the worksheet that turns
"we have drafts" into "ten real people were asked". It is the missing artifact —
the copy has existed in code since July; the sending has not happened once.

**Why a worksheet and not ten more drafts.** Three guard-tested templates already
ship in `lib/email/outreach.ts` (`healthcare`, `partner`, `defense`), rendered by
`npm run email:send`, which refuses to send with unfilled placeholders. Writing
ten new bodies would add nothing and create a fourth place for the numbers to
drift. What is actually missing is **ten verified recipients** and ten sends.

> **Contact names and addresses are deliberately blank.** They are not an
> oversight and must not be filled with a plausible guess. A guessed address
> bounces, and bounces on a cold domain damage the sender reputation that also
> carries password resets and Stripe receipts — see
> `docs/OUTREACH-SOURCING-RUNBOOK.md` §"The standard". Fill each blank from the
> firm's own site or LinkedIn, verify it, then send.

---

## Step 0 — prove the mailbox before a buyer sees anything (once, ~10 min)

```bash
cd compliance-firewall-agent
npm run email:send -- --template smoke-test --to <an-inbox-you-own> --confirm
```

Work all four checks in the email body. **Step 4 — hitting Reply and confirming
the reply arrives — is the only one that tests the receiving half.** Resend sends
and Hostinger receives; a send can succeed while every interested buyer's reply
bounces into nothing. Do not start Batch 001 until all four pass.

---

## Lane A — RPO / MSP partners (5) · template `partner`

Goal: the Stage-1 **≥1 signed referral agreement**. One partner carries 10–100
regulated SMB clients who already trust them on compliance.

**The offer, stated the one canonical way** (`lib/pricing/plans.ts`): they buy at
**$399 — a flat $100 off the published $499** — set their own retail, and keep the
spread. It is a **discount, not a payout**: no money moves back to them, so there
is nothing to invoice, track, or chase. Never quote a percentage, a commission, or
a referral fee. Never pitch a C3PAO (32 CFR Part 170 / ISO 17020 bar an assessor
from recommending tools to clients it assesses).

| # | Firm | Contact (fill in) | Email (verify) | Personalisation hook — **confirm on their site before sending** |
|---|------|-------------------|----------------|------------------------------------------------------------------|
| 1 | Summit 7 | | | Heavy M365 / GCC High CMMC practice. Hook: prompt-level evidence their GCC High clients still cannot get from Purview alone. |
| 2 | MAD Security | | | DIB-focused MSSP. Hook: a fixed $499 deliverable that drops into an existing managed engagement without new tooling. |
| 3 | CyberSheath | | | CMMC managed services at scale. Hook: co-brand into readiness packages already being sold. |
| 4 | CompliancePoint | | | Multi-framework (CMMC **and** HIPAA). Hook: the same report sells into their healthcare book — two verticals, one SKU. |
| 5 | Steel Root (Foresite) | | | Defense compliance heritage. Hook: the 14-day scan fits inside assessment prep they already run. |

```bash
npm run email:preview -- --template partner \
  --first-name <Name> --organization "<Firm>" --to <verified@firm.com>
# read it, then repeat with --confirm
```

**Objection handling:** `docs/gtm/rpo-msp-outreach-sequence.md` (the "What do I
make on this?" row now states the $399/$100 framing correctly — it quoted a
retired commission until 2026-09-07).

---

## Lane B — Healthcare Privacy Officers (5) · template `healthcare`

Goal: the Stage-1 **≥3 paid $499 reports**. Fastest cycle of the three buyers —
30–90 days, no FedRAMP blocker.

**Sourcing criteria** (per `docs/OUTREACH-SOURCING-RUNBOOK.md` §Step 1–3):
US physician group, clinic, or healthcare MSP, **50–300 employees**, with a named
**Privacy Officer, Compliance Officer, or CISO** on the site or LinkedIn.

| # | Organisation (fill in) | Contact (fill in) | Email (verify) | One-line hook (their EHR, a recent post, practice size) |
|---|------------------------|-------------------|----------------|----------------------------------------------------------|
| 6 | | | | |
| 7 | | | | |
| 8 | | | | |
| 9 | | | | |
| 10 | | | | |

```bash
npm run email:send -- --template healthcare \
  --first-name <Name> --organization "<Practice>" --to <verified@practice.org> --confirm
```

**The ask is 15 minutes, not a sale.** The template says so explicitly, and it
cites Netskope 2025 with its denominator. Do not add a calendar link, a deck, or a
P.S. — each addition makes it read less like a person wrote it.

**Honesty guardrail:** the local-only/PHI-safe claim is true **only in Mode B**
(self-hosted Docker). The hosted trial is non-PHI evaluation only and carries no
BAA. Never tell a prospect otherwise, on a call or in writing.

---

## Rules for the batch

- **One recipient per run.** The send tool has no CSV and no loop, on purpose.
- **Ten real emails beat two hundred template blasts.** Personalise the hook line
  for every single one; if you cannot write a true hook for a target, drop it.
- **Stop the moment they reply.** Switch to a human conversation.
- **One follow-up, then stop** (`docs/OUTREACH-SOURCING-RUNBOOK.md` §Step 5).
- **CAN-SPAM:** truthful subject, real physical address in the footer, working
  opt-out. The templates carry the signature block; confirm the address is right.

## Scoreboard — update as you send

| Metric | Target | Actual |
|--------|--------|--------|
| Smoke test passed (all 4 checks) | yes | |
| Lane A partner emails sent | 5 | 0 |
| Lane B healthcare emails sent | 5 | 0 |
| Replies | ≥2 | 0 |
| Calls booked | ≥1 | 0 |
| Signed RPO/MSP agreements | 1 | 0 |
| Paid $499 reports | 3 | 0 |

Two of the three kill criteria in `CLAUDE.md` read true as of the 2026-09-01
gate — 0 paid customers, 0 signed partners. Both of those numbers describe a
funnel **that has never had anyone put into the top of it.** This batch is the
first test that produces evidence either way.
