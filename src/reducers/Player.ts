import * as Action from "../actions";

export default function Player(state = [], action: any) {
  switch (action.type) {
    case Action.Store.Player.CREATE:
      return action.data;
    case Action.Store.Player.CLEAR:
      return [];
    case Action.Store.Player.RESULT:
      console.log(action.data);
      return {
        ...state,
        time: action.data.time,
        correct_answers: action.data.correct,
        score: action.data.score,
      };
    default:
      return state;
  }
}
