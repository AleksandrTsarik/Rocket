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

interface StateInterface {
  timer: number;
  minutes: string;
  seconds: string;
  speed: number;
}

class Game extends React.Component<PropsInterface, StateInterface> {
  timerObj: NodeJS.Timeout | any;
  constructor(Props: PropsInterface) {
    super(Props);
    this.state = {
      timer: 90,
      minutes: "00",
      seconds: "00",
      speed: 1500,
    };
    this.timeToString = this.timeToString.bind(this);
  }

  public componentDidMount() {
    document.title = process.env.SITE_NAME + " | Game!";
    this.props.Dispatch(Middleware.Modal.open("Rules"));
    this.clock();
  }

  componentWillUnmount() {
    this.setState({
      timer: 0,
      minutes: "00",
      seconds: "00",
    });

    clearTimeout(this.timerObj);
  }

  // Reverse string time from number
  timeToString() {
    const time = this.state.timer;
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    this.setState({
      minutes,
      seconds,
    });
  }

  // Check timer and update
  setTimer(bonus?: number) {
    let newTimer = this.state.timer - 1 + (bonus || 0);

    if (newTimer < 0) {
      newTimer = 0;
    }

    this.setState({
      timer: newTimer,
    });
  }

  // Every second
  clock() {
    this.timeToString();
    // game in playing
    if (this.state.timer > 0) {
      this.setTimer();
      this.timerObj = setTimeout(() => this.clock(), 1000); // timeout дабы избежать лагов при работе с таймером
    }
  }

  exit() {
    clearTimeout(this.timerObj);
    this.props.history.push("/");
    this.componentWillUnmount();
  }

  public render() {
    return (
      <>
        <div className="game">
          <div className="game-box">
            <div className="container">
              <div className="wrapper">
                <div className="info">
                  <div className="distance">{this.state.speed} км</div>
                  <div className="logo" />
                  <div className="time">{this.state.minutes} : {this.state.seconds}</div>
                </div>
                <div className="game-field">
                  <div className="question">Автор “Сказки о попе и его работнике Балде”?</div>
                  <div className="answer">
                    <a href="#" className="cross-box" onClick={() => this.exit()}>
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
