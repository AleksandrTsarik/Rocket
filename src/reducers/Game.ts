import * as Action from "../actions";
import { config } from "../utils/configs";

export default function Game(state = [], action: any) {
  switch (action.type) {
    case Action.Store.Game.STATUS:
      return {
        ...state,
        status: action.data,
      };
    case Action.Store.Game.CONFIG:
      return {
        ...state,
        config: action.data,
      };
    case Action.Store.Game.QUESTIONS:
      return {
        ...state,
        questions: action.data,
      };
    case Action.Store.Game.BEST:
      return {
        ...state,
        best: action.data,
      };
    case Action.Store.Game.CLEAR:
      return [];
    default:
      return state;
  }
}
