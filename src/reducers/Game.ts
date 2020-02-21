import * as Action from "../actions";

export default function Game(state = [], action: any) {
  switch (action.type) {
    case Action.Store.Game.STATUS:
      return {
        ...state,
        status: action.data,
      };
    default:
      return state;
  }
}
