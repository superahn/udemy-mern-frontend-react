import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

import Users from "./user/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  });

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  });

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={[<Users />]}></Route>
        <Route path="/:userId/places" element={[<UserPlaces />]}></Route>
        <Route path="/places/new" element={[<NewPlace />]}></Route>
        <Route path="/places/:placeId" element={[<UpdatePlace />]}></Route>
        <Route path="*" element={[<Navigate replace to="/" />]}></Route>
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={[<Users />]}></Route>
        <Route path="/:userId/places" element={[<UserPlaces />]}></Route>
        <Route path="/auth" element={[<Auth />]}></Route>
        <Route path="*" element={[<Navigate replace to="/auth" />]}></Route>
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation></MainNavigation>
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
