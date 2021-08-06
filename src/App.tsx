import React from "react";
import "./App.css";
import Auth from "./Auth";
import UnAuth from "./un-auth";
import { useAuth } from "context/auth-context";

function App() {
  const { user } = useAuth();
  return <div className="App">{user ? <Auth /> : <UnAuth />}</div>;
}

export default App;
