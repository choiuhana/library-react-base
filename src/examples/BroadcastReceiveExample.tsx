import React, { useEffect, useState } from "react";
import { useBroadcastContext } from "src/exports";
import { BROADCAST_KEY_SAMPLE_BUTTON_CLICKED, BROADCAST_KEY_SAMPLE_ONLOAD } from "./BroadcastKeys";

export interface BroadcastReceiveExampleProps {}

export const BroadcastReceiveExample = (props: BroadcastReceiveExampleProps): JSX.Element => {
    const { listens, listen, unlisten } = useBroadcastContext();

    const [isLoad, setLoad] = useState<boolean>(false);
    const [buttonClickTime, setButtonClickTime] = useState<number | null>(null);

    // case 1
    // useEffect(() => {
    //     const ls: Array<Broadcast> = [];
    //     ls.push(
    //         listen(BROADCAST_KEY_SAMPLE_BUTTON_CLICKED, (affectedKey, value) => {
    //             setLoad(true);
    //         })
    //     );
    //     ls.push(
    //         listen(BROADCAST_KEY_SAMPLE_ONLOAD, (affectedKey, value) => {
    //             setButtonClickTime(value);
    //         })
    //     );
    //     return () => {
    //         ls.forEach((l) => {
    //             unlisten(l);
    //         });
    //     };
    // }, []);

    // case 2
    useEffect(() => {
        const l = listens([BROADCAST_KEY_SAMPLE_ONLOAD, BROADCAST_KEY_SAMPLE_BUTTON_CLICKED], (affectedKey, value) => {
            if (affectedKey === BROADCAST_KEY_SAMPLE_ONLOAD) {
                setLoad(true);
            } else if (affectedKey === BROADCAST_KEY_SAMPLE_BUTTON_CLICKED) {
                setButtonClickTime(value);
            }
        });
        return () => {
            unlisten(l);
        };
    });

    return (
        <>
            <h1>BroadcastReceiveExample</h1>
            <h2>isLoad: {!isLoad ? "not loaded" : "loaded"}</h2>
            <h2>buttonClickTime: {buttonClickTime}</h2>
        </>
    );
};
