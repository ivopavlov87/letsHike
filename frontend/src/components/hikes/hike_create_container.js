import { connect } from "react-redux";
import { createHike, deleteHike, fetchHike, updateHike, clearErrors } from "../../actions/hike_actions";
import HikeCreate from "./hike_create";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.user,
    newHike: Object.values(state.hikes.new)[0],
    errors: state.errors.hikes,
    hike: state.hikes.all[ownProps.match.params.hikeId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createHike: data => dispatch(createHike(data)),
    deleteHike: id => dispatch(deleteHike(id)),
    clearErrors: () => dispatch(clearErrors()),
    fetchHike: id => dispatch(fetchHike(id)),
    updateHike: hike => dispatch(updateHike(hike))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HikeCreate);
