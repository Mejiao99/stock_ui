// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
        "portfolios": [
          {
            "id": "01",
            "name": "Portfolio1",
            "accuracy": 0.9,
            "totalHoldings": {
              "amount": 5,
              "currency": "USD"
            }
          },
          {
            "id": "02",
            "name": "Portfolio2",
            "accuracy": 0.8,
            "totalHoldings": {
              "amount": 5,
              "currency": "USD"
            }
          },
          {
            "id": "03",
            "name": "Portfolio3",
            "accuracy": 0.4,
            "totalHoldings": {
              "amount": 5,
              "currency": "USD"
            }
          }
        ]
      }
  );
}
