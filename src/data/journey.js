// The eight journey stages, in order. `mood` drives both the emoji and the
// height of the emotional curve — change it here and the curve redraws.
export const MOODS = {
  "delighted": {
    "y": 25,
    "emoji": "😄",
    "color": "#10b981",
    "label": "Delighted"
  },
  "happy": {
    "y": 41,
    "emoji": "😊",
    "color": "#10b981",
    "label": "Happy"
  },
  "neutral": {
    "y": 70,
    "emoji": "😐",
    "color": "#f59e0b",
    "label": "Neutral"
  },
  "anxious": {
    "y": 95,
    "emoji": "😟",
    "color": "#ef4444",
    "label": "Anxious"
  }
};

export const STAGES = [
  {
    "id": "browse",
    "name": "Browse Products",
    "performance": "good",
    "indicator": "68%",
    "action": "Customer searches & browses products to find what they need",
    "mood": "happy"
  },
  {
    "id": "cart",
    "name": "Add to Cart",
    "performance": "excellent",
    "indicator": "89%",
    "action": "Customer selects items and adds them to their shopping cart",
    "mood": "happy"
  },
  {
    "id": "checkout",
    "name": "Checkout",
    "performance": "good",
    "indicator": "75%",
    "action": "Customer enters shipping address and reviews order details",
    "mood": "neutral"
  },
  {
    "id": "payment",
    "name": "Payment",
    "performance": "critical",
    "indicator": "75%",
    "action": "Customer enters payment information and confirms purchase",
    "mood": "anxious"
  },
  {
    "id": "confirm",
    "name": "Confirmation",
    "performance": "excellent",
    "indicator": "98%",
    "action": "Customer receives order confirmation and tracking info",
    "mood": "delighted"
  },
  {
    "id": "shipping",
    "name": "Shipping",
    "performance": "excellent",
    "indicator": "99%",
    "action": "Package is processed and in transit to customer's address",
    "mood": "neutral"
  },
  {
    "id": "delivery",
    "name": "Delivery",
    "performance": "excellent",
    "indicator": "98%",
    "action": "Package arrives and customer receives their order",
    "mood": "happy"
  },
  {
    "id": "support",
    "name": "Post-Purchase Support",
    "performance": "good",
    "indicator": "End",
    "action": "Customer seeks help, returns, or engages with loyalty program",
    "mood": "neutral"
  }
];
