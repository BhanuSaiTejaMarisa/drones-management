import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to="/profile">Profile</Link>
      <Link to="/drones">Drones</Link>
      <Link to="/sites">Sites</Link>

    </div>
  );
}
