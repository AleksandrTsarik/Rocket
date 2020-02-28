import * as Action from "../actions";

export default function Player(state = [], action: any) {
  switch (action.type) {
    case Action.Store.Player.CREATE:
      return {
        ...state,
        id: action.data,
      };
    case Action.Store.Player.CLEAR:
      return [];
    case Action.Store.Player.RESULT:
      return {
        ...state,
        time: action.data.time,
        right: action.data.right,
        distance: action.data.distance,
      };
    default:
      return state;
  }
}
