import { connect } from "react-redux";
import { createHike, deleteHike, fetchHike, fetchHikes, updateHike, clearErrors } from "../../actions/hike_actions";
import HikeCreate from "./hike_create";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.user,
    errors: state.errors.hikes,
    hikeId: ownProps.match.params.hikeId,
    hike: state.hikes[ownProps.match.params.hikeId],
    hikes: Object.values(state.hikes)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createHike: data => dispatch(createHike(data)),
    deleteHike: id => dispatch(deleteHike(id)),
    clearErrors: () => dispatch(clearErrors()),
    fetchHike: id => dispatch(fetchHike(id)),
    fetchHikes: () => dispatch(fetchHikes()),
    updateHike: hike => dispatch(updateHike(hike))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HikeCreate);
