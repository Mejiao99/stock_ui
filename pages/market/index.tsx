import React, {useState} from "react";

export default function Home({staticProps}) {
    const [state, setState] = useState("hello");
    function clicked() {
        fetch(staticProps.backendHost + "/market")
            .then((received) => received.json())
            .then((data) => data["market"] as string)
            .then((receivedState) => setState(receivedState));
    }
    return  <button onClick={clicked}>{state}</button>;
}
