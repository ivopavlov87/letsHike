import { connect } from "react-redux";
import { fetchUserHikes } from "../../actions/hike_actions";
import Profile from "./profile";

const mapStateToProps = state => {
  return {
    hikes: Object.values(state.hikes.user),
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserHikes: id => dispatch(fetchUserHikes(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
