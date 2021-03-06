import { Alert, Card, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import AccuracyWidget from "components/AccuracyWidget";
import { generateCustomPlaceholderURL } from "react-placeholder-image";
import { useEffect, useState } from "react";
import MoneyWidget from "components/MoneyWidget";
import { Money } from "components/Money";
import LineChart from "components/LineChart";
import AccountsTable, { GetTableResponse } from "components/AccountsTable";

function AuthLayout({ children }) {
  return <Container>{children}</Container>;
}

function StockNavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Portfolio</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#portfolios">Portfolios</Nav.Link>
            <Nav.Link href="#settings">Settings</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function WarningHeader() {
  return (
    // Marging m-3: https://getbootstrap.com/docs/5.1/utilities/spacing/#margin-and-padding
    <Row className="m-3">
      <Col>
        <Alert variant="warning">
          <Alert.Heading>
            <Icon.ExclamationTriangleFill className="flex-shrink-0 me-2" />
            Hey, nice to see you
          </Alert.Heading>
          <p>
            Aww yeah, you successfully read this important alert message. This
            example text is going to run a bit longer so that you can see how
            spacing within an alert works with this kind of content.
          </p>
          <p className="mb-0">
            Whenever you need to, be sure to use margin utilities to keep things
            nice and tidy.
          </p>
        </Alert>
      </Col>
    </Row>
  );
}

interface Portfolio {
  id: string;
  name: string;
  accuracy: number;
}

interface Account {
  id: string;
  holdings: Map<string, number>;
}

interface PortfolioDefinition {
  id: string;
  name: string;
  accounts: Account[];
  targetHoldings: Map<string, number>;
}
export interface HoldingsPerMonth {
  month: string;
  holding: number;
}
const otherPlaceholderImageURL = generateCustomPlaceholderURL(100, 25, {
  backgroundColor: "#123456",
  textColor: "#ffffff",
  text: "Graphic",
});
const holdingPerMonth1: HoldingsPerMonth = {
  month: "February",
  holding: 10.0,
};
const holdingPerMonth2: HoldingsPerMonth = {
  month: "March",
  holding: 20.0,
};
const holdingPerMonth3: HoldingsPerMonth = {
  month: "December",
  holding: 30.0,
};
const perMonthHoldings: HoldingsPerMonth[] = [
  holdingPerMonth1,
  holdingPerMonth2,
  holdingPerMonth3,
];
function CardPortfolio({ portfolio, table }) {
  const name = portfolio.name;
  const accuracy = portfolio.accuracy;
  const response:GetTableResponse = table;
  const money = response.totals.total;

  return (
    <Card className="m-3 ">
      <Card.Header className="text-center">{name}</Card.Header>
      <Card.Body>
        {/*<LineChart holdings={perMonthHoldings} />*/}
        {/*<Card.Text>Accuracy {AccuracyWidget(accuracy)}</Card.Text>*/}
        <Card.Text>Total holdings: {MoneyWidget(money)}</Card.Text>
        <AccountsTable table={table} />
      </Card.Body>
    </Card>
  );
}

function CardPortfolios({ portfolios, tablePerPortfolioDefinitions }) {
  return (
    <>
      {portfolios.map((portfolio) => (
        <CardPortfolio
          key={portfolio.id}
          portfolio={portfolio}
          table={tablePerPortfolioDefinitions[portfolio.id]}
        />
      ))}
    </>
  );
}

interface GetPortfolioResponse {
  portfolios: PortfolioDefinition[];
  conversionRates: Map<string, number>;
  targetCurrency: string;
  tablePerPortfolioDefinitions: Map<string, GetTableResponse>;
}

function calculateExpectedAmounts(
  targetAmount: number[],
  totalValueInAccount: number[]
) {
  const expectedAmounts: number[] = new Array<number>();
  for (let i = 0; i < targetAmount.length; i++) {
    expectedAmounts.push(targetAmount[i] * totalValueInAccount[i]);
  }
  return expectedAmounts;
}

function calculateCurrentAmounts(
  currentQuantities: number[],
  ticketsValue: number[]
): number[] {
  const currentAmounts: number[] = new Array<number>();
  for (let i = 0; i < currentQuantities.length; i++) {
    currentAmounts.push(ticketsValue[i] * currentQuantities[i]);
  }
  return currentAmounts;
}

function calculateDifferences(
  expectedAmounts: number[],
  currentAmounts: number[]
): number[] {
  const differences: number[] = new Array<number>();
  for (let i = 0; i < expectedAmounts.length; i++) {
    differences.push(Math.abs(expectedAmounts[i] - currentAmounts[i]));
  }
  return differences;
}

function calculateErrors(
  totalAmountsInAccount: number[],
  differences: number[]
): number[] {
  const errors: number[] = new Array<number>();
  for (let i = 0; i < differences.length; i++) {
    errors.push(differences[i] / totalAmountsInAccount[i]);
  }
  return errors;
}

function calculateWeights(
  totalAmountsInAccount: number[],
  expectedAmounts: number[]
): number[] {
  const weights: number[] = new Array<number>();
  for (let i = 0; i < expectedAmounts.length; i++) {
    weights.push(expectedAmounts[i] / totalAmountsInAccount[i]);
  }
  return weights;
}

function indexOfAll(array: any[], searchItem: any): number[] {
  let result: number[] = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] == searchItem) {
      result.push(i);
    }
  }
  return result;
}

