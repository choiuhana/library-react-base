import React from "react";
import { BroadcastSendExample } from "./examples/BroadcastSendExample";
import { BroadcastContextProvider } from "./exports";

function App() {
    return (
        <div className="App">
            <BroadcastContextProvider>
                <BroadcastSendExample />
            </BroadcastContextProvider>
        </div>
    );
}

export default App;
