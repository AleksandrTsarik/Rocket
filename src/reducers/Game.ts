import * as Action from "../actions";
import { config, bestResult } from '../utils/configs';

export default function Game(state = [], action: any) {
  switch (action.type) {
    case Action.Store.Game.STATUS:
      return {
        ...state,
        status: action.data,
      };
    case Action.Store.Game.START:
      return {
        ...state,
        questions: action.data,
        time: config.time,
      };
    case Action.Store.Game.BEST:
      return {
        ...state,
        bestResult: action.data,
      };
    case Action.Store.Game.CLEAR:
      return [];
    default:
      return state;
  }
}
