import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import * as Middleware from "../../middlewares";
import { questions, letters, config } from "../../utils/configs";

interface PropsInterface {
  location: any;
  Store: any;
  Dispatch: any;
  history: any;
}

interface StateInterface {
  timer: number;
  step: number;
  right: number;
  minutes: string;
  seconds: string;
  distance: number;
  questions: any;
  runGame: boolean;
  backgroundPosition: number;
  rocketPosition: number;
  smokePosition: number;
}

class Game extends React.Component<PropsInterface, StateInterface> {
  timerGame: NodeJS.Timeout | any;
  timerBackground: NodeJS.Timeout | any;
  constructor(Props: PropsInterface) {
    super(Props);
    this.state = {
      timer: 0,
      step: 0,
      right: 0,
      minutes: "00",
      seconds: "00",
      distance: 1500,
      questions: [],
      runGame: false,
      backgroundPosition: 0,
      rocketPosition: 0,
      smokePosition: 0,
    };
    this.timeToString = this.timeToString.bind(this);
  }

  public componentDidMount() {
    document.title = process.env.SITE_NAME + " | Game!";
    this.props.Dispatch(Middleware.Modal.open("Rules"));
  }

  componentDidUpdate(prevProps: any) {
    if (
      this.props.Store.Game.status === "start" &&
      prevProps !== this.props &&
      this.state.runGame === false
    ) {
      this.setState(
        {
          runGame: true,
          questions: this.props.Store.Game.questions,
          timer: this.props.Store.Game.time,
        },
        () => {
          this.clock();
          this.clockBackground();
        }
      );
    }
    if (
      this.props.Store.Game.status === "stop" &&
      prevProps !== this.props &&
      this.state.runGame === true
    ) {
      this.exit();
    }
  }

  componentWillUnmount() {
    this.setState({
      timer: 0,
      minutes: "00",
      seconds: "00",
    });

    clearTimeout(this.timerGame);
    clearTimeout(this.timerBackground);
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

  gameStep(answer: number) {
    if (this.state.timer > 0) {
      if (this.state.questions[this.state.step].right === answer) {
        this.setState({
          distance: this.state.distance + this.props.Store.Game.questions[answer].distance,
          right: this.state.right + 1,
        });
      } else {
        this.setTimer(this.props.Store.Game.fall);
      }
      this.setState({
        step: this.state.step + 1,
      });
    } else {
      this.props.Dispatch(
        Middleware.Player.result({
          right: this.state.right,
          time: this.state.timer,
        })
      );
      this.props.Dispatch(Middleware.Modal.open("Win"));
    }

    if (this.state.step >= this.state.questions.length - 1) {
      this.props.Dispatch(
        Middleware.Player.result({
          player_id: this.props.Store.Player.id,
          distance: this.state.distance,
          right: this.state.right,
          time: this.state.timer,
        })
      );
      this.props.Dispatch(Middleware.Modal.open("Win"));
    }
  }

  // Every second
  clock() {
    this.timeToString();
    // game in playing
    if (this.state.timer > 0 && this.props.Store.Modal.length === 0) {
      this.setTimer();
      this.timerGame = setTimeout(() => this.clock(), 1000); // timeout дабы избежать лагов при работе с таймером
    } else {
      this.props.Dispatch(Middleware.Modal.open("Win"));
    }
  }

  clockBackground(bonus = 1) {
    if (this.state.timer > 0 && this.props.Store.Modal.length === 0) {
      this.setState({
        backgroundPosition: this.state.backgroundPosition - bonus,
        smokePosition: this.state.smokePosition - bonus - 1,
      });
      this.timerBackground = setTimeout(() => this.clockBackground(), 10); // timeout дабы избежать лагов при работе с таймером
    }
  }

  exit() {
    clearTimeout(this.timerGame);
    clearTimeout(this.timerBackground);
    this.props.history.push("/");
    this.componentWillUnmount();
  }

  public render() {
    if (this.state.questions !== null) {
      return (
        <>
          <div className="game">
            <div
              className="game-background"
              style={{ backgroundPositionX: this.state.backgroundPosition }}
            >
              <div className="rocket">
                <div className="smoke" style={{ backgroundPositionX: this.state.smokePosition }} />
              </div>
            </div>
            <div className="game-box">
              <div className="container">
                <div className="wrapper">
                  <div className="info">
                    <div className="distance">{this.state.distance} км</div>
                    <div className="logo" />
                    <div className="time">
                      {this.state.minutes} : {this.state.seconds}
                    </div>
                  </div>
                  <div className="game-field">
                    {this.state.questions[this.state.step] !== undefined ? (
                      <>
                        <div className="question">
                          {this.state.questions[this.state.step].question}
                        </div>
                        <div className="answer">
                          <a href="#" className="cross-box" onClick={() => this.exit()}>
                            <div className="cross" />
                          </a>
                          {questions[this.state.step].answers.map(
                            (answer: string, index: number) => {
                              return (
                                <button
                                  key={index}
                                  onClick={() => this.gameStep(index)}
                                  className="btn btn-default btn-block btn-md"
                                >
                                  <b>{letters[index]}:</b> {answer}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="preload">
          <p>preload...</p>
        </div>
      );
    }
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
