import WebSocket from 'ws';
import MainController, { TICK_INTERVAL } from './MainController';
import { MatchUpdate } from '../../darwin-types/messages/MatchUpdate';
import { Tick } from '../../darwin-types/Tick';
import { ConnectionInitialization } from '../../darwin-types/messages/ConnectionInitialization';

describe('MainController', () => {
  // Websocket mocks
  const sendFunction0 = jest.fn();
  const sendFunction1 = jest.fn();
  const onFunction = jest.fn();
  const wsMock0: unknown = {
    send: sendFunction0,
    on: onFunction,
  };
  const wsMock1: unknown = {
    send: sendFunction1,
    on: onFunction,
  };

  let mainController: MainController;
  jest.useFakeTimers();

  const parseMatchUpdate = (body: string): MatchUpdate => {
    return JSON.parse(body);
  };

  const parseConnectionInitialization = (
    body: string
  ): ConnectionInitialization => {
    return JSON.parse(body);
  };

  beforeEach(() => {
    mainController = new MainController();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('sends a generated connection id back', () => {
    mainController.newConnection(wsMock0 as WebSocket, 'connection0');
    const connectionInitialization = parseConnectionInitialization(
      sendFunction0.mock.calls[0][0]
    );
    expect(connectionInitialization.type).toBe('connectionInitialization');
    expect(connectionInitialization.payload.connectionId).not.toBe(
      'connection0'
    );
  });

  it('sends the previous connection id back', () => {
    // first connection
    mainController.newConnection(wsMock0 as WebSocket, 'connection0');
    const connectionInitialization0 = parseConnectionInitialization(
      sendFunction0.mock.calls[0][0]
    );

    // second one
    mainController.newConnection(
      wsMock1 as WebSocket,
      connectionInitialization0.payload.connectionId
    );
    const connectionInitialization1 = parseConnectionInitialization(
      sendFunction1.mock.calls[0][0]
    );

    // assert
    expect(connectionInitialization1.type).toBe('connectionInitialization');
    expect(connectionInitialization1.payload.connectionId).toBe(
      connectionInitialization0.payload.connectionId
    );
  });

  it('starts ticking', () => {
    mainController.newConnection(wsMock0 as WebSocket, 'connection0');
    jest.advanceTimersByTime(TICK_INTERVAL);
    expect(setInterval).toBeCalledTimes(1);
  });

  it('sends a matchUpdate', () => {
    mainController.newConnection(wsMock0 as WebSocket, 'connection0');
    jest.advanceTimersByTime(TICK_INTERVAL);

    const matchUpdate = parseMatchUpdate(sendFunction0.mock.calls[1][0]);
    expect(matchUpdate.type).toBe('matchUpdate');
  });

  it('sends correct states on tick', () => {
    mainController.newConnection(wsMock0 as WebSocket, 'connection0');
    jest.advanceTimersByTime(TICK_INTERVAL);

    const matchUpdate = parseMatchUpdate(sendFunction0.mock.calls[1][0]);
    const unitId = matchUpdate.payload.state.objectIds[0];

    expect(unitId).not.toBeNull();
    expect(matchUpdate.payload.state.objectMap[unitId]).toBeDefined();
  });

  it('increments tick counter on each tick', () => {
    let matchUpdate;

    mainController.newConnection(wsMock0 as WebSocket, 'connection0');

    jest.advanceTimersByTime(TICK_INTERVAL);
    matchUpdate = parseMatchUpdate(sendFunction0.mock.calls[1][0]);
    expect(matchUpdate.payload.meta.currentTick).toBe(1);

    jest.advanceTimersByTime(TICK_INTERVAL);
    matchUpdate = parseMatchUpdate(sendFunction0.mock.calls[2][0]);
    expect(matchUpdate.payload.meta.currentTick).toBe(2);
  });

  function assertStatesMatch(
    updateClient0: string,
    updateClient1: string,
    expectedTick: Tick
  ): void {
    const matchUpdate0 = parseMatchUpdate(updateClient0);
    const matchUpdate1 = parseMatchUpdate(updateClient1);
    expect(matchUpdate0.payload.state).toStrictEqual(
      matchUpdate1.payload.state
    );
    expect(matchUpdate0.payload.userContext.unitId).not.toBe(
      matchUpdate1.payload.userContext.unitId
    );
    expect(matchUpdate0.payload.meta.currentTick).toBe(expectedTick);
    expect(matchUpdate1.payload.meta.currentTick).toBe(expectedTick);
  }

  it('sends the same state to multiple clients', () => {
    mainController.newConnection(wsMock0 as WebSocket, 'connection0');
    mainController.newConnection(wsMock1 as WebSocket, 'connection1');

    jest.advanceTimersByTime(TICK_INTERVAL);
    jest.advanceTimersByTime(TICK_INTERVAL);

    assertStatesMatch(
      sendFunction0.mock.calls[1][0],
      sendFunction1.mock.calls[1][0],
      1
    );
    assertStatesMatch(
      sendFunction0.mock.calls[2][0],
      sendFunction1.mock.calls[2][0],
      2
    );
  });
});
