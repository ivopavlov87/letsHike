import React from "react";
import HikeBox from "./hike_box";
import { withRouter } from "react-router-dom";
import Map from "../map/map_view";

class HikeCompose extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      greeting: "Create a new hike!",
      trailheadName: "",
      state: "",
      lat: "",
      lng: "",
      distance: "",
      elevationGain: "",
      description: "",
      editHike: false,
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteNewHike = this.deleteNewHike.bind(this);
  }

  componentDidMount() {

    // sets up page to edit a hike IF there is a hike to
    // edit, otherwise this is skipped
    if (this.props.match.path === "/hikes/:hikeId/edit") {

      // grabs all the hikes, this will be needed for the
      // markers on the map
      this.props.fetchHikes();

      // grabs the hike to edit, populates the state,
      // and adds the hikeId to the state for the back-end
      // to know which hike to update, and sets editHike to
      // true
      this.props
      .fetchHike(this.props.match.params.hikeId)
        .then(res => {
          this.setState({
            greeting: "Update a hike!",
            id: res.hike.data.id,
            trailheadName: res.hike.data.trailheadName,
            state: res.hike.data.state,
            lat: res.hike.data.lat,
            lng: res.hike.data.lng,
            distance: res.hike.data.distance,
            elevationGain: res.hike.data.elevationGain,
            description: res.hike.data.description,
            editHike: true,
          });
        })
        .catch(error => console.log("Error updating hike", error));
    }
  }

  componentDidUpdate(prevProps) {
    
    // resets state to be able to create new hike
    // when you're editing existing hike and click
    // on create new hike
    if (
      prevProps.match.path === "/hikes/:hikeId/edit" &&
      this.props.match.path === "/hikes/new"
    ) {
      this.setState({
        greeting: "Create a new hike!",
        trailheadName: "",
        state: "",
        lat: "",
        lng: "",
        distance: "",
        elevationGain: "",
        description: "",
        editHike: false,
        errors: {}
      });
    }
  }

  deleteNewHike(id) {
    this.props.deleteHike(id);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    let newHike = {
      user: this.props.currentUser.id,
      trailheadName: this.state.trailheadName,
      state: this.state.state,
      lat: this.state.lat,
      lng: this.state.lng,
      distance: this.state.distance,
      elevationGain: this.state.elevationGain,
      description: this.state.description
    };

    // if NOT editting a hike
    if (!this.state.editHike){
      // try to create NEW hike
      this.props.createHike(newHike).then(arg => {
        if (Object.keys(this.props.errors).length !== 0) {
          // if there are ANY errors, display them
          this.setState({ errors: this.props.errors });
        } else {
          // if no errors, hike has been created, clear
          // any existing errors
          this.props.clearErrors();

          // Go to new hike page after hike creation
          this.props.history.push(`/hikes/${arg.hike.data.id}`)
        }
      });
    } else {
      // try to UPDATE existing hike
      this.props.updateHike(this.state).then(arg => {
        // if there are ANY errors, display them
        if (Object.keys(this.props.errors).length !== 0) {
          this.setState({ errors: this.props.errors });
        } else {
          this.props.clearErrors();
          this.props.fetchHike(arg.hike.data.id)
        }
      });
    }
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.target.value
      });
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {

    let deleteDestination = '/hikes/new';

    let theMap = <div></div>;
    if (this.props.hike){
      theMap = <Map hike={this.props.hike} hikes={this.props.hikes} />;
    }

    let theHikeBox = <div></div>;
    if (this.props.hike){
      theHikeBox = (
        <HikeBox
          hike={this.props.hike}
          deleteHike={this.deleteNewHike}
          currentUser={this.props.currentUser}
          deleteDestination={deleteDestination}
        />
      );
    }

    let hikePreview = <div></div>;
    if (this.props.hike) {
      hikePreview = (
        <div style={{ height: `500px`, width: `100%` }}>
          {theMap}
          <br />
          {theHikeBox}
        </div>
      );
    }

    return (
      <div>
        {this.state.greeting}
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="hidden" value={this.state.user} />
            <br />
            <input
              type="text"
              minLength="5"
              maxLength="140"
              value={this.state.trailheadName}
              onChange={this.update("trailheadName")}
              placeholder="Name of the trailhead"
            />
            <br />
            {`${this.state.trailheadName.length}`}/140 characters
            <br />
            <select value={this.state.state} onChange={this.update("state")}>
              <option defaultValue>State</option>
              <option value="Alaska">AK - Alaska</option>
              <option value="Alabama">AL - Alabama</option>
              <option value="Arkansas">AR - Arkansas</option>
              <option value="Arizona">AZ - Arizona</option>
              <option value="California">CA - California</option>
              <option value="Colorado">CO - Colorado</option>
              <option value="Connecticut">CT - Connecticut</option>
              <option value="District of Columbia">
                DC - District of Columbia
              </option>
              <option value="Delaware">DE - Delaware</option>
              <option value="Florida">FL - Florida</option>
              <option value="Georgia">GA - Georgia</option>
              <option value="Hawaii">HI - Hawaii</option>
              <option value="Iowa">IA - Iowa</option>
              <option value="Idaho">ID - Idaho</option>
              <option value="Illinois">IL - Illinois</option>
              <option value="Indiana">IN - Indiana</option>
              <option value="Kansas">KS - Kansas</option>
              <option value="Kentucky">KY - Kentucky</option>
              <option value="Louisiana">LA - Louisiana</option>
              <option value="Massachusetts">MA - Massachusetts</option>
              <option value="Maryland">MD - Maryland</option>
              <option value="Maine">ME - Maine</option>
              <option value="Michigan">MI - Michigan</option>
              <option value="Minnesota">MN - Minnesota</option>
              <option value="Missouri">MO - Missouri</option>
              <option value="Mississippi">MS - Mississippi</option>
              <option value="Montana">MT - Montana</option>
              <option value="North Carolina">NC - North Carolina</option>
              <option value="North Dakota">ND - North Dakota</option>
              <option value="Nebraska">NE - Nebraska</option>
              <option value="New Hampshire">NH - New Hampshire</option>
              <option value="New Jerey">NJ - New Jerey</option>
              <option value="New Mexico">NM - New Mexico</option>
              <option value="Nevada">NV - Nevada</option>
              <option value="New York">NY - New York</option>
              <option value="Ohio">OH - Ohio</option>
              <option value="Oklahoma">OK - Oklahoma</option>
              <option value="Oregon">OR - Oregon</option>
              <option value="Pennsylvania">PA - Pennsylvania</option>
              <option value="Rhode Island">RI - Rhode Island</option>
              <option value="South Carolina">SC - South Carolina</option>
              <option value="South Dakota">SD - South Dakota</option>
              <option value="Tennessee">TN - Tennessee</option>
              <option value="Texas">TX - Texas</option>
              <option value="Utah">UT - Utah</option>
              <option value="Virginia">VA - Virginia</option>
              <option value="Vermont">VT - Vermont</option>
              <option value="Washington">WA - Washington</option>
              <option value="Wisconsin">WI - Wisconsin</option>
              <option value="West Virginia">WV - West Virginia</option>
              <option value="Wyoming">WY - Wyoming</option>
            </select>
            <br />
            <input
              type="number"
              value={this.state.lat}
              onChange={this.update("lat")}
              placeholder="Latitude"
            />
            <br />
            <input
              type="number"
              value={this.state.lng}
              onChange={this.update("lng")}
              placeholder="Longitude"
            />
            <br />
            <input
              type="number"
              value={this.state.distance}
              onChange={this.update("distance")}
              placeholder="Length in miles"
            />
            <br />
            <input
              type="number"
              value={this.state.elevationGain}
              onChange={this.update("elevationGain")}
              placeholder="Elevation gain in feet"
            />
            <br />
            <input
              type="textarea"
              minLength="5"
              maxLength="1000"
              value={this.state.description}
              onChange={this.update("description")}
              placeholder="Describe your hike"
            />
            <br />
            {`${this.state.description.length}`}/1,000 characters
            <br />
            <input type="submit" value="Submit" />
            {this.renderErrors()}
          </div>
        </form>
        <br />
        {hikePreview}
      </div>
    );
  }
}

export default withRouter(HikeCompose);
