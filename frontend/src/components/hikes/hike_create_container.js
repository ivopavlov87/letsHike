import { connect } from "react-redux";
import { createHike, deleteHike, fetchHike, clearErrors } from "../../actions/hike_actions";
import HikeCreate from "./hike_create";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.user,
    newHike: state.hikes.new,
    errors: state.errors.hikes,
    hike: ownProps.match.params.hikeId ? state.hikes[ownProps.match.params.hikeId] : false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createHike: data => dispatch(createHike(data)),
    deleteHike: id => dispatch(deleteHike(id)),
    clearErrors: () => dispatch(clearErrors()),
    fetchHike: id => dispatch(fetchHike(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HikeCreate);
