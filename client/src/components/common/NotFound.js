import React from "react";

export default function NotFound({ location }) {
  return (
    <div className="container-fluid center">
      <br />
      <br />
      <span className="info">
        Page not found for <code>{location.pathname}</code>
      </span>
    </div>
  );
}
