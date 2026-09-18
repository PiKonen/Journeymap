// Active work, keyed by Jira ticket. Referenced from cards.js via `ticket`.
export const INITIATIVES = {
  "CHK-1428": {
    "name": "One-Page Checkout Redesign",
    "status": "in-progress",
    "status_label": "In progress",
    "owner": "Frontend Team (Alex Chen)",
    "progress": 40,
    "timeline": "Started Jan 15 &middot; Launch Feb 15",
    "impact": [
      [
        "Conversion now",
        "75%"
      ],
      [
        "Projected",
        "85% (+10pp)"
      ]
    ],
    "note": "On track, no blockers. Next milestone: design review, Feb 1."
  },
  "CHK-1503": {
    "name": "Streamlined Checkout Flow",
    "status": "planned",
    "status_label": "Planned",
    "owner": "UX Team (Maya Patel)",
    "progress": null,
    "timeline": "Starts Feb 1 &middot; Launch Mar 15",
    "impact": [
      [
        "Time saved",
        "-2:24"
      ],
      [
        "Conversion lift",
        "+8pp"
      ]
    ],
    "note": "Reduces checkout from five steps to two or three by combining shipping and billing."
  },
  "PAY-0912": {
    "name": "Trust Badge Implementation",
    "status": "in-progress",
    "status_label": "In progress",
    "owner": "Backend Team (Sarah Johnson)",
    "progress": 65,
    "timeline": "Started Jan 8 &middot; Launch Jan 25",
    "impact": [
      [
        "Bounce now",
        "18%"
      ],
      [
        "Projected",
        "12% (-6pp)"
      ]
    ],
    "note": "Adds SSL and fraud-protection marks plus card-scheme icons, and aligns the page styling with the rest of the site."
  },
  "SHIP-0347": {
    "name": "Real-Time Tracking Dashboard",
    "status": "launching",
    "status_label": "Launching soon",
    "owner": "Logistics Team (James Park)",
    "progress": 90,
    "timeline": "Started Dec 1 &middot; Launch Jan 22",
    "impact": [
      [
        "Support tickets",
        "1,180/mo"
      ],
      [
        "Projected saving",
        "$8K/mo"
      ]
    ],
    "note": "Live GPS tracking with carrier integration and status updates every 30 minutes."
  },
  "SHIP-0412": {
    "name": "SMS Notification System",
    "status": "planned",
    "status_label": "Planned",
    "owner": "Growth Team (Nina Chen)",
    "progress": null,
    "timeline": "Starts Feb 1 &middot; Launch Mar 1",
    "impact": [
      [
        "Adoption target",
        "35% opt-in"
      ],
      [
        "Support reduction",
        "-12%"
      ]
    ],
    "note": "Opt-in alerts for shipped, out for delivery and delivered, with per-user preferences."
  }
};
