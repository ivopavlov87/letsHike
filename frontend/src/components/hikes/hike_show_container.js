import { connect } from "react-redux";
import HikeShow from "./hike_show";
import { fetchHike, deleteHike } from "../../actions/hike_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.user,
    errors: state.errors.hikes,
    hikeId: ownProps.match.params.hikeId,
    hike: state.hikes.all[ownProps.match.params.hikeId],
    coords: { lat: 47.7898, lng: -121.1009 }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHike: id => dispatch(fetchHike(id)),
    deleteHike: id => dispatch(deleteHike(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HikeShow);
