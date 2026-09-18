// Every pain point and opportunity: what it means, and how it was measured.
// CARD_ORDER controls which cards appear in which stage column, and in what
// order. A card with a `ticket` shows the wrench badge and its initiative.
export const CARDS = {
  "browse-selection": {
    "stage": "browse",
    "kind": "pain",
    "title": "Overwhelming product selection",
    "priority": "medium",
    "meaning": "Shoppers landing on a category page face dozens of near-identical options with no obvious way to narrow them down, so they default to scrolling instead of deciding.",
    "measurement": "Session recordings of 240 category visits showed a median of 3.8 full scroll cycles before any filter was touched. An exit-intent survey (n=412) returned “too many options to compare” as the leading reason for leaving, at 31%.",
    "ticket": null
  },
  "browse-filters": {
    "stage": "browse",
    "kind": "pain",
    "title": "Slow filters",
    "priority": "medium",
    "meaning": "Every filter change triggers a full page reload, so refining a search feels punishing and most shoppers stop after one attempt.",
    "measurement": "GA4 custom timing on the filter endpoint averages 1.9s at p50 and 4.4s at p95. Only 18% of sessions apply a second filter after the first.",
    "ticket": null
  },
  "browse-search": {
    "stage": "browse",
    "kind": "opportunity",
    "title": "Better search",
    "priority": "medium",
    "meaning": "A search box that tolerates typos, understands synonyms and shows results as you type would let shoppers who already know what they want skip browsing altogether.",
    "measurement": "Searchers convert at 3.1× the rate of browsers, but 22% of queries currently return nothing. Query-log analysis of 14,600 searches found 61% of those misses were spelling variants or synonyms already present in the catalogue.",
    "ticket": null
  },
  "browse-recs": {
    "stage": "browse",
    "kind": "opportunity",
    "title": "Personalized recommendations",
    "priority": "low",
    "meaning": "Surfacing items based on what a shopper viewed previously would shorten the path for returning visitors.",
    "measurement": "Sized from a four-week holdout test on the homepage rail, which lifted click-through 12% but did not move revenue per session significantly (p=0.21). Held at low priority until that signal is clearer.",
    "ticket": null
  },
  "browse-quickfilters": {
    "stage": "browse",
    "kind": "opportunity",
    "title": "Quick filters",
    "priority": "medium",
    "meaning": "Exposing the three most-used filters as one-tap chips above the results removes the trip into the filter panel entirely.",
    "measurement": "Filter-usage logs show price, size and colour account for 78% of all filter applications. Prototype tree-testing with 18 participants cut time-to-first-filter from 41s to 9s.",
    "ticket": null
  },
  "cart-stock": {
    "stage": "cart",
    "kind": "pain",
    "title": "Stock uncertainty",
    "priority": "medium",
    "meaning": "Availability is only checked after an item is added, so shoppers discover an out-of-stock size at the point they have already committed to it.",
    "measurement": "6.2% of add-to-cart events are followed by a stock-failure error within 30 seconds. Support tags roughly 94 tickets a month to “it was available and then it wasn’t”.",
    "ticket": null
  },
  "cart-sizing": {
    "stage": "cart",
    "kind": "pain",
    "title": "No sizing guides",
    "priority": "low",
    "meaning": "With no garment measurements published, shoppers guess — which surfaces later as a return rather than as a drop-off here.",
    "measurement": "41% of apparel returns cite “wrong size”, against a category benchmark of 30%. In moderated usability sessions (n=12), seven participants looked for a size chart and could not find one.",
    "ticket": null
  },
  "cart-stock-indicators": {
    "stage": "cart",
    "kind": "opportunity",
    "title": "Stock indicators",
    "priority": "medium",
    "meaning": "Showing per-variant availability on the listing itself prevents the dead end rather than reporting it.",
    "measurement": "The inventory feed already carries variant-level counts, so this is a display change rather than a data project. Modelled directly against the 6.2% stock-failure rate.",
    "ticket": null
  },
  "cart-size-tool": {
    "stage": "cart",
    "kind": "opportunity",
    "title": "Size tool",
    "priority": "low",
    "meaning": "A guided fit finder that asks two or three questions and recommends a size.",
    "measurement": "Vendor benchmarks claim a 20–30% reduction in size-related returns. Not yet validated against our own traffic, which is why this sits low.",
    "ticket": null
  },
  "cart-reviews": {
    "stage": "cart",
    "kind": "opportunity",
    "title": "Customer reviews",
    "priority": "low",
    "meaning": "Fit and quality commentary from other buyers answers the questions a spec sheet cannot.",
    "measurement": "On-page surveys (n=289) found 44% of shoppers looked for reviews before adding an item. No first-party test has been run, so the effect size is unknown.",
    "ticket": null
  },
  "checkout-form": {
    "stage": "checkout",
    "kind": "pain",
    "title": "Form too long",
    "priority": "high",
    "meaning": "The shipping step asks for 14 fields across two screens, several of which the order does not need, so shoppers stall partway through.",
    "measurement": "Field-level analytics show a median completion time of 3:40 on the shipping form alone, with 38% of abandonments occurring on the “address line 2” and “company” fields — both of which are optional.",
    "ticket": "CHK-1428"
  },
  "checkout-steps": {
    "stage": "checkout",
    "kind": "pain",
    "title": "Too many steps",
    "priority": "high",
    "meaning": "Five separate screens sit between cart and payment, each with its own page load, and nothing indicates how many remain.",
    "measurement": "Funnel analysis shows a 4–7% drop at each of the five steps, compounding to 23% across the sequence. Replays of 180 abandonments show 61% left without scrolling, which points at the step count itself rather than the content.",
    "ticket": "CHK-1503"
  },
  "checkout-fees": {
    "stage": "checkout",
    "kind": "pain",
    "title": "Unexpected fees",
    "priority": "medium",
    "meaning": "Shipping and handling only appear on the final review screen, so the total the shopper agreed to in the cart is not the total they are asked to pay.",
    "measurement": "Abandonment spikes to 14% on the screen where fees first appear, against 5% on adjacent screens. Exit survey (n=203) cites “cost more than expected” at 27%.",
    "ticket": null
  },
  "checkout-onepage": {
    "stage": "checkout",
    "kind": "opportunity",
    "title": "One-page checkout",
    "priority": "high",
    "meaning": "Collapsing the five steps into a single scrollable page with inline validation.",
    "measurement": "Scoped against the per-step drop data above. The redesign tracked in CHK-1428 models conversion at 85%, up from 75%.",
    "ticket": "CHK-1428"
  },
  "checkout-guest": {
    "stage": "checkout",
    "kind": "opportunity",
    "title": "Guest checkout option",
    "priority": "high",
    "meaning": "Letting shoppers buy without creating an account removes the hardest ask in the flow.",
    "measurement": "34% of abandonments occur on the account-creation prompt. Of the accounts that are created at checkout, 71% are never signed into again — so the account is not serving the customer either.",
    "ticket": null
  },
  "checkout-total": {
    "stage": "checkout",
    "kind": "opportunity",
    "title": "Show total early",
    "priority": "medium",
    "meaning": "Estimating shipping in the cart so the number never changes after the shopper has decided.",
    "measurement": "Targets the 27% “cost more than expected” exit reason. Shipping rules are already deterministic by postcode, so an accurate estimate is available at cart time.",
    "ticket": null
  },
  "checkout-autofill": {
    "stage": "checkout",
    "kind": "opportunity",
    "title": "Auto-fill address",
    "priority": "medium",
    "meaning": "A postcode lookup that completes the address from two fields instead of six.",
    "measurement": "Address fields account for 1:50 of the 3:40 median form time. Lookup providers quote sub-200ms responses for all of our markets.",
    "ticket": null
  },
  "payment-security": {
    "stage": "payment",
    "kind": "pain",
    "title": "Security concerns",
    "priority": "high",
    "meaning": "The payment page carries no visible trust signals and its styling differs from the rest of the site, so it reads as though the shopper has been handed off somewhere they should not trust.",
    "measurement": "The highest bounce on the journey at 18%, and the only stage where bounce is still rising — up 4.1pp in four weeks. In first-click testing with 24 participants, nine paused to check the URL bar; verbatims include “looks different” and “is this still the real site”.",
    "ticket": "PAY-0912"
  },
  "payment-options": {
    "stage": "payment",
    "kind": "pain",
    "title": "Limited payment options",
    "priority": "medium",
    "meaning": "Card only. Shoppers who default to a wallet or a pay-later method have no route through this step at all.",
    "measurement": "An exit survey on the payment step (n=156) returned “my payment method wasn’t offered” at 19%. Market data puts wallet share at 34% for our largest segment.",
    "ticket": null
  },
  "payment-processing": {
    "stage": "payment",
    "kind": "pain",
    "title": "Slow processing",
    "priority": "medium",
    "meaning": "The authorisation call can take several seconds with no progress feedback, so shoppers retry or leave believing it failed.",
    "measurement": "Gateway latency is 6.1s at p95 against 1.4s at p50. 3.4% of orders show a duplicate submit attempt, concentrated almost entirely in sessions past the four-second mark.",
    "ticket": null
  },
  "payment-trust": {
    "stage": "payment",
    "kind": "opportunity",
    "title": "Trust badges",
    "priority": "high",
    "meaning": "SSL, fraud-protection and card-scheme marks placed where the shopper is deciding, plus page styling that matches the rest of the site.",
    "measurement": "Scoped in PAY-0912 against the 18% bounce rate, with a projected reduction to 12%.",
    "ticket": "PAY-0912"
  },
  "payment-methods": {
    "stage": "payment",
    "kind": "opportunity",
    "title": "Multiple payment methods",
    "priority": "medium",
    "meaning": "Adding the wallet and pay-later options that shoppers asked for by name.",
    "measurement": "Sized from the 19% “method not offered” exit-survey share and the 34% wallet benchmark for our main segment.",
    "ticket": null
  },
  "payment-wallets": {
    "stage": "payment",
    "kind": "opportunity",
    "title": "Apple/Google Pay",
    "priority": "medium",
    "meaning": "One-tap payment that also removes the address form for returning shoppers.",
    "measurement": "58% of payment-step sessions are on mobile, where these wallets are already provisioned. Vendor case studies report 1.5–2× mobile conversion, which we have not validated here.",
    "ticket": null
  },
  "confirm-details": {
    "stage": "confirm",
    "kind": "pain",
    "title": "Unclear order details",
    "priority": "medium",
    "meaning": "The confirmation screen shows an order number and a total, but not what was bought, where it is going, or when to expect it.",
    "measurement": "22% of support contacts within 24 hours of purchase ask what was ordered or where it is being sent. Every one of those is answerable at this screen.",
    "ticket": null
  },
  "confirm-timeline": {
    "stage": "confirm",
    "kind": "pain",
    "title": "No shipping timeline",
    "priority": "medium",
    "meaning": "No delivery estimate is given, so the shopper has no idea whether to expect the parcel in two days or two weeks.",
    "measurement": "“When will it arrive” is the single largest contact reason in the 48 hours after purchase, at 31% of tickets. A carrier estimate is already available on the order at this point but is not displayed.",
    "ticket": null
  },
  "confirm-summary": {
    "stage": "confirm",
    "kind": "opportunity",
    "title": "Clear order summary",
    "priority": "medium",
    "meaning": "An itemised list, the delivery address and the payment method, both on screen and in the email.",
    "measurement": "Targets the 22% “what did I order” contact volume. Every field needed is already on the order object.",
    "ticket": null
  },
  "confirm-date": {
    "stage": "confirm",
    "kind": "opportunity",
    "title": "Delivery date",
    "priority": "high",
    "meaning": "A concrete date, or a narrow range, rather than a shipping-speed label like “standard”.",
    "measurement": "Targets the 31% “when will it arrive” contact volume — the largest single avoidable driver at this stage. The carrier API already returns a per-postcode estimate.",
    "ticket": null
  },
  "confirm-tracking": {
    "stage": "confirm",
    "kind": "opportunity",
    "title": "Tracking link",
    "priority": "medium",
    "meaning": "A link the shopper can return to, rather than a number to paste into a carrier’s site.",
    "measurement": "14% of post-purchase sessions come back to look for order status, and 62% of those land on the wrong page first.",
    "ticket": null
  },
  "confirm-email": {
    "stage": "confirm",
    "kind": "opportunity",
    "title": "Confirmation email",
    "priority": "low",
    "meaning": "A durable copy of the order the shopper can find later without signing in.",
    "measurement": "Already sent, but open tracking shows a 61% open rate and the mail contains no useful links — so this is a content fix rather than new work, hence the low priority.",
    "ticket": null
  },
  "shipping-tracking": {
    "stage": "shipping",
    "kind": "pain",
    "title": "No tracking updates",
    "priority": "high",
    "meaning": "Once a parcel leaves the warehouse the shopper hears nothing until it arrives, so the only way to find out where it is, is to ask us.",
    "measurement": "1,180 “where is my order” contacts a month — 38% of all support volume. Carrier webhooks carrying this data were already available and simply not consumed.",
    "ticket": "SHIP-0347"
  },
  "shipping-window": {
    "stage": "shipping",
    "kind": "pain",
    "title": "No delivery window",
    "priority": "high",
    "meaning": "A whole-day delivery date with no time window means somebody has to be home all day, or the parcel is missed.",
    "measurement": "11% of first delivery attempts fail, and 68% of those succeed on the next day’s retry — so the parcel was deliverable and the shopper simply wasn’t there.",
    "ticket": null
  },
  "shipping-sms": {
    "stage": "shipping",
    "kind": "pain",
    "title": "No SMS notifications",
    "priority": "high",
    "meaning": "Status updates go to email only, which shoppers do not check in the narrow window where the information still matters.",
    "measurement": "Shipping email open rate is 61%, against the 98% read rates typical of transactional SMS. Of the failed deliveries above, 74% had an unopened “out for delivery” email.",
    "ticket": "SHIP-0412"
  },
  "shipping-realtime": {
    "stage": "shipping",
    "kind": "opportunity",
    "title": "Real-time tracking",
    "priority": "high",
    "meaning": "A live map and status page the shopper can open at any time without contacting anyone.",
    "measurement": "Scoped in SHIP-0347 against the 1,180 monthly contacts, with a projected support saving of $8K a month.",
    "ticket": "SHIP-0347"
  },
  "shipping-alerts": {
    "stage": "shipping",
    "kind": "opportunity",
    "title": "SMS/email updates",
    "priority": "high",
    "meaning": "Opt-in alerts at dispatch, out for delivery and delivered.",
    "measurement": "Scoped in SHIP-0412, targeting 35% opt-in and a 12% reduction in support volume.",
    "ticket": "SHIP-0412"
  },
  "shipping-2hr": {
    "stage": "shipping",
    "kind": "opportunity",
    "title": "2-hour delivery window",
    "priority": "medium",
    "meaning": "A narrow slot, communicated on the morning of delivery.",
    "measurement": "Modelled against the 11% failed-attempt rate, where each failure costs roughly $6 in redelivery. The carrier supports windowing in three of our five regions today.",
    "ticket": null
  },
  "delivery-damage": {
    "stage": "delivery",
    "kind": "pain",
    "title": "Damaged packaging",
    "priority": "medium",
    "meaning": "Parcels arrive crushed or already open, which turns a completed purchase into a return even when the product inside is fine.",
    "measurement": "2.1% of deliveries generate a damage report. Photo evidence across 340 claims showed 71% were outer-carton failures on multi-item orders rather than product faults.",
    "ticket": null
  },
  "delivery-wrong": {
    "stage": "delivery",
    "kind": "pain",
    "title": "Wrong item",
    "priority": "high",
    "meaning": "The shopper receives something other than what they ordered, which costs them a return trip and costs us the margin twice.",
    "measurement": "0.9% mis-pick rate, traced in a warehouse audit to four SKU pairs with near-identical packaging. Each incident averages $34 in return shipping and restocking.",
    "ticket": null
  },
  "delivery-missed": {
    "stage": "delivery",
    "kind": "pain",
    "title": "Missed delivery",
    "priority": "medium",
    "meaning": "Nobody home and no safe place, so the parcel returns to the depot and the shopper has to chase it.",
    "measurement": "The same 11% first-attempt failure rate measured at the shipping stage. 19% of those parcels are never successfully redelivered at all.",
    "ticket": null
  },
  "delivery-proof": {
    "stage": "delivery",
    "kind": "opportunity",
    "title": "Proof of delivery",
    "priority": "medium",
    "meaning": "A timestamped photo and location, so “it never arrived” can be settled without a claim process.",
    "measurement": "27% of damage and non-delivery claims are currently unresolvable in either direction. The carrier already captures photos in two regions but does not pass them through to us.",
    "ticket": null
  },
  "delivery-returns": {
    "stage": "delivery",
    "kind": "opportunity",
    "title": "Easy returns",
    "priority": "high",
    "meaning": "A prepaid label and a drop-off point, generated from the order without a support conversation.",
    "measurement": "Returns currently take a median of two support touches to initiate. 48% of CSAT verbatims scoring below three stars mention the returns process rather than the product.",
    "ticket": null
  },
  "delivery-whiteglove": {
    "stage": "delivery",
    "kind": "opportunity",
    "title": "White-glove service",
    "priority": "low",
    "meaning": "Scheduled delivery with unpacking and installation for large items.",
    "measurement": "Applies to 3% of order volume by unit but 18% by revenue. No pilot has run and the sizing rests on vendor quotes alone, which is why it stays low.",
    "ticket": null
  },
  "support-findability": {
    "stage": "support",
    "kind": "pain",
    "title": "Hard to find support",
    "priority": "high",
    "meaning": "The contact route sits three clicks deep in the footer, so shoppers who need help either give up or arrive through a channel nobody staffs.",
    "measurement": "Tree-testing with 22 participants: nine failed to find the contact page within 60 seconds. 31% of inbound contacts now arrive via social DMs, which carry no SLA.",
    "ticket": null
  },
  "support-speed": {
    "stage": "support",
    "kind": "pain",
    "title": "Slow responses",
    "priority": "high",
    "meaning": "First response takes long enough that shoppers contact again through a second channel before hearing back, which inflates the queue they are waiting in.",
    "measurement": "Median first response is 19 hours against a 4-hour target. 23% of tickets have a duplicate from the same customer inside that window.",
    "ticket": null
  },
  "support-selfservice": {
    "stage": "support",
    "kind": "pain",
    "title": "No self-service",
    "priority": "medium",
    "meaning": "Routine requests — track an order, start a return, change an address — all require a person, so the queue is full of work that never needed one.",
    "measurement": "Contact-reason tagging shows 58% of tickets are one of those three requests. Handling time averages seven minutes per ticket.",
    "ticket": null
  },
  "support-chat": {
    "stage": "support",
    "kind": "opportunity",
    "title": "24/7 chat support",
    "priority": "high",
    "meaning": "A staffed or hybrid chat channel available outside business hours.",
    "measurement": "44% of contact attempts fall outside the 9–5 staffed window, and those tickets wait a median of 31 hours for a first response against 11 hours in-hours.",
    "ticket": null
  },
  "support-ai": {
    "stage": "support",
    "kind": "opportunity",
    "title": "AI assistant",
    "priority": "medium",
    "meaning": "Automated handling of the routine requests above, with a clean handoff to a person when it cannot help.",
    "measurement": "Scoped against the 58% self-service-eligible volume, assuming 60% containment — an assumption not yet validated against our actual ticket mix.",
    "ticket": null
  },
  "support-returns": {
    "stage": "support",
    "kind": "opportunity",
    "title": "Easy returns",
    "priority": "high",
    "meaning": "The same self-service returns flow proposed at delivery, reachable from order history.",
    "measurement": "Shares the two-touch measurement from the delivery stage. Returns are 21% of total ticket volume at this stage.",
    "ticket": null
  },
  "support-loyalty": {
    "stage": "support",
    "kind": "opportunity",
    "title": "Loyalty program",
    "priority": "low",
    "meaning": "Rewards for repeat purchase, so the support relationship feeds retention instead of reading purely as cost.",
    "measurement": "Repeat-purchase rate is 28% within 12 months. No test has run — this is listed to keep it visible, not because it is sized.",
    "ticket": null
  }
};

