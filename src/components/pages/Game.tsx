import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Middleware from "../../middlewares";
import { questions, letters } from "../../utils/answers";

interface PropsInterface {
  location: any;
  Store: any;
  Dispatch: any;
  history: any;
}

interface StateInterface {
  timer: number;
  step: number;
  minutes: string;
  seconds: string;
  speed: number;
  questions: any;
  runGame: boolean;
}

class Game extends React.Component<PropsInterface, StateInterface> {
  timerObj: NodeJS.Timeout | any;
  constructor(Props: PropsInterface) {
    super(Props);
    this.state = {
      timer: 90,
      step: 0,
      minutes: "00",
      seconds: "00",
      speed: 1500,
      questions: [],
      runGame: false,
    };
    this.timeToString = this.timeToString.bind(this);
  }

  public componentDidMount() {
    document.title = process.env.SITE_NAME + " | Game!";
    this.props.Dispatch(Middleware.Modal.open("Rules"));
    this.props.Dispatch(Middleware.Game.create(this.props.Store.Player.id));
  }

  componentDidUpdate(prevProps: any) {
    if (
      this.props.Store.Game.status === "start" &&
      prevProps !== this.props &&
      this.state.runGame === false
    ) {
      this.setState({ runGame: true }, () => this.clock());
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

  checkAnswer(answer: number) {
    return true;
  }

  gameStep(answer: number) {
    if (this.state.step >= questions.length - 1) {
      this.props.Dispatch(Middleware.Modal.open("Win"));
    }
    if (this.state.timer > 0) {
      if (this.checkAnswer(answer)) {
        this.setState({
          step: this.state.step + 1,
        });
      }
    } else {
      this.props.Dispatch(Middleware.Modal.open("Win"));
    }
  }

  // Every second
  clock() {
    this.timeToString();
    // game in playing
    if (this.state.timer > 0) {
      this.setTimer();
      this.timerObj = setTimeout(() => this.clock(), 1000); // timeout дабы избежать лагов при работе с таймером
    } else {
      this.props.Dispatch(Middleware.Modal.open("Win"));
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
                  <div className="time">
                    {this.state.minutes} : {this.state.seconds}
                  </div>
                </div>
                <div className="game-field">
                  {questions[this.state.step] !== undefined ? (
                    <>
                      <div className="question">{questions[this.state.step].question}</div>
                      <div className="answer">
                        <a href="#" className="cross-box" onClick={() => this.exit()}>
                          <div className="cross" />
                        </a>
                        {questions[this.state.step].answers.map((answer: string, index: number) => {
                          return (
                            <button
                              key={index}
                              onClick={() => this.gameStep(index)}
                              className="btn btn-default btn-block btn-md"
                            >
                              <b>{letters[index]}:</b> {answer}
                            </button>
                          );
                        })}
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
