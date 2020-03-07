import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";

import HikesContainer from "./hikes/hikes_container";
import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import ProfileContainer from "./profile/profile_container";
import HikeCreateContainer from "./hikes/hike_create_container";
import HikeShowContainer from "./hikes/hike_show_container";

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />

      <ProtectedRoute exact path="/users/:id" component={ProfileContainer} />
      <ProtectedRoute exact path="/hikes/new" component={HikeCreateContainer} />
      <ProtectedRoute exact path="/hikes/:hikeId/edit" component={HikeCreateContainer} />
      <ProtectedRoute exact path="/hikes/:hikeId" component={HikeShowContainer} />
      <ProtectedRoute exact path="/hikes" component={HikesContainer} />
    </Switch>
  </div>
);

export default App;