export const CARD_ORDER = {
  "browse": {
    "pain": [
      "browse-selection",
      "browse-filters"
    ],
    "opportunity": [
      "browse-search",
      "browse-recs",
      "browse-quickfilters"
    ]
  },
  "cart": {
    "pain": [
      "cart-stock",
      "cart-sizing"
    ],
    "opportunity": [
      "cart-stock-indicators",
      "cart-size-tool",
      "cart-reviews"
    ]
  },
  "checkout": {
    "pain": [
      "checkout-form",
      "checkout-steps",
      "checkout-fees"
    ],
    "opportunity": [
      "checkout-onepage",
      "checkout-guest",
      "checkout-total",
      "checkout-autofill"
    ]
  },
  "payment": {
    "pain": [
      "payment-security",
      "payment-options",
      "payment-processing"
    ],
    "opportunity": [
      "payment-trust",
      "payment-methods",
      "payment-wallets"
    ]
  },
  "confirm": {
    "pain": [
      "confirm-details",
      "confirm-timeline"
    ],
    "opportunity": [
      "confirm-summary",
      "confirm-date",
      "confirm-tracking",
      "confirm-email"
    ]
  },
  "shipping": {
    "pain": [
      "shipping-tracking",
      "shipping-window",
      "shipping-sms"
    ],
    "opportunity": [
      "shipping-realtime",
      "shipping-alerts",
      "shipping-2hr"
    ]
  },
  "delivery": {
    "pain": [
      "delivery-damage",
      "delivery-wrong",
      "delivery-missed"
    ],
    "opportunity": [
      "delivery-proof",
      "delivery-returns",
      "delivery-whiteglove"
    ]
  },
  "support": {
    "pain": [
      "support-findability",
      "support-speed",
      "support-selfservice"
    ],
    "opportunity": [
      "support-chat",
      "support-ai",
      "support-returns",
      "support-loyalty"
    ]
  }
};
