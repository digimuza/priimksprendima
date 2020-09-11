import { useHistory } from "react-router-dom";
import React from "react";
import { Footer } from "../../../Pages/LandingPage";

export const Page = (props: { children: any }) => {
  return (
    <div className={"LandingPage"}>
      <div className="content-wrapper">
        <div className="container">
          {props.children}
          <Footer></Footer>
          {/* Modal for Contact - us Button */}
        </div>
      </div>
    </div>
  );
};
