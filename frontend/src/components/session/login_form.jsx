import React from "react";
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginInput: "",
      password: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.prettyDemoUser = this.prettyDemoUser.bind(this);
  }

  async prettyDemoUser(e) {
    e.preventDefault();

    const demoUser = {
      username: "DemoUser",
      password: "pA55word!"
    };

    const sleep = ms => new Promise(res => setTimeout(res, ms));

    document.getElementById("login-input").focus();
    for (let i = 1; i <= demoUser.username.length; i++) {
      this.setState({ loginInput: demoUser.username.substr(0, i) });
      await sleep(150);
    }

    await sleep(150);

    document.getElementById("password-input").focus();
    for (let i = 1; i <= demoUser.password.length; i++) {
      this.setState({ password: demoUser.password.substr(0, i) });
      await sleep(150);
    }

    await sleep(500);

    document.getElementById("session-submit-btn").click();
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      loginInput: this.state.loginInput,
      password: this.state.password
    };

    this.props.login(user).then(arg => {
      // if (Object.keys(this.props.errors).length === 0) {
      // this.props.history.push("/hikes");
      // } else {
      if (Object.keys(this.props.errors).length) {
        this.setState({ errors: this.props.errors });
      }
    });
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              id="login-input"
              value={this.state.loginInput}
              onChange={this.update("loginInput")}
              placeholder="Username or Email"
            />
            <br />
            <input
              type="password"
              id="password-input"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            <br />
            <input id="session-submit-btn" type="submit" value="Submit" />
            <br />
            <input type="submit" onClick={this.prettyDemoUser} value="Demo User Log In" />
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
