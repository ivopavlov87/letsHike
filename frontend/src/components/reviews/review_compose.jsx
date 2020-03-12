import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class ReviewCompose extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hike: this.props.hike.id,
      user: this.props.currentUser.id,
      author: this.props.currentUser.username,
      title: "",
      body: "",
      rating: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let newReview = {
      hike: this.props.hike.id,
      user: this.props.currentUser.id,
      author: this.state.author,
      title: this.state.title,
      body: this.state.body,
      rating: this.state.rating
    };

    this.props.composeReview(newReview).then(arg => {
      if (Object.keys(this.props.errors).length !== 0) {
        // if there are ANY errors, display them
        this.setState({ errors: this.props.errors });
      } else {
        // if no errors, hike has been created, clear
        // any existing errors
        this.props.clearErrors();

        this.setState({
          title: "",
          body: "",
          rating: ""
        });
      }
    })
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.target.value
      });
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {

    if (!this.props.currentUser.id) {
      return <Link to={"/login"}>You must be logged in to leave a review</Link>;
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                minLength="5"
                maxLength="140"
                value={this.state.title}
                onChange={this.update("title")}
                placeholder="Review title"
              />
              <br />
              {`${this.state.title.length}`}/140 characters
              <br />
              <select
                value={this.state.rating}
                onChange={this.update("rating")}
              >
                <option defaultValue>Rate your experience</option>
                <option value={1}>1 - Not worth going</option>
                <option value={2}>2 - Not bad</option>
                <option value={3}>3 - Good</option>
                <option value={4}>4 - Great</option>
                <option value={5}>5 - Amazing</option>
              </select>
              <br />
              <input
                type="textarea"
                minLength="5"
                maxLength="1000"
                value={this.state.body}
                onChange={this.update("body")}
                placeholder="Describe your experience"
              />
              <br />
              {`${this.state.body.length}`}/1,000 characters
              <br />
              <input type="submit" value="Submit" />
              {this.renderErrors()}
            </div>
          </form>
        </div>
      );
    }
  }
}

export default withRouter(ReviewCompose);
