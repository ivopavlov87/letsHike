import { connect } from "react-redux";
import { composeReview, clearErrors } from "../../actions/review_actions";
import ReviewCompose from "./review_compose";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.user,
    userAuthenticated: state.session.isAuthenticated,
    errors: state.errors.reviews,
    reviewId: ownProps //.match.params.reviewId,
    // review: state.entities.reviews[ownProps.match.params.reviewId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    composeReview: data => dispatch(composeReview(data)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCompose);