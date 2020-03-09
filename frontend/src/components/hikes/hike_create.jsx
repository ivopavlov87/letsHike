import React from "react";
import HikeBox from "./hike_box";
import { withRouter } from "react-router-dom";
import Map from "../map/map_view";

class HikeCompose extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      greeting: "Create a new hike!",
      user: this.props.currentUser,
      trailheadName: "",
      state: "",
      lat: "",
      lng: "",
      distance: "",
      elevationGain: "",
      description: "",
      newHike: "",
      editHike: false,
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteNewHike = this.deleteNewHike.bind(this);
  }

  componentDidMount() {

    this.props.fetchHikes()

    // sets up page to edit a hike IF there is a hike to
    // edit, otherwise this is skipped
    if (this.props.match.path === "/hikes/:hikeId/edit") {
      this.props
      .fetchHike(this.props.match.params.hikeId)
        .then(res => {
          this.setState({
            greeting: "Update a hike!",
            id: res.hike.data.id,
            user: res.hike.data.user._id,
            trailheadName: res.hike.data.trailheadName,
            state: res.hike.data.state,
            lat: res.hike.data.lat,
            lng: res.hike.data.lng,
            distance: res.hike.data.distance,
            elevationGain: res.hike.data.elevationGain,
            description: res.hike.data.description,
            editHike: true,
            newHike: res.hike.data
          });
        })
        .catch(error => console.log("Making a new hike1", error));
    }
  }

  componentDidUpdate(prevProps) {

    if (this.props.hikeId !== prevProps.hikeId) this.props.fetchHike(this.props.hikeId)

    // resets state to be able to create new hike
    // when you're editing existing hike and click
    // on new hike
    if (
      prevProps.match.path === "/hikes/:hikeId/edit" &&
      this.props.match.path === "/hikes/new"
    ) {
      this.setState({
        greeting: "Create a new hike!",
        user: this.props.currentUser,
        trailheadName: "",
        state: "",
        lat: "",
        lng: "",
        distance: "",
        elevationGain: "",
        description: "",
        newHike: null,
        editHike: false,
        errors: {}
      });
    }

    // editing a new hike just created from create page
    if (
      this.props.match.path === "/hikes/:hikeId/edit" &&
      prevProps.match.path === "/hikes/new"
    ) {
      this.props
        .fetchHike(this.props.match.params.hikeId)
          .then(res => {
            this.setState({
              greeting: "Update a hike!",
              id: res.hike.data.id,
              user: res.hike.data.user._id,
              trailheadName: res.hike.data.trailheadName,
              state: res.hike.data.state,
              lat: res.hike.data.lat,
              lng: res.hike.data.lng,
              distance: res.hike.data.distance,
              elevationGain: res.hike.data.elevationGain,
              description: res.hike.data.description,
              editHike: true,
              newHike: res.hike.data
            });
          })
          .catch(error => console.log("Making a new hike2", error));
    } 
  }

  deleteNewHike(id) {
    this.props.deleteHike(id);
    this.setState({ newHike: "" });
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    let newHike = {
      user: this.props.hike ? this.props.hike.user : this.props.currentUser.id,
      trailheadName: this.state.trailheadName,
      state: this.state.state,
      lat: this.state.lat,
      lng: this.state.lng,
      distance: this.state.distance,
      elevationGain: this.state.elevationGain,
      description: this.state.description
    };

    if (!this.state.editHike){
      this.props.createHike(newHike).then(arg => {
        if (Object.keys(this.props.errors).length !== 0) {
          this.setState({ errors: this.props.errors });
        } else {
          this.props.clearErrors();
          this.props.fetchHike(arg.hike.data.id)
          this.setState({ newHike: arg.hike.data, errors: "" });
        }

        this.setState({
          trailheadName: "",
          state: "",
          lat: "",
          lng: "",
          distance: "",
          elevationGain: "",
          description: ""
        });

        // Go to new hike page after hike creation
        this.props.history.push(`/hikes/${arg.hike.data.id}`)

      });
    } else {
      this.props.updateHike(this.state).then(arg => {
        if (Object.keys(this.props.errors).length !== 0) {
          this.setState({ errors: this.props.errors });
        } else {
          this.props.clearErrors();
          this.props.fetchHike(arg.hike.data.id)
          this.setState({ newHike: arg.hike.data, errors: "" });
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

    let deleteDestination = "#";
    if (this.props.match.path === '/hikes/:hikeId/edit') {
      deleteDestination = '/hikes/new'
    }

    let theMap = <div></div>;
    let theHike = this.props.hike || this.props.newHike
    if (this.props.hike || this.props.newHike){
      theMap = (
        <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          hike={theHike}
          hikes={this.props.hikes}
        />
      );
    }

    let theHikeBox = <div></div>;
    if (this.props.hike || this.state.newHike){
      theHikeBox = (
        <HikeBox
          hike={this.props.hike ? this.props.hike : this.state.newHike}
          deleteHike={this.deleteNewHike}
          currentUser={this.props.currentUser}
          deleteDestination={deleteDestination}
        />
      );
    }

    let hikePreview = <div></div>;
    if (this.props.hike ? this.props.hike : this.state.newHike) {
      hikePreview = (
        <div>
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
        {/* {theMap}
        <br />
        <HikeBox
          hike={this.state.newHike}
          deleteHike={this.deleteNewHike}
          currentUser={this.props.currentUser}
          deleteDestination={deleteDestination}
        /> */}
      </div>
    );
  }
}

export default withRouter(HikeCompose);
