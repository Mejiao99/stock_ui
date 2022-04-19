export default function handler(req, res) {
  res.status(200).json({
    // accounts: string[];
    accounts: ["C1", "C2", "C3", "C4"],
    tickets: ["TicketA", "TicketB", "TicketC"],
    data: [
      [
        { amount: 6.29, currency: "CAD" },
        { amount: 5, currency: "USD" },
        { amount: 0, currency: "EUR" },
      ],
      [
        { amount: 12.57, currency: "CAD" },
        { amount: 5, currency: "USD" },
        { amount: 4.6, currency: "EUR" },
      ],
      [
        { amount: 6.29, currency: "CAD" },
        { amount: 5, currency: "USD" },
        { amount: 0, currency: "EUR" },
      ],
      [
        { amount: 6.29, currency: "CAD" },
        { amount: 5, currency: "USD" },
        { amount: 0, currency: "EUR" },
      ],
    ],
    totals: {
      account: [
        { currency: "CAD", amount: 10 },
        { currency: "USD", amount: 20 },
        { currency: "CAD", amount: 10 },
        { currency: "CAD", amount: 10 },
      ],
      ticket: [
        { currency: "CAD", amount: 31.44 },
        { currency: "USD", amount: 20 },
        { currency: "EUR", amount: 4.6 },
      ],
      total: { currency: "CAD", amount: 50 },
    },
  });
}
