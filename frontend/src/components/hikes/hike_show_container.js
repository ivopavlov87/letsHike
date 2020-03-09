import { connect } from "react-redux";
import HikeShow from "./hike_show";
import { fetchHike, fetchHikes, deleteHike } from "../../actions/hike_actions";

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
    fetchHikes: () => dispatch(fetchHikes()),
    fetchHike: id => dispatch(fetchHike(id)),
    deleteHike: id => dispatch(deleteHike(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HikeShow);
