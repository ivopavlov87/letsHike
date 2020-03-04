import { connect } from "react-redux";
import { createHike, deleteHike, clearErrors } from "../../actions/hike_actions";
import HikeCreate from "./hike_create";

const mapStateToProps = state => {
  return {
    currentUser: state.session.user,
    newHike: state.hikes.new,
    errors: state.errors.hikes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createHike: data => dispatch(createHike(data)),
    deleteHike: id => dispatch(deleteHike(id)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HikeCreate);
