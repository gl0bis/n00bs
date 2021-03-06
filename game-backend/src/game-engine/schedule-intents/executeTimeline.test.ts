import { State } from '@darwin/types';
import scheduleIntents from './index';

describe('scheduleIntents', () => {
  const getDummyState = (): State => ({
    objectMap: {},
    objectIds: [],
  });
  it('returns state of a given intent', () => {
    const mockExecute = jest.fn();
    const state = getDummyState();
    mockExecute.mockReturnValueOnce(state);
    const newState = scheduleIntents(getDummyState(), [
      {
        context: {
          unitId: '',
          userId: '',
          userScript: {
            script: '',
          },
          store: {},
        },
        intents: [
          {
            execute: mockExecute,
            cost: 3,
          },
        ],
        feedback: [],
      },
    ]);

    expect(newState).toBe(state);
  });
});
