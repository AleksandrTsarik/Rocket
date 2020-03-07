import * as Action from "../actions";

export default function Player(state = [], action: any) {
  switch (action.type) {
    case Action.Store.Player.CREATE:
      return action.data;
    case Action.Store.Player.CLEAR:
      return [];
    case Action.Store.Player.RESULT:
      return {
        ...state,
        time: action.data.time,
        correct_answers: action.data.correct_answers,
        distance: action.data.distance,
      };
    default:
      return state;
  }
}
