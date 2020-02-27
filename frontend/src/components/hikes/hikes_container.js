import { connect } from "react-redux";
import { fetchHikes } from "../../actions/hike_actions";
import Hikes from "./hikes";

const mapStateToProps = state => {
  return {
    hikes: Object.values(state.hikes.all)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHikes: () => dispatch(fetchHikes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hikes);
