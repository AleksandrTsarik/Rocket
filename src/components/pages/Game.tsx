import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Middleware from "../../middlewares";

interface PropsInterface {
  location: any;
  Store: any;
  Dispatch: any;
  history: any;
}

class Game extends React.Component<PropsInterface, {}> {
  constructor(Props: PropsInterface) {
    super(Props);
    this.state = {};
  }

  public componentDidMount() {
    document.title = process.env.SITE_NAME + " | Game!";
    this.props.Dispatch(Middleware.Modal.open("Rules"));
  }

  public render() {
    return (
      <>
        <div className="game">
          <div className="game-box">
            <div className="container">
              <div className="wrapper">
                <div className="info">
                  <div className="distance">1500 км</div>
                  <div className="logo" />
                  <div className="time">01 : 00</div>
                </div>
                <div className="game-field">
                  <div className="question">Автор “Сказки о попе и его работнике Балде”?</div>
                  <div className="answer">
                    <a href="#" className="cross-box" onClick={() => this.props.history.push("/")}>
                      <div className="cross" />
                    </a>
                    <button className="btn btn-default btn-block btn-md">
                      <b>A:</b> Вариант 1
                    </button>
                    <button className="btn btn-default btn-block btn-md">
                      <b>B:</b> Вариант 2
                    </button>
                    <button className="btn btn-default btn-block btn-md">
                      <b>C:</b> Вариант 3
                    </button>
                    <button className="btn btn-default btn-block btn-md">
                      <b>D:</b> Вариант 4
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(
  connect(
    (Store: any) => {
      return { Store };
    },
    (Dispatch: any) => {
      return { Dispatch: (action: any) => Dispatch(action) };
    }
  )(Game)
);
