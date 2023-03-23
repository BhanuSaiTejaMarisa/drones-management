import React from "react";
import { Link } from "react-router-dom";
import Socket from "../../components/socket/Socket";

export default function Home() {
  return (
    <div>
      <Link to="/profile">Profile</Link>
      <Link to="/drones">Drones</Link>
      <Link to="/sites">Sites</Link>
      <Socket />
    </div>
  );
}
