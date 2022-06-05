import React, { useState } from "react";
import { Card } from "react-bootstrap";

function SimpleCard({ state }) {
  return (
    <Card className="m-3 ">
      <Card.Header className="text-center">{state}</Card.Header>
    </Card>
  );
}

export default function Home(props) {
  const [state, setState] = useState("hello");

  function clicked() {
    fetch(props.backendHost + "/market")
      .then((received) => received.json())
      .then((data) => data["data"] as string)
      .then((receivedState) => setState(receivedState));
  }

  return (
    <>
      <button onClick={clicked}>Submit</button>
      <SimpleCard state={state} />
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
