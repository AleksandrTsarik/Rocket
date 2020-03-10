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
          dispatch(Store.Game.start(data.data.questions));
          dispatch(Store.Game.config(data.data.settings));
          dispatch(Store.Game.best(data.data.top));
        })
        .catch((Exception: any) => {
          console.log("ethernet is done for initialData", Exception);
        });
    };
  }
  public static uploadGameDate(data: any) {
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
        .uploadGameDate({ data })
        .then((data: any) => {
          if (data.status === "success") {
            localStorage.removeItem("games");
          }
        })
        .catch((Exception: any) => {
          console.log("ethernet is done for uploadGameDate:", Exception);
          const getGame = localStorage.getItem("games");
          const games = getGame ? JSON.parse(getGame) : [];
          games.push(data);
          localStorage.setItem("games", JSON.stringify(games));
        });
    };
  }

  // old middlewares
  public static start(data: any) {
    return async (dispatch: any) => {
      dispatch(Store.Game.status("start"));
    };
  }

  public static send(data: any) {
    return async (dispatch: any) => {
      const getGame = localStorage.getItem("games");
      let games = [];
      if (getGame !== undefined) {
        games = getGame ? JSON.parse(getGame) : [];
        games.push(data);
      } else {
        games = [data];
      }
      new Models.Game()
        .send(games)
        .then((data: any) => {
          if (data.status === "success") {
            localStorage.removeItem("games");
          }
        })
        .catch((Exception) => {
          const getGame = localStorage.getItem("games");
          const games = getGame ? JSON.parse(getGame) : [];
          games.push(data);
          localStorage.setItem("games", JSON.stringify(games));
        });
    };
  }
  public static clear() {
    return async (dispatch: any) => {
      dispatch(Store.Game.clear());
    };
  }
}