function sumIf(accounts: string[], account: string, currentAmounts: number[]) {
  let accountValue: number[] = [];
  for (const index of indexOfAll(accounts, account)) {
    accountValue.push(currentAmounts[index]);
  }
  return accountValue.reduce((accum, value) => accum + value, 0);
}

function calculateTotalValueInAccounts(
  accounts: string[],
  currentAmounts: number[]
): number[] {
  let accountValues: number[] = [];
  for (const account of accounts) {
    accountValues.push(sumIf(accounts, account, currentAmounts));
  }
  return accountValues;
}

function calculateColumns(
  portfolioDefinitions: PortfolioDefinition[],
  stockPrices: Map<string, Money>,
  conversionRates: Map<string, number>,
  targetCurrency: string
): [
  portfolios: string[],
  accounts: string[],
  targets: number[],
  tickets: string[],
  currentAmounts: number[],
  currentQuantities: number[]
] {
  let portfolioIds: string[] = [];
  let accounts: string[] = [];
  let targets: number[] = [];
  let tickets: string[] = [];
  let currentAmounts: number[] = [];
  let currentQuantities: number[] = [];
  for (let portfolioDefinition of portfolioDefinitions) {
    for (let account of portfolioDefinition.accounts) {
      for (let ticket of Array.from(
        Object.keys(portfolioDefinition.targetHoldings)
      )) {
        if (account.holdings[ticket]) {
          portfolioIds.push(portfolioDefinition.id);
          accounts.push(account.id);
          tickets.push(ticket);
          currentAmounts.push(
            account.holdings[ticket] *
              stockPrices[ticket].amount *
              conversionRates[stockPrices[ticket].currency]
          );
          currentQuantities.push(account.holdings[ticket]);
        } else {
          portfolioIds.push(portfolioDefinition.id);
          accounts.push(account.id);
          tickets.push(ticket);
          currentAmounts.push(0.0);
          currentQuantities.push(0.0);
        }
        if (portfolioDefinition.targetHoldings[ticket]) {
          targets.push(portfolioDefinition.targetHoldings[ticket]);
        } else {
          targets.push(0.0);
        }
      }
    }
  }
  return [
    portfolioIds,
    accounts,
    targets,
    tickets,
    currentAmounts,
    currentQuantities,
  ];
}

function calculateWeightedErrors(
  portfolioDefinition: PortfolioDefinition,
  stockPrices: Map<string, Money>,
  conversionRates: Map<string, number>,
  targetCurrency: string
): number[] {
  let portfolioDefinitions: PortfolioDefinition[] = [portfolioDefinition];
  let [
    portfolios,
    accounts,
    targetAmounts,
    tickets,
    currentAmounts,
    currentQuantities,
  ] = calculateColumns(
    portfolioDefinitions,
    stockPrices,
    conversionRates,
    targetCurrency
  );
  const weightedErrors: number[] = new Array<number>();
  const totalValueInAccounts: number[] = calculateTotalValueInAccounts(
    accounts,
    currentAmounts
  );
  const expectedAmounts: number[] = calculateExpectedAmounts(
    targetAmounts,
    totalValueInAccounts
  );
  const differences: number[] = calculateDifferences(
    expectedAmounts,
    currentAmounts
  );
  const errors: number[] = calculateErrors(totalValueInAccounts, differences);
  const weights: number[] = calculateWeights(
    totalValueInAccounts,
    expectedAmounts
  );
  for (let i = 0; i < errors.length; i++) {
    weightedErrors.push(errors[i] * weights[i]);
  }
  return weightedErrors;
}

