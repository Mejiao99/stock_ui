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
            holdings: [
              {
                quantity: 1,
                ticket: "ticketA",
              },
            ],
          },
        ],
      },
    ],
    stockPrices: [
      {
        ticket: "ticketA",
        price: {
          amount: 50,
          currency: "USD",
        },
      },
    ],
  });
}
