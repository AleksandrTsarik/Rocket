import * as Action from "../actions";

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
        questions: action.data.questions,
        time: action.data.time,
        game_id: action.data.game_id,
        bestResult: action.data.bestResult,
      };
    case Action.Store.Game.CLEAR:
      return [];
    default:
      return state;
  }
}
