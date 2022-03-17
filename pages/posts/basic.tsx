import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import AccuracyWidget from "components/AccuracyWidget";

export default function Basic(staticProps) {
  //Model? extract accuracy

  const [accuracy, setAccuracy] = useState(1.0);

  // if (typeof window !== "undefined") {
  //     window["model"] = (value) => {
  //         setAccuracy({accuracy:value});
  //     }
  // }

  function clicked() {
    setAccuracy(Math.random());
  }

  function clicked2() {
    fetch("/static/accuracy.json")
      .then((received) => received.json())
      .then((data) => data["accuracy"] as number)
      .then((receivedAccuracy) => setAccuracy(receivedAccuracy));
  }

  function clicked4() {
    fetch(staticProps.backendHost + "/hello")
      .then((received) => received.json())
      .then((data) => data["accuracy"] as number)
      .then((receivedAccuracy) => setAccuracy(receivedAccuracy));
  }

  return (
    <>
      <div className="container">
        <header>
          <div className="text-center">
            <h1>Tile</h1>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the cards content.
            </p>
          </div>
        </header>

        <main>
          <div className="row text-center">
            <div className="col">
              <h1 className="value-multiplier">
                {AccuracyWidget(accuracy)}
                <small className="text-muted fw-light">%</small>
              </h1>
              <h5 className="value-heading">Accuracy</h5>
              <p className="value-description">
                Some quick example text to build on the card title and make up
                the bulk of the cards content.
              </p>
            </div>
          </div>

          <div className="row text-center">
            <div className="col">
              <div className="card text-white bg-dark ">
                <div className="card-header">
                  <h1>
                    {" "}
                    {accuracy}
                    <small className="fw-light">%</small>
                  </h1>
                  <div className="card-body">
                    <h5 className="card-title">Dark card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the cards content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row text-center">
            <div className="col">
              <div className="card border-light">
                <div className="card-header">
                  <h1>
                    {" "}
                    {accuracy}
                    <small className="fw-light">%</small>
                  </h1>
                  <div className="card-body">
                    <h5 className="card-title">Title</h5>
                    <p className="card-text">
                      AS quick example text to build on the card title and make
                      up the bulk of the A content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row text-center">
            <div className="col">
              <button onClick={clicked}>random</button>
            </div>
          </div>

          <div className="row text-center">
            <div className="col">
              <button onClick={clicked2}>accuracySeven</button>
            </div>
          </div>

          <div className="row text-center">
            <div className="col">
              <button onClick={clicked4}>accuracyRand</button>
            </div>
          </div>
        </main>
      </div>
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
