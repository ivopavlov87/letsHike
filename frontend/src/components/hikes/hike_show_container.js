import { connect } from "react-redux";
import HikeShow from "./hike_show";
import { fetchHike, fetchHikes, deleteHike } from "../../actions/hike_actions";
import { fetchHikeReviews, deleteReview } from "../../actions/review_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.user,
    errors: state.errors.hikes,
    hikeId: ownProps.match.params.hikeId,
    hike: state.entities.hikes[ownProps.match.params.hikeId],
    hikes: Object.values(state.entities.hikes),
    reviews: Object.values(state.entities.reviews)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHikes: () => dispatch(fetchHikes()),
    fetchHike: id => dispatch(fetchHike(id)),
    deleteHike: id => dispatch(deleteHike(id)),
    fetchHikeReviews: id => dispatch(fetchHikeReviews(id)),
    deleteReview: id => dispatch(deleteReview(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HikeShow);
