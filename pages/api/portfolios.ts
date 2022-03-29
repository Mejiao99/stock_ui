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
    ],
    stockPrices: {
      ticketA: { amount: 5, currency: "usd" },
      ticketB: { amount: 2, currency: "usd" },
      ticketC: { amount: 7, currency: "usd" },
    },
    conversionRates: {
      USD_TO_CAD: 1.3,
    },
  });
}
