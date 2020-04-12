import { State, UserExecutionContext } from '@darwin/types';
import recordIntents from './recordIntents';
import scheduleIntents from './schedule-intents';
import { UserTickIntents } from './intent/Intent';
import handleGameMechanics from './mechanics';

/**
 * Executes all given user executionContexts and returns the next state object.
 *
 * @param state
 * @param executionContexts
 */
function performTick(
  state: State,
  executionContexts: UserExecutionContext[]
): State {
  const userTicks = executionContexts.map(
    (executionContext): UserTickIntents => {
      try {
        const intents = recordIntents(executionContext, state);
        return {
          context: executionContext,
          intents,
        };
      } catch (e) {
        // assume no intents in case of script error
        return {
          context: executionContext,
          intents: [],
        };
      }
    }
  );

  const newState = scheduleIntents(state, userTicks);
  return handleGameMechanics(newState);
}

export default performTick;
