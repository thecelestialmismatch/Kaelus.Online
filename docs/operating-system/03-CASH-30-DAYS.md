# The Cash Lane: 30 days to 5,000 or 7,000

Written 2026-09-08. Target date 2026-10-08.

This lane exists because HoundShield cannot pay September rent and pretending
otherwise costs the only month that matters. See 01-VERDICT.md, finding six.

Nothing in this document requires money to start. Every channel listed is free
to enter.

## 1. The arithmetic

Target 7,000 dollars. Three shapes reach it and all three are realistic.

1. Three fixed price engagements averaging 2,350 dollars.
2. Two engagements at 3,000 to 3,500 dollars.
3. One engagement at 3,500 dollars plus five small fixes at 600 to 800.

Do not chase the single 7,000 dollar contract. It has the longest cycle, the
most scrutiny, and one loss ends the month. Three medium deals are both faster
and safer.

Working backwards from three closes at a 15 percent close rate on qualified
conversations: 20 real conversations. At a 20 percent reply to conversation
rate: 100 targeted applications or messages. Over 25 working days that is four
per day. Four is the number. It is deliberately small enough to survive a bad
day, because a plan that requires a good day every day has already failed.

## 2. What is actually being sold

Not "a developer." Not "AI automation." Three named, fixed price, fixed
duration packages. Buyers with a broken thing buy outcomes with a date on them,
not hours.

Package one. The Stripe Rescue. 1,800 dollars, 5 working days. Payments that
fail silently, webhooks that miss orders, subscriptions that do not reconcile
with the database. Deliverable: working checkout, verified webhook, a daily
reconciliation job that catches anything the webhook missed, and a written
failure map. This is defensible because it is exactly what was already built
for HoundShield, including the reconciler and the runbook at
docs/RUNBOOK-MONEY-PATH.md.

Package two. The Auth Repair. 2,400 dollars, 7 working days. Broken sign in,
broken password reset, sessions that expire wrongly, no rate limiting, no
lockout. Deliverable: working auth with proper password hashing, rate limits,
lockouts, an audit trail, and a test suite. Defensible because RipoDoc ships
scrypt hashing, opaque Postgres sessions, HMAC CSRF, and rate limits, and
HoundShield ships auth lockouts and an auth audit trail.

Package three. The AI Risk Snapshot. 750 dollars, 3 working days. For any
company whose staff use ChatGPT or Copilot. Deliverable: a written report of
what regulated or confidential data is at risk of leaving, mapped to named
controls, with specific fixes. This is HoundShield's product delivered by hand
as a service. It funds the month and it validates the product's offer at the
same time, which is why it is here rather than in the asset lane.

Price in USD. Quote AUD only if the buyer is Australian.

## 3. Where the buyers are, in priority order

Channel one. Upwork. Highest intent per minute spent, free to apply within the
monthly connect allowance, and buyers arrive with budget already decided. The
entire edge is speed: apply only to jobs posted within the last two hours, and
only where the description names a specific broken thing. Skip anything vague,
anything with 30 plus proposals, and anything asking for a portfolio of ten
similar projects. Twenty minutes each morning, applying to the freshest three
or four.

Channel two. Direct observation. Find companies whose broken thing is visible
from outside. Small SaaS with a checkout that errors. A site with a password
reset that does not send. A local business with an obviously manual booking
process. This converts far better than any job board because the message is
not a pitch, it is a specific observation about their thing.

Channel three. Reddit r/forhire and r/slavelabour buyer side posts, Indie
Hackers, and any founder community where people post "my X is broken."
Answering one technical question well in public produces inbound.

Channel four. The warm list. Every former colleague, manager, classmate and
acquaintance who works anywhere with a website. This channel has the highest
close rate of the four and it is the one that gets skipped for emotional
reasons, so it is scheduled explicitly in section 5 rather than left to
willingness.

## 4. The messages, ready to send

These are final. Change the bracketed facts and send. Do not improve them.

### 4a. Upwork proposal

