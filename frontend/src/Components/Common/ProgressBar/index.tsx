import "./style.scss";
import React from "react";
import * as P from "ts-prime";
export declare namespace MinMaxBar {
  export interface Props {
    /**
     * Value between [-1, 1]
     */
    value: number;
  }
}
export const MinMaxBar = (props: MinMaxBar.Props) => {
    console.log(props.value * 100)
  return (
    <div className={"MinMaxBar"}>
      <div className="MinMaxBar_bar MinMaxBar_minus">
        <div
          className="MinMaxBar_inner_bar"
          style={{
            width: `${Math.abs(P.clamp(props.value / 2, { min: -1, max: 0 }))  * 100}%`,
          }}
        ></div>
      </div>
      <div className="MinMaxBar_bar MinBar_center"></div>
      <div className="MinMaxBar_bar MinMaxBar_plus">
        <div
          className="MinMaxBar_inner_bar"
          style={{
            width: `${P.clamp(props.value / 2, { min: 0, max: 1 }) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};
