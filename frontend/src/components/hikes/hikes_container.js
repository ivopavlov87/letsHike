import { connect } from "react-redux";
import { fetchHikes, deleteHike } from "../../actions/hike_actions";
import Hikes from "./hikes";

const mapStateToProps = state => {
  return {
    currentUser: state.session.user,
    hikes: Object.values(state.hikes)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHikes: () => dispatch(fetchHikes()),
    deleteHike: id => dispatch(deleteHike(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hikes);
