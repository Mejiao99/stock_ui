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


// PortfolioDefinition: D1,Portfolio1, accounts[]
// C11 Holdings[(TicketA,20),(TicketB,30)]
// C12 Holdings[(TicketA,5),(TicketB,10)]
// C13 Holdings[(TicketA,25),(TicketB,2)]
// PortfolioDefinition: D2,Portfolio2, accounts[] change tickets
// C21 Holdings[(TicketA,20),(TicketB,30)]
// C22 Holdings[(TicketA,5),(TicketB,10)]
// C23 Holdings[(TicketA,25),(TicketB,2)]
// TargetCurrency
// StockPrices
// expected two portfolio

interface GetPortfolioResponse {
  portfolios: PortfolioDefinition[];
  stockPrices: StockPrice[];
}

function GetPortfolioResponseToPortfolios(response: GetPortfolioResponse) {
  return undefined;
}

export default function Index(props) {
  const [portfolios, setPortfolios] = useState([]);
  const toCad: CurrencyRates = { usdToCad: 1.3 };
  useEffect(() => {
    console.log("setPortfolios");
    fetch(props.backendHost + "/portfolios")
        .then((received) => received.json())
        .then((portfolioResponse) => portfolioResponse as GetPortfolioResponse)
        .then((response) => GetPortfolioResponseToPortfolios(response))
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
