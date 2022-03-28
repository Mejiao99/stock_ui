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
interface Holding {
  quantity: number;
  ticket: string;
}
interface Account {
  id: string;
  holdings: Holding[];
}

interface PortfolioDefinition {
  id: string;
  name: string;
  accounts: Account[];
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

function Calc({ portfolioDefinition }, { stockPrices }) {
  return portfolioDefinition.map((value) => value.name);
}

export default function Index(props) {
  const [portfolioDefinition, setPortfolioDefinition] = useState([]);
  console.log("" + portfolioDefinition);
  useEffect(() => {
    fetch(props.backendHost + "/portfolios")
      .then<PortfolioDefinition[]>((r) => r.json())
      .then((receivedPortfolios) =>
        setTimeout(() => {
          setPortfolioDefinition(receivedPortfolios);
        }, 5000)
      );
  }, []);
  console.log(portfolioDefinition["portfolios"].map((value) => value.name));
  return (
    <>
      <AuthLayout>
        <StockNavBar />
        <WarningHeader />
        {/*<CardPortfolios portfolios={portfolios["portfolios"]} />*/}
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
