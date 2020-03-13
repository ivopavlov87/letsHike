import React from "react";
import { Link } from "react-router-dom";

class ReviewItem extends React.Component {
  render() {

    let hikeName = <div></div>;
    if (this.props.review.hike.trailheadName) {
      hikeName = (
        <h3>
          <Link to={`/hikes/${this.props.review.hike._id}`}>
            {this.props.review.hike.trailheadName}
          </Link>
        </h3>
      );
    }

    let reviewButtons = <div></div>;
    if (
      // below conditional is general conditional
      (this.props.currentUser && this.props.review &&
      (this.props.review.user === this.props.currentUser.id)) ||

      // admin user power
      (this.props.currentUser && this.props.currentUser.adminType && this.props.review)
    ) {
      reviewButtons = (
        <div>
          <Link to={'#'} onClick={() => this.props.deleteReview(this.props.review.id)}>Delete review</Link>
        </div>
      )
    }

    return (
      <div>
        {hikeName}
        <h4><Link to={`/users/${this.props.review.user}`}>{this.props.review.author}</Link> says:</h4>
        <h4>{this.props.review.title}</h4>
        <h4>Rating: {this.props.review.rating}</h4>
        <p>{this.props.review.body}</p>
        {reviewButtons}
      </div>
    )
  }
}

export default ReviewItem;