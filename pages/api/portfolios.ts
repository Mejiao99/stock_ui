// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    portfolios: [
      {
        id: "port-1",
        name: "Port1",
        // total holdings = 92.3
        accounts: [
          {
            id: "C1",
            holdings: {
              ticketA: 8, // usd 40 = cad 52
              ticketB: 5, // usd 10 = cad 13
              ticketC: 3, // usd 21 = cad 27.3
            },
          },
        ],
        targetHoldings: {
          ticketA: 0.2,
          ticketB: 0.3,
          ticketC: 0.3,
          ticketD: 0.1,
          ticketE: 0.1,
        },
      },
      {
        id: "port-2",
        name: "Port2",
        // total holdings = cad 144.3
        accounts: [
          {
            id: "C1",
            holdings: {
              ticketA: 8, // usd 40 = cad 52
              ticketB: 5, // usd 10 = cad 13
              ticketC: 3, // usd 21 = cad 27.3
            },
          },
          {
            id: "C2",
            holdings: {
              ticketD: 7, // cad 7
              ticketE: 2, // cad 18
            },
          },
          {
            id: "C3",
            holdings: {
              ticketA: 4, // usd 20 = cad 26
              ticketD: 1, // cad 1
            },
          },
        ],
        targetHoldings: {
          ticketA: 0.2,
          ticketB: 0.3,
          ticketC: 0.3,
          ticketD: 0.1,
          ticketE: 0.1,
        },
      },
    ],
    stockPrices: {
      ticketA: { amount: 5, currency: "usd" },
      ticketB: { amount: 2, currency: "usd" },
      ticketC: { amount: 7, currency: "usd" },
      ticketD: { amount: 1, currency: "cad" },
      ticketE: { amount: 9, currency: "cad" },
    },
    conversionRates: {
      usd: 1.3,
      cad: 1.0,
    },
    targetCurrency: "cad",
    tablePerPortfolioDefinitions: {
      "port-1": {
        accounts: ["C1", "C2", "C3", "C4"],
        tickets: [
          "TicketA",
          "TicketB",
          "TicketC",
          "Currency:CAD",
          "Currency:USD",
        ],
        data: [
          [
            { amount: 6.29, currency: "CAD" },
            { amount: 5, currency: "USD" },
            { amount: 0, currency: "EUR" },
            { amount: 10, currency: "CAD" },
            { amount: 7.96, currency: "USD" },
          ],
          [
            { amount: 12.57, currency: "CAD" },
            { amount: 5, currency: "USD" },
            { amount: 4.60, currency: "EUR" },
            { amount: 20, currency: "CAD" },
            { amount: 15.91, currency: "USD" },
          ],
          [
            { amount: 6.29, currency: "CAD" },
            { amount: 5, currency: "USD" },
            { amount: 0, currency: "EUR" },
            { amount: 10, currency: "CAD" },
            { amount: 7.96, currency: "USD" },
          ],
          [
            { amount: 6.29, currency: "CAD" },
            { amount: 5, currency: "USD" },
            { amount: 0, currency: "EUR" },
            { amount: 10, currency: "CAD" },
            { amount: 7.96, currency: "USD" },
          ],
          [
            { amount: 6.29, currency: "CAD" },
            { amount: 5, currency: "USD" },
            { amount: 0, currency: "EUR" },
            { amount: 10, currency: "CAD" },
            { amount: 7.96, currency: "USD" },
          ],
        ],
        totals: {
          accounts: [
            { currency: "CAD", amount: 10 },
            { currency: "CAD", amount: 10 },
            { currency: "USD", amount: 20 },
            { currency: "CAD", amount: 10 },
          ],
          tickets: [
            { currency: "CAD", amount: 31.44 },
            { currency: "USD", amount: 20 },
            { currency: "EUR", amount: 4.6 },
            { currency: "Currency:CAD", amount: 50 },
            { currency: "Currency:USD", amount: 39.78 },
          ],
          total: { currency: "CAD", amount: 50 },
        },
      },
      "port-2": {
        accounts: ["C1", "C2", "C3", "C4"],
        tickets: [
          "TicketA",
          "TicketB",
          "TicketC",
          "Currency:CAD",
          "Currency:USD",
        ],
        data: [
          [
            { amount: 6.29, currency: "CAD" },
            { amount: 5, currency: "USD" },
            { amount: 0, currency: "EUR" },
            { amount: 10, currency: "CAD" },
            { amount: 7.96, currency: "USD" },
          ],
          [
            { amount: 12.57, currency: "CAD" },
            { amount: 5, currency: "USD" },
            { amount: 4.60, currency: "EUR" },
            { amount: 20, currency: "CAD" },
            { amount: 15.91, currency: "USD" },
          ],
          [
            { amount: 6.29, currency: "CAD" },
            { amount: 5, currency: "USD" },
            { amount: 0, currency: "EUR" },
            { amount: 10, currency: "CAD" },
            { amount: 7.96, currency: "USD" },
          ],
          [
            { amount: 6.29, currency: "CAD" },
            { amount: 5, currency: "USD" },
            { amount: 0, currency: "EUR" },
            { amount: 10, currency: "CAD" },
            { amount: 7.96, currency: "USD" },
          ],
        ],
        totals: {
          accounts: [
            { currency: "CAD", amount: 10 },
            { currency: "CAD", amount: 20 },
            { currency: "CAD", amount: 10 },
            { currency: "CAD", amount: 10 },
          ],
          tickets: [
            { currency: "CAD", amount: 31.44 },
            { currency: "USD", amount: 20 },
            { currency: "EUR", amount: 4.6 },
            { currency: "Currency:CAD", amount: 50 },
            { currency: "Currency:USD", amount: 39.78 },
          ],
          total: { currency: "CAD", amount: 50 },
        },
      },
    },
  });
}
