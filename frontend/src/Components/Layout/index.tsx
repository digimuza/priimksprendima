import React from "react";
import { Layout, Row, Col, PageHeader } from "antd";
import { Link } from "react-router-dom";

const { Content, Footer } = Layout;

const BASE_CLASS = "CoreLayout";
const FOOTER_HEIGHT = "120px";
const TOOLBAR_HEIGHT = "68px";
export function CoreLayout(props: {
  className?: string;
  children?: any;
  layout: string;
}) {
  return (
    <Layout
      className={`${BASE_CLASS} ${props.layout} ${props.className || ""}`}
    >
      {props.children}
    </Layout>
  );
}

export function MainLayout(props: {
  className?: string;
  children?: any;
  onBack?: () => void;
  title: string;
  footer?: any;
}) {
  return (
    <CoreLayout layout={"MainLayout"} {...props}>
      <Row>
        <Col xl={6} xs={0} span={8}></Col>
        <Col xl={12} xs={24} span={8}>
          <PageHeader
            onBack={props.onBack}
            style={{ padding: 15, paddingTop: 0, paddingBottom: 0 }}
            title={
              <div
                style={{
                  maxWidth: "35vw",
                  overflow: "hidden",
                  fontSize: 18,
                  textOverflow: "ellipsis",
                }}
              >
                {props.title}
              </div>
            }
            extra={
              <div style={{ padding: 5 }}>
                <Link to={"/"}>
                  <img
                    style={{ height: 50, width: "auto" }}
                    src="images/FavIco.svg"
                    alt=""
                  />
                </Link>
              </div>
            }
          ></PageHeader>
        </Col>
        <Col xl={6} xs={0} span={8}></Col>
      </Row>
      <Content
        style={{
          background: "white",
          overflow: "auto",
          padding: 15,
        }}
      >
        <Row style={{ height: "100%" }}>
          <Col xl={6} xs={0} span={8}></Col>
          <Col xl={12} xs={24} span={8}>
            {props.children}
          </Col>
          <Col xl={6} xs={0} span={8}></Col>
        </Row>
      </Content>
      {props.footer == null ? null : (
        <Footer style={{ padding: 5, height: 120, background: "white" }}>
          <Row>
            <Col xl={6} xs={0} span={8}></Col>
            <Col xl={12} xs={24} span={8}>
              {props.footer}
            </Col>
            <Col xl={6} xs={0} span={8}></Col>
          </Row>
        </Footer>
      )}
    </CoreLayout>
  );
}

export function FullScreenNoToolbar(props: {
  className?: string;
  children?: any;
  onBack?: () => void;
  title: string;
  footer?: any;
}) {
  return (
    <CoreLayout layout={`FullScreenNoToolbar`} {...props}>
      <Row>
        <Col xl={6} xs={0} span={8}></Col>
        <Col xl={12} xs={24} span={8}></Col>
        <Col xl={6} xs={0} span={8}></Col>
      </Row>
      <Content
        className={"Content"}
        style={{
          height: `calc(100vh${props.footer == null ? "" : " - 180px"})`,
        }}
      >
        <Row style={{ height: "100%" }}>
          <Col xl={6} xs={0} span={8}></Col>
          <Col xl={12} xs={24} span={8}>
            {props.children}
          </Col>
          <Col xl={6} xs={0} span={8}></Col>
        </Row>
      </Content>
      {props.footer == null ? null : (
        <Footer
          style={{ padding: 5, height: FOOTER_HEIGHT, background: "white" }}
        >
          <Row>
            <Col xl={6} xs={0} span={8}></Col>
            <Col xl={12} xs={24} span={8}>
              {props.footer}
            </Col>
            <Col xl={6} xs={0} span={8}></Col>
          </Row>
        </Footer>
      )}
    </CoreLayout>
  );
}
