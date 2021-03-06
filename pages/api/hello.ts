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
              "Currency:CAD": 92.3,
              "Currency:USD": 71,
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
        id: "Xl2",
        name: "Port2",
        accounts: [
          {
            id: "C1",
            holdings: {
              ticketA: 8,
              ticketB: 5,
              ticketC: 3,
              "Currency:CAD": 92.3,
              "Currency:USD": 71,
            },
          },
          {
            id: "C2",
            holdings: {
              ticketD: 7,
              ticketE: 2,
              "Currency:CAD": 25,
              "Currency:USD": 17.5,
            },
          },
          {
            id: "C3",
            holdings: {
              ticketA: 4,
              ticketD: 1,
              "Currency:CAD": 27,
              "Currency:USD": 20.07,
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
      ticketA: {
        amount: 5,
        currency: "usd",
      },
      ticketB: {
        amount: 2,
        currency: "usd",
      },
      ticketC: {
        amount: 7,
        currency: "usd",
      },
      ticketD: {
        amount: 1,
        currency: "cad",
      },
      ticketE: {
        amount: 9,
        currency: "cad",
      },
      "Currency:CAD": {
        amount: 1,
        currency: "cad",
      },
      "Currency:USD": {
        amount: 1,
        currency: "usd",
      },
    },
    conversionRates: {
      usd: 1.3,
      cad: 1,
    },
    targetCurrency: "cad",
  });
}
