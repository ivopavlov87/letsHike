import { connect } from "react-redux";
import { fetchUserHikes, deleteHike } from "../../actions/hike_actions";
import { fetchUser } from "../../actions/user_actions";
import Profile from "./profile";

const mapStateToProps = state => {
  return {
    hikes: Object.values(state.hikes.user),
    currentUser: state.session.user,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserHikes: id => dispatch(fetchUserHikes(id)),
    deleteHike: id => dispatch(deleteHike(id)),
    fetchUser: id => dispatch(fetchUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
