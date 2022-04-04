import { useEffect, useReducer, useRef, useState } from 'react';
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

const SOCKET_URL = process.env.REACT_APP_SOCKET_HOST;

const useSocketClient = () => {
    const client = useRef({});

    const [connected, setConnected] = useState(false);
    const [subscribeItems, dispatchSubscribeItems] = useReducer(subscribeItemsReducer, initialSubscribeItems);

    useEffect(() => {
        connect();

        return () => {
            disconnect();
        }
    }, []);

    const connect = () => {
        client.current = new StompJs.Client({
            // brokerURL: "ws://localhost:8081/ws", // 웹소켓 서버로 직접 접속
            webSocketFactory: () => new SockJS(SOCKET_URL), // proxy를 통한 접속
            // connectHeaders: {
            //     "auth-token": "spring-auth-token",
            // },
            debug: function (str) {
                // console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 25000,
            heartbeatOutgoing: 25000,
            onConnect: (e) => {
                console.log('connected socket.');
                setConnected(true);
            },
            onDisconnect: (e) => {
                console.log('disconnected socket.');
                setConnected(false);
            },
            onStompError: (frame) => {
                console.error(frame);
                setConnected(false);
            },
        });

        client.current.activate();
    };

    const disconnect = () => {
        onUnsubscribe();
        setConnected(false);
        client.current.deactivate();
    };

    const onSubscribe = ({ subscribes, callback }) => {
        if (!client.current.connected) {
            return;
        }

        dispatchSubscribeItems({
            type: 'SET_DATA',
            payload: [
                ...subscribeItems,
                ...subscribes.map(r => {
                    return client.current.subscribe(
                        r,
                        async (e) => {
                            callback(e);
                        }
                    )
                })
            ]
        })
    };

    const onUnsubscribe = () => {
        subscribeItems.forEach(r => {
            r.unsubscribe();
        })

        dispatchSubscribeItems({
            type: 'CLEAR'
        })
    }

    const onPublish = (destination, body) => {
        if (!client.current.connected) {
            return;
        }

        client.current.publish({
            destination: destination,
            body: JSON.stringify(body),
        });
    };

    return {
        connected: connected,
        onSubscribe: onSubscribe,
        onUnsubscribe: onUnsubscribe,
        onPublish: onPublish,
    }
}
export default useSocketClient;

const initialSubscribeItems = [];

const subscribeItemsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSubscribeItems;
        default: return initialSubscribeItems;
    }
}