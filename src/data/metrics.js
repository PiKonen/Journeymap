// GA figures per stage, with their movement against the previous four-week
// average. `direction` is which way the number moved; `sentiment` is whether
// that movement is good or bad news — they are deliberately independent,
// because rising bounce is bad while rising conversion is good.
export const METRICS = {
  "browse": [
    {
      "label": "Users",
      "value": "10,000",
      "valueClass": "",
      "direction": "up",
      "delta": "6.2%",
      "sentiment": "good",
      "note": "more sessions reaching the catalogue"
    },
    {
      "label": "Conversion",
      "value": "68%",
      "valueClass": "good",
      "direction": "up",
      "delta": "1.8pp",
      "sentiment": "good",
      "note": ""
    },
    {
      "label": "Bounce",
      "value": "8%",
      "valueClass": "good",
      "direction": "down",
      "delta": "0.9pp",
      "sentiment": "good",
      "note": ""
    },
    {
      "label": "Time",
      "value": "4:32",
      "valueClass": "",
      "direction": "up",
      "delta": "12s",
      "sentiment": "neutral",
      "note": "longer browsing reads as engagement, not friction"
    }
  ],
  "cart": [
    {
      "label": "Users",
      "value": "6,800",
      "valueClass": "",
      "direction": "up",
      "delta": "4.1%",
      "sentiment": "good",
      "note": ""
    },
    {
      "label": "Conversion",
      "value": "89%",
      "valueClass": "excellent",
      "direction": "flat",
      "delta": "0.2pp",
      "sentiment": "neutral",
      "note": ""
    },
    {
      "label": "Bounce",
      "value": "2%",
      "valueClass": "excellent",
      "direction": "flat",
      "delta": "0.0pp",
      "sentiment": "neutral",
      "note": ""
    },
    {
      "label": "Time",
      "value": "2:15",
      "valueClass": "",
      "direction": "down",
      "delta": "8s",
      "sentiment": "good",
      "note": "faster to add an item"
    }
  ],
  "checkout": [
    {
      "label": "Users",
      "value": "6,052",
      "valueClass": "",
      "direction": "up",
      "delta": "3.4%",
      "sentiment": "good",
      "note": ""
    },
    {
      "label": "Conversion",
      "value": "75%",
      "valueClass": "good",
      "direction": "down",
      "delta": "1.1pp",
      "sentiment": "bad",
      "note": "still slipping while the one-page redesign is in build"
    },
    {
      "label": "Bounce",
      "value": "12%",
      "valueClass": "caution",
      "direction": "up",
      "delta": "1.4pp",
      "sentiment": "bad",
      "note": ""
    },
    {
      "label": "Time",
      "value": "6:44",
      "valueClass": "",
      "direction": "up",
      "delta": "22s",
      "sentiment": "bad",
      "note": "the form is taking longer, matching the reported pain"
    }
  ],
  "payment": [
    {
      "label": "Users",
      "value": "4,539",
      "valueClass": "",
      "direction": "down",
      "delta": "2.8%",
      "sentiment": "bad",
      "note": "fewer shoppers arriving from checkout"
    },
    {
      "label": "Conversion",
      "value": "75%",
      "valueClass": "caution",
      "direction": "down",
      "delta": "3.2pp",
      "sentiment": "bad",
      "note": ""
    },
    {
      "label": "Bounce",
      "value": "18%",
      "valueClass": "critical",
      "direction": "up",
      "delta": "4.1pp",
      "sentiment": "bad",
      "note": "the steepest move anywhere on the journey"
    },
    {
      "label": "Time",
      "value": "3:12",
      "valueClass": "",
      "direction": "up",
      "delta": "18s",
      "sentiment": "bad",
      "note": ""
    }
  ],
  "confirm": [
    {
      "label": "Users",
      "value": "4,085",
      "valueClass": "",
      "direction": "down",
      "delta": "1.9%",
      "sentiment": "bad",
      "note": "knock-on from the payment drop-off"
    },
    {
      "label": "Conversion",
      "value": "98%",
      "valueClass": "excellent",
      "direction": "flat",
      "delta": "0.1pp",
      "sentiment": "neutral",
      "note": ""
    },
    {
      "label": "Bounce",
      "value": "1%",
      "valueClass": "excellent",
      "direction": "flat",
      "delta": "0.0pp",
      "sentiment": "neutral",
      "note": ""
    },
    {
      "label": "Time",
      "value": "1:05",
      "valueClass": "",
      "direction": "flat",
      "delta": "2s",
      "sentiment": "neutral",
      "note": ""
    }
  ],
  "shipping": [
    {
      "label": "Users",
      "value": "4,003",
      "valueClass": "",
      "direction": "down",
      "delta": "1.7%",
      "sentiment": "bad",
      "note": "knock-on from the payment drop-off"
    },
    {
      "label": "Conversion",
      "value": "99%",
      "valueClass": "excellent",
      "direction": "flat",
      "delta": "0.0pp",
      "sentiment": "neutral",
      "note": ""
    },
    {
      "label": "Bounce",
      "value": "0.5%",
      "valueClass": "excellent",
      "direction": "flat",
      "delta": "0.0pp",
      "sentiment": "neutral",
      "note": ""
    },
    {
      "label": "Time",
      "value": "0:30",
      "valueClass": "",
      "direction": "flat",
      "delta": "1s",
      "sentiment": "neutral",
      "note": ""
    }
  ],
  "delivery": [
    {
      "label": "Users",
      "value": "3,963",
      "valueClass": "",
      "direction": "down",
      "delta": "1.5%",
      "sentiment": "bad",
      "note": "knock-on from the payment drop-off"
    },
    {
      "label": "Conversion",
      "value": "98%",
      "valueClass": "excellent",
      "direction": "flat",
      "delta": "0.2pp",
      "sentiment": "neutral",
      "note": ""
    },
    {
      "label": "Bounce",
      "value": "2%",
      "valueClass": "good",
      "direction": "down",
      "delta": "0.4pp",
      "sentiment": "good",
      "note": ""
    },
    {
      "label": "Time",
      "value": "0:45",
      "valueClass": "",
      "direction": "flat",
      "delta": "1s",
      "sentiment": "neutral",
      "note": ""
    }
  ],
  "support": [
    {
      "label": "Users",
      "value": "3,884",
      "valueClass": "",
      "direction": "up",
      "delta": "7.3%",
      "sentiment": "bad",
      "note": "rising contact volume, mostly payment and tracking queries"
    },
    {
      "label": "Engagement",
      "value": "42% reach",
      "valueClass": "caution",
      "direction": "up",
      "delta": "3.1pp",
      "sentiment": "good",
      "note": "self-service content is reaching more people"
    },
    {
      "label": "Bounce",
      "value": "5%",
      "valueClass": "caution",
      "direction": "down",
      "delta": "0.6pp",
      "sentiment": "good",
      "note": ""
    },
    {
      "label": "Time",
      "value": "2:08",
      "valueClass": "",
      "direction": "up",
      "delta": "14s",
      "sentiment": "bad",
      "note": "responses are slowing as volume climbs"
    }
  ]
};

export const COMPARISON_WINDOW = '4-week trend';
