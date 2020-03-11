import * as Models from "../models";
import * as Store from "../actions/Store";

export default class Game {
  public static initialData() {
    return async (dispatch: any) => {
      new Models.Game()
        .initialData()
        .then((data: any) => {
          localStorage.setItem("settings", JSON.stringify(data.data.settings));
          localStorage.setItem("top", JSON.stringify(data.data.top));
          localStorage.setItem("questions", JSON.stringify(data.data.questions));
          dispatch(Store.Game.config(data.data.settings));
          dispatch(Store.Game.best(data.data.top));
          dispatch(Store.Game.questions(data.data.questions));
        })
        .catch((Exception: any) => {
          console.log("ethernet is done for initialData");
          dispatch(Store.Game.config(JSON.parse(localStorage.getItem("settings") || "")));
          dispatch(Store.Game.best(JSON.parse(localStorage.getItem("top") || "")));
          dispatch(Store.Game.questions(JSON.parse(localStorage.getItem("questions") || "")));
        });
    };
  }
  public static uploadGameData(data: any) {
    return async () => {
      const getGame = localStorage.getItem("games");
      let games = [];
      if (getGame !== undefined) {
        games = getGame ? JSON.parse(getGame) : [];
        games.push(data);
      } else {
        games = [data];
      }

      new Models.Game()
        .uploadGameData(games)
        .then((data: any) => {
          console.log("server get data, clear localStorage");
          localStorage.removeItem("games");
        })
        .catch((Exception: any) => {
          console.log("ethernet is done for uploadGameData");
          const getGame = localStorage.getItem("games");
          const games = getGame ? JSON.parse(getGame) : [];
          games.push(data);
          localStorage.setItem("games", JSON.stringify(games));
        });
    };
  }

  public static status(status: string) {
    return async (dispatch: any) => {
      dispatch(Store.Game.status(status));
    };
  }
  public static clear() {
    return async (dispatch: any) => {
      dispatch(Store.Game.clear());
    };
  }
}
