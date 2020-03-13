import React from 'react';
import { withRouter } from "react-router-dom";
import HikeBox from "./hike_box";
import Map from "../map/map_view";
import ReviewCompose from "../reviews/review_compose_container";
import ReviewItem from "../reviews/review_item";

class HikeShow extends React.Component {

  componentDidMount(){
    this.props.fetchHikes()
    this.props.fetchHike(this.props.hikeId)
    this.props.fetchHikeReviews(this.props.hikeId)
  }

  render(){

    let hikeReviews = <div>No one has left a review for this hike, yet.</div>
    if (this.props.reviews.length) {
      hikeReviews = (
        <div>
          {this.props.reviews.map(review =>
            <ReviewItem 
              key={review.id}
              review={review}
              currentUser={this.props.currentUser}
              deleteReview={this.props.deleteReview}
            />
          )}
        </div>
      )
    }

    if (this.props.hike) {
      return (
        <div>
          <div style={{ height: `500px`, width: `100%` }}>
            Map Goes Here
            <Map hike={this.props.hike} hikes={this.props.hikes} />
          </div>
          <HikeBox
            hike={this.props.hike}
            currentUser={this.props.currentUser}
            deleteDestination={`/users/${
              this.props.hike
                ? this.props.hike.user._id
                : this.props.currentUser.id
            }`}
            deleteHike={this.props.deleteHike}
          />
          <ReviewCompose
            hike={this.props.hike}
            currentUser={this.props.currentUser}
          />
          <h3>Reviews:</h3>
          {hikeReviews}
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

export default withRouter(HikeShow);