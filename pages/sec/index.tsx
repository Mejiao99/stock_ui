import {Alert, Card, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import AccuracyWidget from "../../src/components/AccuracyWidget";

function AuthLayout({children}) {
    return <Container>{children}</Container>;
}

function StockNavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Portfolio</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
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
                        <Icon.ExclamationTriangleFill className="flex-shrink-0 me-2"/>
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

interface Money {
    amount: number;
    currency: string;
}

interface Portfolio {
    accuracy?: number;
    totalHoldings?: Money[];
}

const port1: Portfolio = {
    accuracy: 0.9,
    totalHoldings: [{
        amount: 5,
        currency: "USD",
    }]
}
const accuracy = port1.accuracy;
const amount = port1.totalHoldings.at(0).amount;
const currency = port1.totalHoldings.at(0).currency;

function CardAccuracy() {
    return (
        <Card>
            <Card.Header><h1>Accuracy</h1></Card.Header>
            <Card.Body>
                <h5>{AccuracyWidget(accuracy)}</h5>
            </Card.Body>
        </Card>
    )
}

function CardHoldings() {
    return (
        <Card>
            <Card.Header><h1>Holdings</h1></Card.Header>
            <Card.Body>
                <h5>{amount}<small className="fw-light">${currency}</small></h5>
            </Card.Body>
        </Card>
    )
}

function CardPortfolio() {
    return (
        <Card>
            <Card.Body>body</Card.Body>
        </Card>
    );
}

export default function Index() {
    return (
        <>
            <AuthLayout>
                <StockNavBar/>

                <WarningHeader/>
                <CardHoldings/>
                <CardPortfolio/>
            </AuthLayout>
        </>
    );
}

export async function getStaticProps() {
    return {
        props: {},
    };
}
