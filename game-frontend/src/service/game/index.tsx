import React, { FC } from 'react';
import { Message } from '../../../../darwin-types/messages/Message';
import { State } from '../../../../darwin-types/State';
import { UserContext } from '../../../../darwin-types/UserContext';
import { useWebsocket, useWebsocketContext, WebsocketContext } from './context';

export const WebsocketProvider: FC = props => {
  const websocketData = useWebsocket();
  return <WebsocketContext.Provider value={websocketData} {...props} />;
};

export function useGameState(): State {
  const { state } = useWebsocketContext();
  return state;
}

export function useUserContext(): UserContext {
  const { userContext } = useWebsocketContext();
  return userContext;
}

export function useSendMessage(): (message: Message) => void {
  const { socket } = useWebsocketContext();

  const send = (message: Message): void => {
    if (socket) {
      socket.send(JSON.stringify(message));
    }
  };
  return send;
}