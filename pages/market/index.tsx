import React, { useState } from "react";
import { Card } from "react-bootstrap";

interface GetMarketResponse {
  data: string;
}

function SimpleCard({ marketResponse }) {
  return (
    <Card className="m-3 ">
      <Card.Header className="text-center">{marketResponse.data}</Card.Header>
    </Card>
  );
}
const initialMarket: GetMarketResponse = {
  data: "hello",
};

export default function Home(props) {
  const [marketResponse, setMarketResponse] = useState(initialMarket);

  function clicked() {
    fetch(props.backendHost + "/market")
      .then((received) => received.json())
      .then((marketResponse) => marketResponse as GetMarketResponse)
      .then((receivedState) => setMarketResponse(receivedState));
  }

  return (
    <>
      <button onClick={clicked}>Submit</button>
      <SimpleCard marketResponse={marketResponse} />
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
