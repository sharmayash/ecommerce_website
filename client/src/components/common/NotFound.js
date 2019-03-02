import React from "react";

export default function NotFound({ location }) {
  return (
    <div>
      <div className="error">404</div>
      <br />
      <br />
      <span className="info">
        Page not found for <code>{location.pathname}</code>
      </span>
      <img
        src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif"
        class="static"
        alt="404"
      />
    </div>
  );
}