> [One specific sentence about their exact problem, using their words from the
> posting. Example: "A webhook that fires but does not update the order row is
> almost always a signature verification failure or an idempotency key
> collision, and both leave the payment succeeding in Stripe while your
> database never hears about it."]
>
> I have built and operate this exact path in production: Stripe checkout, a
> verified webhook, and a daily reconciliation job that re-reads paid sessions
> and recovers anything the webhook dropped. You can see the live system at
> https://www.houndshield.com and the payment failure map I wrote for it is
> public in the repo at github.com/thecelestialmismatch/HoundShield.
>
> Fixed price [1,800] USD, delivered in [5] working days. You get working
> checkout, a verified webhook, the reconciliation job, and a written
> description of every way it can still fail and what happens when it does.
>
> If it is not fixed, you do not pay.
>
> One question so I can confirm the estimate: [one specific technical question
> that proves the posting was read].

The final guarantee line matters more than everything above it. With no
reviews, risk reversal is the only asset available, and the work is
deliverable, so the guarantee costs nothing in expectation.

### 4b. Direct observation email

Subject: [their product] checkout is failing on [specific step]

> Hi [name],
>
> I was looking at [product] and the [specific step] returns [specific
> behaviour]. [One sentence on the most likely cause.]
>
> Not a sales email. If it is already known, ignore this.
>
> If it is not, I fix exactly this: [package name], fixed price [X] USD,
> [N] working days, and you do not pay if it is not fixed. I have shipped the
> same thing in production, live at [URL].
>
> [name]

Never send this without having actually reproduced the problem. The specific
observation is the entire value of the message and a wrong one destroys it.

### 4c. Warm network message

> Hi [name],
>
> Straight to it, because I would rather be direct than clever. I am out of
> work and I am taking on fixed price development contracts to bridge the gap.
>
> What I do: Stripe payment flows, authentication and security repair, and
> Next.js applications. Three live examples: houndshield.com, ripodoc.com, and
> the code for both is public at github.com/thecelestialmismatch.
>
> Two things would help more than anything else:
>
> 1. If anything at [their company] is broken or half finished in that area, I
>    will scope it at a fixed price this week.
> 2. If not, one introduction to somebody whose thing is broken.
>
> Either is genuinely useful. No pressure on either.
>
> [name]

Send this to everyone before day 5. It has the highest close rate of any
channel here and it is the one that feels worst to send. That is not a reason
to delay it. It is the reason to schedule it first.

## 5. The daily routine

Ninety minutes. Same order every day. Designed to be completable on a day with
no motivation, because those days are guaranteed and the plan has to survive
them.

1. Twenty minutes. Upwork. Apply to the three or four freshest matching jobs.
2. Twenty minutes. Find two companies with a visible broken thing. Reproduce
   the problem. Write it down.
3. Twenty minutes. Send those two observation emails.
4. Twenty minutes. Answer every reply from yesterday, including rejections.
5. Ten minutes. Log the numbers in the ledger. Contacts made, replies, calls
   booked, dollars invoiced.

Day one and day two additionally: send the warm network message to the entire
list. That is a one time push of 20 to 50 messages and it is the single highest
value 3 hours in the month.

The floor on a bad day is item 3 alone. Two messages sent. Not zero.

## 6. The fallback, if this is not working

Checkpoint 2026-10-08. If signed or invoiced work is under 1,500 dollars, the
positioning is wrong, not the plan. Change exactly one thing, in this order.

1. Halve the prices for the next 10 applications. 900 dollars for the Stripe
   Rescue. Price is the fastest variable to test and the first reviews are
   worth more than the margin.
2. If still nothing after 10 more at the lower price, the problem is proof, not
   price. Take one job at 300 dollars, deliver it in two days, and get the
   first public review. A profile with zero reviews and a profile with one
   review are different products.
3. If still nothing, the channel is wrong. Move entirely to direct observation
   email and abandon the job boards, which reward reputation that does not
   exist yet.

Do not change more than one variable at a time, and do not conclude anything
from a sample smaller than ten.

## 7. What this lane must never do

1. Never build a product during cash lane hours. The cash lane sells existing
   skill. Building is the asset lane and it has its own hours.
2. Never write a strategy document inside this lane. This document is the last
   one it gets.
3. Never quote an hourly rate. Fixed price with a date, every time.
4. Never take equity, revenue share, or deferred payment. Rent is due in cash.
5. Never spend money to start. Every channel here is free.