function sumOfWeightedErrors(
  portfolioDefinition: PortfolioDefinition,
  stockPrices: Map<string, Money>,
  conversionRates: Map<string, number>,
  targetCurrency: string
): number {
  const weightedErrors = calculateWeightedErrors(
    portfolioDefinition,
    stockPrices,
    conversionRates,
    targetCurrency
  );
  return weightedErrors.reduce((accum, value) => accum + value, 0);
}

function calculateTotalAccuracyInPortfolio(
  portfolioDefinition: PortfolioDefinition,
  stockPrices: Map<string, Money>,
  conversionRates: Map<string, number>,
  targetCurrency: string
): number {
  return (
    1 -
    sumOfWeightedErrors(
      portfolioDefinition,
      stockPrices,
      conversionRates,
      targetCurrency
    )
  );
}

function calculateTotalHoldingsInAccount(
  account: Account,
  stockPrices: Map<string, Money>,
  conversionRates: Map<string, number>,
  targetCurrency: string
): Money {
  let result = new Map<string, number>();
  Object.entries(account.holdings).forEach(([ticket, qty]) => {
    const stockPrice = stockPrices[ticket];
    let accum: number = result[stockPrice.currency];
    if (!accum) {
      accum = 0;
    }
    result[stockPrice.currency] = accum + stockPrice.amount * qty;
  });
  return {
    currency: targetCurrency,
    amount: Object.entries(result)
      .map(([currency, amount]) => amount * conversionRates[currency])
      .reduce((accum, value) => accum + value, 0),
  };
}

function calculateTotalHoldings(
  portfolioDefinition: PortfolioDefinition,
  stockPrices: Map<string, Money>,
  conversionRates: Map<string, number>,
  targetCurrency: string
): Money {
  const holdings: Money[] = portfolioDefinition.accounts.map((account) =>
    calculateTotalHoldingsInAccount(
      account,
      stockPrices,
      conversionRates,
      targetCurrency
    )
  );
  const amounts: number[] = holdings.map((value) => value.amount);
  const totalAmount: number = amounts.reduce((accum, value) => accum + value);
  return {
    amount: totalAmount,
    currency: targetCurrency,
  };
}

function convertPortfolioDefinitionToPortfolio(
  portfolioDefinition: PortfolioDefinition,
  targetCurrency: string
): Portfolio {
  return {
    id: portfolioDefinition.id,
    name: portfolioDefinition.name,
    accuracy: 1.0,

    // accuracy: calculateTotalAccuracyInPortfolio(
    //   portfolioDefinition,
    //   stockPrices,
    //   currencyRates,
    //   targetCurrency
    // ),
  };
}

function convertGetPortfolioResponseToPortfolios(
  portfolioResponse: GetPortfolioResponse
): Portfolio[] {
  return portfolioResponse.portfolios.map((value) =>
    convertPortfolioDefinitionToPortfolio(
      value,
      portfolioResponse.targetCurrency
    )
  );
}

export default function Index(props) {
  const [portfolios, setPortfolios] = useState([]);
  const [tablePerPortfolioDefinitions, setTablePerPortfolioDefinitions] =
    useState({});
  useEffect(() => {
    console.log("setPortfolios");
    fetch(props.backendHost + "/portfolios")
      .then((received) => received.json())
      .then((portfolioResponse) => portfolioResponse as GetPortfolioResponse)
      .then((response) => {
        setTablePerPortfolioDefinitions(response.tablePerPortfolioDefinitions);
        return convertGetPortfolioResponseToPortfolios(response);
      })
      .then((data) => data as Portfolio[])
      .then((receivedPortfolios) => setPortfolios(receivedPortfolios));
  }, []);
  return (
    <>
      <AuthLayout>
        <StockNavBar />
        <WarningHeader />
        <CardPortfolios
          portfolios={portfolios}
          tablePerPortfolioDefinitions={tablePerPortfolioDefinitions}
        />
      </AuthLayout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      backendHost: process.env.BACKEND_HOST,
    },
  };
}
