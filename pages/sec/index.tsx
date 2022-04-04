import { Alert, Card, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import AccuracyWidget from "components/AccuracyWidget";
import { generateCustomPlaceholderURL } from "react-placeholder-image";
import { useEffect, useState } from "react";
import MoneyWidget from "components/MoneyWidget";
import { Money } from "components/Money";

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
  totalHoldings: Money;
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

const otherPlaceholderImageURL = generateCustomPlaceholderURL(100, 25, {
  backgroundColor: "#123456",
  textColor: "#ffffff",
  text: "Graphic",
});

function CardPortfolio({ portfolio }) {
  const name = portfolio.name;
  const accuracy = portfolio.accuracy;
  const money = portfolio.totalHoldings;

  return (
    <Card className="m-3 ">
      <Card.Header className="text-center">{name}</Card.Header>
      <Card.Body>
        <Card.Img variant="bottom" src={otherPlaceholderImageURL} />
        <Card.Text>Accuracy {AccuracyWidget(accuracy)}</Card.Text>
        <Card.Text>Total holdings: {MoneyWidget(money)}</Card.Text>
      </Card.Body>
    </Card>
  );
}

function CardPortfolios({ portfolios }) {
  return (
    <>
      {portfolios.map((portfolio) => (
        <CardPortfolio key={portfolio.id} portfolio={portfolio} />
      ))}
    </>
  );
}

interface GetPortfolioResponse {
  portfolios: PortfolioDefinition[];
  stockPrices: Map<string, Money>;
  conversionRates: Map<string, number>;
  targetCurrency: string;
}

function calculateWeightedError(error: number, weight: number) {
  return 0;
}

function sumOfWeightedErrors(): number {
  calculateWeightedError(0.5, 0.2);
  return 0;
}

function calculateTotalAccuracyInPortfolio(
  portfolioDefinition: PortfolioDefinition,
  stockPrices: Map<string, Money>,
  conversionRates: Map<string, number>,
  targetCurrency: string
): number {
  return 1 - sumOfWeightedErrors();
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
  stockPrices: Map<string, Money>,
  currencyRates: Map<string, number>,
  targetCurrency: string
): Portfolio {
  return {
    id: portfolioDefinition.id,
    name: portfolioDefinition.name,
    accuracy: calculateTotalAccuracyInPortfolio(
      portfolioDefinition,
      stockPrices,
      currencyRates,
      targetCurrency
    ),
    totalHoldings: calculateTotalHoldings(
      portfolioDefinition,
      stockPrices,
      currencyRates,
      targetCurrency
    ),
  };
}

function convertGetPortfolioResponseToPortfolios(
  portfolioResponse: GetPortfolioResponse
): Portfolio[] {
  return portfolioResponse.portfolios.map((value) =>
    convertPortfolioDefinitionToPortfolio(
      value,
      portfolioResponse.stockPrices,
      portfolioResponse.conversionRates,
      portfolioResponse.targetCurrency
    )
  );
}

export default function Index(props) {
  const [portfolios, setPortfolios] = useState([]);
  useEffect(() => {
    console.log("setPortfolios");
    fetch(props.backendHost + "/portfolios")
      .then((received) => received.json())
      .then((portfolioResponse) => portfolioResponse as GetPortfolioResponse)
      .then((response) => convertGetPortfolioResponseToPortfolios(response))
      .then((data) => data as Portfolio[])
      .then((receivedPortfolios) =>
        setTimeout(() => {
          setPortfolios(receivedPortfolios);
        }, 5000)
      );
  }, []);

  return (
    <>
      <AuthLayout>
        <StockNavBar />
        <WarningHeader />
        <CardPortfolios portfolios={portfolios} />
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
