import Head from 'next/head'
import {getSortedPostsData} from "lib/posts";
import utilStyles from 'styles/utils.module.css'
import { Alert, Card, Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';


function AuthLayout({children}) {
    return (
        <Container>
            {children}
        </Container>
    )
}

function StockNavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <div className="container">
                <Navbar.Brand href="#home">Portfolio</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="#portfolios">Portfolios</Nav.Link>
                        <Nav.Link href="#settings">Settings</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

function WarningHeader() {
    return (
        // Marging m-3: https://getbootstrap.com/docs/5.1/utilities/spacing/#margin-and-padding
        <Row  className="m-3">
            <Col>
                <Alert variant="warning">

                    <Alert.Heading>
                        <Icon.ExclamationTriangleFill className="flex-shrink-0 me-2" />
                        Hey, nice to see you
                    </Alert.Heading>
                    <p>
                        Aww yeah, you successfully read this important alert message. This example
                        text is going to run a bit longer so that you can see how spacing within an
                        alert works with this kind of content.
                    </p>
                    <p className="mb-0">
                        Whenever you need to, be sure to use margin utilities to keep things nice
                        and tidy.
                    </p>
                </Alert>
            </Col>
        </Row>
    )
}


function CardPortfolio() {
    return (
        <Card>
            <Card.Body>
                body
            </Card.Body>
        </Card>
    )
}


export default function Index() {
    return (
        <>
            <AuthLayout>
                <StockNavBar />

                <WarningHeader />

                <CardPortfolio />
            </AuthLayout>
        </>
    )
}

export async function getStaticProps() {
    return {
        props: {

        }
    }
}