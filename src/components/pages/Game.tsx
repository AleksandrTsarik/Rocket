import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import * as Middleware from "../../middlewares";
import { letters } from "../../utils/configs";
import "csshake";

interface PropsInterface {
  location: any;
  Store: any;
  Dispatch: any;
  history: any;
}

interface StateInterface {
  timer: number;
  start_at: number;
  timerSeconds: number;
  fall: number;
  fallTimer: boolean;
  step: number;
  right: number;
  minutes: string;
  seconds: string;
  score: number;
  questions: any;
  runGame: boolean;
  backgroundPosition: number;
  backgroundSpeedBonus: number;
  rocketPosition: number;
  smokePosition: number;
  smokeSpeedBonus: number;
  smokeVision: boolean;
  animationRocket: string;
  blockIntarface: boolean;
}

class Game extends React.Component<PropsInterface, StateInterface> {
  timerGame: NodeJS.Timeout | any;
  timerBackground: NodeJS.Timeout | any;
  constructor(Props: PropsInterface) {
    super(Props);
    this.state = {
      timer: 0,
      start_at: 0,
      timerSeconds: 0,
      fall: 0,
      fallTimer: false,
      step: 0,
      right: 0,
      minutes: "00",
      seconds: "00",
      score: 0,
      questions: [],
      runGame: false,
      backgroundPosition: 0,
      backgroundSpeedBonus: 1,
      rocketPosition: 0,
      smokePosition: 0,
      smokeSpeedBonus: 1,
      smokeVision: true,
      animationRocket: "",
      blockIntarface: false,
    };
    this.timeToString = this.timeToString.bind(this);
    this.setAnimation = this.setAnimation.bind(this);
    this.gg = this.gg.bind(this);
    this.setTimer = this.setTimer.bind(this);
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
      // get from localStorage
      const settings = this.props.Store.Game.config;
      const questions = this.props.Store.Game.questions;
      questions.sort(() => {
        return Math.random() - 0.5;
      });
      questions.forEach((question: any) => {
        question.answers.sort(() => {
          return Math.random() - 0.5;
        });
      });

      this.setState(
        {
          runGame: true,
          questions,
          timer: parseInt(settings.time, 10),
          fall: parseInt(settings.fall, 10),
          start_at: Math.round(new Date().getTime() / 1000),
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
  setTimer() {
    if (this.state.timerSeconds === 9) {
      // for smooth timer
      let newTimer = this.state.timer - 1;

      if (newTimer < 0) {
        newTimer = 0;
      }

      this.setState({
        timer: newTimer,
        timerSeconds: 0,
      });
    } else {
      this.setState({
        timerSeconds: this.state.timerSeconds + 1,
      });
    }

    // wrong answer -> minus time
    if (this.state.fallTimer) {
      let newTimer = this.state.timer - this.state.fall;
      if (newTimer < 0) {
        newTimer = 0;
      }
      this.setState({
        fallTimer: false,
        timer: newTimer,
      });
    }

    if (this.state.timer <= 0) {
      this.gg();
    }
  }

  setAnimation(correct: boolean) {
    let timing = 0;
    this.setState({
      blockIntarface: true,
    });
    if (correct) {
      this.setState({
        animationRocket: "rocket-speed",
        backgroundSpeedBonus: this.state.backgroundSpeedBonus + 1,
        smokeSpeedBonus: this.state.smokeSpeedBonus + 1,
      });
      timing = 4000;
    } else {
      this.setState({
        smokeVision: false,
        animationRocket: "shake-slow shake-constant",
      });
      timing = 2000;
    }

    setTimeout(() => {
      this.setState({
        smokeVision: true,
        animationRocket: "",
      });
    }, timing);

    setTimeout(() => {
      this.setState({
        blockIntarface: false,
      });
    }, 1500);
  }

  gg() {
    const game = {
      Player: {
        firstname: this.props.Store.Player.firstname,
        lastname: this.props.Store.Player.lastname,
        email: this.props.Store.Player.email,
        created_at: this.props.Store.Player.created_at,
        city_id: this.props.Store.Player.city_id,
      },
      Game: {
        started_at: this.state.start_at,
        end_at: Math.round(new Date().getTime() / 1000),
        score: this.state.score,
        count: this.state.step + 1,
      },
    };

    this.props.Dispatch(Middleware.Game.uploadGameData(game));
    this.props.Dispatch(
      Middleware.Player.result({
        score: this.state.score,
        correct_answers: this.state.right,
        total: this.state.questions.length,
      })
    );

    this.props.Dispatch(Middleware.Game.status("end"));
    this.props.Dispatch(Middleware.Modal.open("Win"));
  }

  gameStep(answer: boolean) {
    if (this.state.timer > 0) {
      if (answer === true) {
        this.setAnimation(true);
        this.setState({
          score: this.state.score + this.state.questions[this.state.step].score,
          right: this.state.right + 1,
        });
      } else {
        this.setAnimation(false);
        this.setState({
          fallTimer: true,
        });
      }
      this.setState({
        step: this.state.step + 1,
      });
    } else {
      // GG time is up
      this.gg();
    }

    if (this.state.step >= this.state.questions.length - 1) {
      // GG end game
      this.gg();
    }
  }

  // Every second
  clock() {
    this.timeToString();
    // game playing
    if (this.state.timer > 0 && this.props.Store.Modal.length === 0) {
      if (!this.state.blockIntarface) {
        this.setTimer();
      }
      this.timerGame = setTimeout(() => this.clock(), 100); // timeout дабы избежать лагов при работе с таймером
    }
  }

  clockBackground() {
    if (this.state.timer > 0 && this.props.Store.Modal.length === 0) {
      this.setState({
        backgroundPosition: this.state.backgroundPosition - this.state.backgroundSpeedBonus,
        smokePosition: this.state.smokePosition - this.state.smokeSpeedBonus,
      });
      this.timerBackground = setTimeout(() => this.clockBackground(), 10); // timeout дабы избежать лагов при работе с таймером
    }
  }

  exit() {
    clearTimeout(this.timerGame);
    clearTimeout(this.timerBackground);
    this.gg();
    this.props.history.push("/");
    this.componentWillUnmount();
  }

  public render() {
    if (this.props.Store.Player.length === 0) {
      return <Redirect to="/" />;
    }
    if (this.state.questions !== null) {
      return (
        <>
          <div className="game">
            <div
              className="game-background"
              style={{ backgroundPositionX: this.state.backgroundPosition }}
            >
              <div className={"rocket " + this.state.animationRocket}>
                <div
                  className="smoke"
                  style={{
                    backgroundPositionX: this.state.smokePosition,
                    display: this.state.smokeVision ? "block" : "none",
                  }}
                />
              </div>
            </div>
            <div className="game-box">
              <div className="container">
                <div className="wrapper">
                  <div className="info">
                    <div className="score">{this.state.score} км</div>
                    <div className="logo" />
                    <div className="time">
                      {this.state.minutes} : {this.state.seconds}
                    </div>
                  </div>
                  <div className="game-field">
                    {this.state.questions[this.state.step] !== undefined ? (
                      <>
                        <div
                          className={
                            "question " + (this.state.blockIntarface ? "block-question" : "")
                          }
                        >
                          {this.state.questions[this.state.step].question}
                        </div>
                        <div className="answer">
                          <a href="#" className="cross-box" onClick={() => this.exit()}>
                            <div className="cross" />
                          </a>
                          {this.state.questions[this.state.step].answers.map(
                            (answer: any, index: number) => {
                              return (
                                <button
                                  key={index}
                                  onClick={() => this.gameStep(answer.correctly)}
                                  disabled={this.state.blockIntarface}
                                  className={
                                    "btn btn-default btn-block btn-md " +
                                    (this.state.blockIntarface ? "block-answer" : "")
                                  }
                                >
                                  <b>{letters[index]}:</b> {answer.answer}
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
