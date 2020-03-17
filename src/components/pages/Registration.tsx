import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import * as Middleware from "../../middlewares";

interface PropsInterface {
  location: any;
  Store: any;
  Dispatch: any;
  history: any;
}

interface StateInterface {
  firstname: string;
  lastname: string;
  email: string;
  personalData: boolean;
  city: boolean;
  errors: boolean;
}

class Registration extends React.Component<PropsInterface, StateInterface> {
  constructor(Props: PropsInterface) {
    super(Props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      personalData: false,
      city: false,
      errors: false,
    };

    this.registration = this.registration.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
    this.input = this.input.bind(this);
    this.checkbox = this.checkbox.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
  }

  public componentDidMount() {
    document.title = process.env.SITE_NAME + " | Регистрация";
  }

  checkInputs() {
    if (
      this.state.firstname &&
      this.state.lastname &&
      this.state.email &&
      this.checkEmail(this.state.email) &&
      this.state.personalData
    ) {
      return true;
    } else {
      this.setState({
        errors: true,
      });
      return false;
    }
  }

  registration(event: any) {
    event.preventDefault();
    if (this.checkInputs()) {
      this.props.Dispatch(
        Middleware.Player.create({
          email: this.state.email,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          city_id: this.state.city === false ? 0 : process.env.CITY_ID,
          created_at: Math.round(new Date().getTime() / 1000), // unix timestamp
        })
      );
      this.props.history.push("/game");
    }
  }

  public onChangeHandle(event: any): void {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  checkEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  input(props: { label: string; name: string; type: string; value: any; required: boolean }) {
    return (
      <>
        <div className="input-box">
          <label
            htmlFor="sigh-3 "
            className={
              (props.value === "" && props.required && this.state.errors ? " error " : "") +
              (props.value !== "" ? " upper " : "")
            }
          >
            {props.label}
          </label>
          <input
            type={props.type}
            name={props.name}
            id={props.name}
            autoComplete="off"
            className={
              "input " +
              (props.value === "" && props.required && this.state.errors ? " input-error " : "") +
              (props.type === "email" && !this.checkEmail(props.value) && this.state.errors
                ? " input-error "
                : "")
            }
            value={props.value}
            required={true}
            onChange={(e) => {
              this.onChangeHandle(e);
            }}
          />
        </div>
      </>
    );
  }

  checkbox(props: { name: string; value: any; label: string; id: string; required: boolean }) {
    return (
      <>
        <div>
          <label className="check">
            <input
              type="checkbox"
              name={props.name}
              checked={props.value}
              autoComplete="off"
              onChange={this.onChangeHandle}
              className="check-input"
            />
            {props.label}
            <span
              className={
                "check-box " +
                (props.required && props.value === false && this.state.errors
                  ? "check-box-error"
                  : "")
              }
            />
          </label>
        </div>
      </>
    );
  }

  public render() {
    if (this.props.Store.Game.length === 0) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <div className="sign-bg">
          <div className="container">
            <div className="sign-up">
              <h1 className="title">Sign up</h1>
              <form className="registration" autoComplete="off">
                <this.input
                  label="FIRST NAME *"
                  name="firstname"
                  type="text"
                  value={this.state.firstname}
                  required={true}
                />
                <this.input
                  label="LAST NAME *"
                  name="lastname"
                  type="text"
                  value={this.state.lastname}
                  required={true}
                />
                <this.input
                  label="EMAIL *"
                  name="email"
                  type="email"
                  value={this.state.email}
                  required={true}
                />
                <div className="checkbox-block">
                  <this.checkbox
                    name="personalData"
                    value={this.state.personalData}
                    label="I agree with processing of my personal data"
                    id="sign-c1"
                    required={true}
                  />
                  <this.checkbox
                    name="city"
                    value={this.state.city}
                    label="I live in St. Petersburg"
                    id="sign-c2"
                    required={false}
                  />
                </div>
                {/* <button className="btn btn-block btn-primary btn-md" onClick={this.registration}>
                  sing up
                </button> */}
              </form>
              <div className="btn-box">
                <button className="btn btn-block btn-primary btn-md" onClick={this.registration}>
                  GO!
                </button>
                <div className="logo" />
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
  )(Registration)
);
