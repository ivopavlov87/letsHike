import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Link to={"/"}>All Hikes</Link>&nbsp;
          <Link to={`/users/${this.props.currentUser.id}`}>Profile</Link>&nbsp;
          <Link to={"/hikes/new"}>New Hike</Link>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={"/"}>All Hikes</Link>&nbsp;
          <Link to={"/hikes/new"}>New Hike</Link>&nbsp;
          <Link to={"/signup"}>Signup</Link>&nbsp;
          <Link to={"/login"}>Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Let's Hike!</h1>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
