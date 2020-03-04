import { connect } from "react-redux";
import { fetchUserHikes, deleteHike } from "../../actions/hike_actions";
import Profile from "./profile";

const mapStateToProps = (state, ownProps) => {
  return {
    hikes: Object.values(state.hikes.user),
    currentUser: state.session.user,
    user: state.users[ownProps.match.params.id],
    userId: ownProps.match.params.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserHikes: id => dispatch(fetchUserHikes(id)),
    deleteHike: id => dispatch(deleteHike(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
