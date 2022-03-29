// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    portfolios: [
      {
        id: "Xl1",
        name: "Port1",
        accounts: [
          {
            id: "C1",
            holdings: {
              ticketA: 8,
              ticketB: 5,
              ticketC: 3,
            },
          },
        ],
      },
      {
        id: "Xl2",
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
  });
}
