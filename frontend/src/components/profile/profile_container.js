import { connect } from "react-redux";
import { fetchUserHikes, deleteHike } from "../../actions/hike_actions";
import { fetchUser } from "../../actions/user_actions";
import Profile from "./profile";

const mapStateToProps = (state, ownProps) => {
  return {
    hikes: Object.values(state.entities.hikes),
    currentUser: state.session.user,
    user: state.entities.users[ownProps.match.params.id],
    userId: ownProps.match.params.id,
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
