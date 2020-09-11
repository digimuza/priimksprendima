import React, { useState } from "react";
import "./cookies.scss";
import { Row, Col, Button } from "antd";
function setCookie(cname: string, cvalue: string, exdays: number) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname: string) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const Cookie = () => {
  const value = getCookie("ecsi");
  const [state, setState] = useState(value);
  if (state === "accepted") {
    return null;
  }
  return (
    <Row className={"Cookies"}>
      <Col md={5}></Col>
      <Col md={14}>
        <Row>
          <Col md={21}>
            <p className={"concent-text"}>
              „Primksprendimą“ aplikacija naudoja slapukus, kad pagerintų Jūsų
              naršymo patirtį ir siekdamos rinkodaros tikslų, kad pasiūlytų Jus
              dominančią informaciją. Jei sutinkate, prašome paspausti mygtuką
              „Sutinku“.
            </p>
            <p className={"concent-text"}>
              Daugiau informacijos rasite{" "}
              <a href={"/slapuku-politika"}>
                <strong>Slapukų politikoje</strong>
              </a>{" "}
              arba{" "}
              <a href={"/privatumo-politika"}>
                <strong>Privatumo politika</strong>
              </a>
            </p>
          </Col>
          <Col md={3} className={"CENTER"}>
            <Button
              onClick={() => {
                setCookie("ecsi", 'accepted', 365)
                setState("accepted");
              }}
            >
              Sutinku
            </Button>
          </Col>
        </Row>
      </Col>
      <Col md={5}></Col>
    </Row>
  );
};
