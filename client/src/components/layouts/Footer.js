import React from "react";

export default () => {
  return (
    <footer className="page-footer blue-grey darken-2">
      <div className="footer-copyright">
        <div className="container center">
          Copyright &copy; {new Date().getFullYear()} ProjectName
        </div>
      </div>
    </footer>
  );
};
