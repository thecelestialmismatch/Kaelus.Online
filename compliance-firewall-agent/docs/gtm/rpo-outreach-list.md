# RPO / MSP Outreach List — Stage 1

> **Channel doctrine:** RPOs and CMMC-focused MSPs are the primary channel — **NOT C3PAOs**.
> A C3PAO is legally barred from recommending a product to a client it assesses
> (32 CFR Part 170 · CMMC CoPC · ISO 17020 cooling-off). Pitch RPOs/MSPs instead.
>
> **Offer (canonical — `lib/pricing/plans.ts`):** Co-brand the **$499 CMMC AI Risk
> Assessment Report** at **$399 wholesale — a flat $100 partner discount**. The
> partner pays us $399, bills their client $499–$999, and keeps the spread
> (20% at $499, 60% at $999).
>
> It is a **discount, not a payout** — no money ever leaves, so there is no
> referral fee, commission or revenue share to quote or track. State it in
> **dollars, never a percentage**: $499 × 0.80 = $399.20 forces a rounding call,
> and every rounding is a new number to drift.
>
> ⚠️ **Corrected 2026-09-07.** This file previously offered **$299 wholesale, a
> 40% referral and 20% recurring** — three retired figures that contradicted each
> other and the canon. Anyone who had copied the message frame below into a real
> partner email would have quoted $100 under wholesale and promised a commission
> that does not exist. `lib/pricing/__tests__/partner-offer-coherence.test.ts`
> was written to prevent exactly this and could not see it: it scanned six app
> files by name, and this doc was not one of them. It scans the GTM docs now.
>
> **Stage 1 target:** ≥1 signed RPO/MSP referral agreement. The 2026-06-25 date
> lapsed unmet and is awaiting founder re-baseline — see `CLAUDE.md`.

## Top targets (named in the brain — start here)

| # | Partner | Type | Why | Angle |
|---|---------|------|-----|-------|
| 1 | Summit 7 | RPO/MSP | Large CMMC practice, M365/GCC High focus | "AI-prompt evidence your GCC High clients still can't get from Purview alone" |
| 2 | MAD Security | MSSP | DIB-focused managed security | "A $499 add-on per client engagement, co-branded" |
| 3 | CyberSheath | RPO/MSSP | CMMC managed services at scale | Co-brand into existing readiness packages |
| 4 | CompliancePoint | Consultancy | Multi-framework (CMMC + HIPAA) | Cross-sell to healthcare clients too (Rachel) |
| 5 | BEMO | MSP | Microsoft 365 security shop | "Local AI scanning where Purview routes to cloud" |
| 6 | Steel Root (Foresite) | RPO | Defense compliance heritage | 14-day report fits inside assessment prep |
| 7 | Etactics | MSP | Healthcare + compliance | HIPAA-first co-brand (Rachel persona) |

## Sourcing the next 43

- **Cyber AB Marketplace** (cyberab.org/marketplace) → filter for **RPO** and **MSP/Managed Services**. Skip C3PAO-only listings.
- Target firms with **10+ DoD clients** and a stated CMMC readiness offering.
- Healthcare-leaning MSPs are valid too (HIPAA-first / Rachel) — no FedRAMP blocker, faster cycle.

## Message frame (first touch — keep it short)

> Subject: A $499 deliverable you can co-brand
>
> [Name] — your CMMC clients are pasting CUI into ChatGPT and have no audit trail for it.
> We produce a SHA-256-signed AI-prompt risk report mapped to NIST 800-171 in 14 days,
> running in the client's own environment (nothing leaves their network). You co-brand it
> at $399 and charge $499–$999, keeping the spread. It slots into your readiness packages.
> Worth 15 minutes?

## Objection handling

- **"Isn't this just Purview?"** — Purview needs E5/G5 + a $149K–$200K/yr GCC High migration and still routes prompts to Microsoft cloud. HoundShield is local-only, <200-employee economics, Docker on their infra.
- **"Are you FedRAMP authorized?"** — The hosted trial is not (it's non-CUI eval only). The product that handles CUI is Mode B — Docker in the client's boundary, where FedRAMP authorization of *our* hosting is not in scope. Be explicit; never overclaim.
- **"Can a C3PAO resell this?"** — No. C3PAOs can't endorse tools for clients they assess. That's exactly why this is an RPO/MSP program.

## Tracking

| Partner | Contacted | Replied | Demo | Agreement | Notes |
|---------|-----------|---------|------|-----------|-------|
| Summit 7 | ☐ | ☐ | ☐ | ☐ | |
| MAD Security | ☐ | ☐ | ☐ | ☐ | |
| CyberSheath | ☐ | ☐ | ☐ | ☐ | |
| CompliancePoint | ☐ | ☐ | ☐ | ☐ | |
| BEMO | ☐ | ☐ | ☐ | ☐ | |
| Steel Root | ☐ | ☐ | ☐ | ☐ | |
| Etactics | ☐ | ☐ | ☐ | ☐ | |

**KPI:** emails sent · replies · demos booked · **signed agreements (target ≥1 by Jun 25)**.
