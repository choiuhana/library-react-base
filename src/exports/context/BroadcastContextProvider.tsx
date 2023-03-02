import React, { useCallback, useMemo, useRef } from "react";

// interface
export interface BroadcastContextProviderActions {
    listen: (key: string, callback: BroadcastCallback) => Broadcast;
    listens: (keys: Array<string>, callback: BroadcastCallback) => Broadcast;
    unlisten: (broadcast: Broadcast) => void;
    send: (key: string, value?: any) => void;
}
export interface BroadcastContextProviderProps {
    children: React.ReactNode | undefined;
}
type BroadcastCallback = (affectedKey: string, value?: any) => void;
export interface Broadcast {
    keys: Array<string>;
    callback: BroadcastCallback;
}

// context
const BroadcastContext = React.createContext<BroadcastContextProviderActions>({} as BroadcastContextProviderActions);
export const BroadcastContextProvider = (props: BroadcastContextProviderProps): JSX.Element => {
    const broadcasts = useRef<Array<Broadcast>>(new Array<Broadcast>());

    const listen = useCallback((key: string, callback: BroadcastCallback): Broadcast => {
        return listens([key], callback);
    }, []);

    const listens = useCallback((keys: Array<string>, callback: BroadcastCallback): Broadcast => {
        const broadcast: Broadcast = { keys, callback };
        broadcasts.current.push(broadcast);
        return broadcast;
    }, []);

    const unlisten = useCallback((broadcast: Broadcast): void => {
        broadcasts.current = broadcasts.current.filter((_broadcast) => {
            return broadcast.callback !== _broadcast.callback;
        });
    }, []);

    const send = useCallback((key: string, value?: any): void => {
        broadcasts.current.forEach((broadcast) => {
            broadcast.keys.forEach((_key) => {
                if (key === _key) {
                    broadcast.callback(key, value);
                }
            });
        });
    }, []);

    const actions = useMemo(() => {
        return {
            listen,
            listens,
            unlisten,
            send,
        };
    }, [listen, unlisten, send]);

    return <BroadcastContext.Provider value={actions}>{props.children}</BroadcastContext.Provider>;
};

// hooks
export const useBroadcastContext = () => {
    return React.useContext(BroadcastContext);
};
