import React from "react";
import HikeBox from "../hikes/hike_box";
import ReviewItem from "../reviews/review_item";

class Profile extends React.Component {

  componentDidMount() {
    this.props.fetchUserHikes(this.props.userId);
    this.props.fetchUserReviews(this.props.userId);
    this.props.fetchUser(this.props.userId);
  }

  componentDidUpdate(previousProps) {
    // ensures re-render when changing which user profile
    // you are looking at
    if (previousProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchUserHikes(this.props.userId);
      this.props.fetchUserReviews(this.props.userId);
      this.props.fetchUser(this.props.userId);
    }
  }

  topOfProfile(){
    return this.props.user ? this.props.user.username : ""
  }

  render() {

    let userHikes = <div>{this.topOfProfile()} has not made any Hikes</div>;
    if (this.props.hikes.length) {
      userHikes = (
        <div>
          <h2>All of {this.topOfProfile()}'s Hikes</h2>
          {this.props.hikes.map(hike => (
            <HikeBox
              key={hike.id}
              hike={hike}
              deleteHike={this.props.deleteHike}
              currentUser={this.props.currentUser}
              deleteDestination={"#"}
            />
          ))}
        </div>
      );
    }

    let userReviews = <div>{this.topOfProfile()} has not made any Reviews</div>;
    if (this.props.reviews.length) {
      userReviews = (
        <div>
          <h2>All of {this.topOfProfile()}'s Reviews</h2>
          {this.props.reviews.map(review => (
            <ReviewItem
              key={review.id}
              review={review}
              currentUser={this.props.currentUser}
              deleteReview={this.props.deleteReview}
            />
          ))}
        </div>
      );
    };

    return (
      <div>
        <h1>{this.topOfProfile()}'s Profile Page</h1>
        {userHikes}
        {userReviews}
      </div>
    );

  }
}

export default Profile;
