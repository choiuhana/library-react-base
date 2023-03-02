import React, { useEffect } from "react";
import { useBroadcastContext } from "src/exports";
import { BROADCAST_KEY_SAMPLE_BUTTON_CLICKED, BROADCAST_KEY_SAMPLE_ONLOAD } from "./BroadcastKeys";
import { BroadcastReceiveExample } from "./BroadcastReceiveExample";

export interface BroadcastSendExampleProps {}
export const BroadcastSendExample = (props: BroadcastSendExampleProps): JSX.Element => {
    const { send } = useBroadcastContext();
    useEffect(() => {
        setTimeout(() => {
            send(BROADCAST_KEY_SAMPLE_ONLOAD);
        }, 1000);
    }, []);

    return (
        <>
            <h1>BroadcastSendExample</h1>
            <button
                onClick={(event) => {
                    send(BROADCAST_KEY_SAMPLE_BUTTON_CLICKED, event.timeStamp);
                }}>
                click me
            </button>
            <BroadcastReceiveExample />
        </>
    );
};
