import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Watch } from "../Helpers";
import { Core } from "../Core";
import { Spin } from "antd";
import { map } from "rxjs/operators";
import { Cookie } from "../Components/Common/Cookies";

export const Footer = () => {
  return (
    <Fragment>
      <section className="contact-details" id="contact-details-section">
        <div className="row text-center text-md-left">
          <div className="col-12 col-md-6 col-lg-3 grid-margin">
            <img
              width={200}
              height={"auto"}
              src="images/PriimkSprendimaLogo.svg"
              alt=""
              className="pb-2"
            />
            <div className="pt-2">
              <p className="text-muted m-0">priimksprendima@gmail.com</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 grid-margin">
            <h5 className="pb-2">Prisijunk prie mūsų</h5>

            <a
              href="https://github.com/digimuza/priimksprendima"
              target="_blank"
            >
              <p className="m-0 pb-2">GitHub</p>
            </a>
          </div>
          <div className="col-12 col-md-6 col-lg-3 grid-margin">
            <h5 className="pb-2">Naudinga</h5>
            <a href="/naudojimo-salygos">
              <p className="m-0 pb-2">Paslaugų teikimo taisyklės</p>
            </a>
            <a href="/privatumo-politika">
              <p className="m-0 pt-1 pb-2">Privatumo politika</p>
            </a>
            <a href="/slapuku-politika">
              <p className="m-0 pt-1 pb-2">Slapukų politika</p>
            </a>
          </div>
          <div className="col-12 col-md-6 col-lg-3 grid-margin">
            <h5 className="pb-2">Sekite mus</h5>

            <div className="d-flex justify-content-center justify-content-md-start">
              <a href="#">
                <span className="mdi mdi-facebook" />
              </a>
              <a href="#">
                <span className="mdi mdi-twitter" />
              </a>
              <a href="#">
                <span className="mdi mdi-instagram" />
              </a>
              <a href="#">
                <span className="mdi mdi-linkedin" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-top"></footer>
    </Fragment>
  );
};

export function Header() {
  const history = useHistory();
  return (
    <Fragment>
      <Cookie></Cookie>
      <header>
        <nav className="navbar navbar-expand-lg pl-3 pl-sm-0">
          <div className="container">
            <div className="navbar-brand-wrapper d-flex w-100">
              <a href="/">
                <img
                  className={"logo"}
                  src="images/PriimkSprendimaLogo.svg"
                  alt=""
                />
              </a>
              <button
                className="navbar-toggler ml-auto"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="mdi mdi-menu navbar-toggler-icon" />
              </button>
            </div>
            <div
              className="collapse navbar-collapse navbar-menu-wrapper"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav align-items-lg-center align-items-start ml-auto">
                <li className="d-flex align-items-center justify-content-between pl-4 pl-lg-0">
                  <div className="navbar-collapse-logo">
                    <a href="/">
                      <img className={"logo"} src="images/FavIco.svg" alt="" />
                    </a>
                  </div>
                  <button
                    className="navbar-toggler close-button"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    navbar-collapse
                  >
                    <span className="mdi mdi-close navbar-toggler-icon pl-5" />
                  </button>
                </li>
              </ul>
              <ul className="navbar-nav align-items-lg-center align-items-start ml-auto links-group">
                <li className="nav-item">
                  <a className="nav-link" href="#header-section">
                    Pradžia <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#features-section">
                    Apie
                  </a>
                </li>
                <li className="nav-item btn-contact-us pl-4 pl-lg-0">
                  <button
                    onClick={() => {
                      history.push("/quiz");
                    }}
                    className="btn btn-primary"
                  >
                    Pradedam
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </Fragment>
  );
}

export default function () {
  const history = useHistory();
  return (
    <div className={"LandingPage"}>
      <Header></Header>
      <div className="banner">
        <div className="container">
          <h1 className="font-weight-semibold ResponsiveText">
            Lietuvos ateitis tavo rankose!
          </h1>
          <h6 className="font-weight-normal text-muted pb-3">
            Nežinai už ką balsuoti? Nepasitiki partijų šūkiais ir pažadais?
            <br />
            Tuomet būk išmanus ir priimk sprendimą!
          </h6>
          <Watch
            data={Core.Store.store.userVotes.pipe(map((q) => !!q))}
            fallback={
              <div>
                <Spin></Spin>
              </div>
            }
          >
            {(w) => {
              return (
                <div>
                  <button
                    className="btn btn-primary mr-1"
                    onClick={() => {
                      Core.Events.resetQuiz();
                      Core.Navigator.pushPage({
                        page: "LegislationQuizPage",
                        payload: {},
                      });
                      history.push("/quiz");
                    }}
                  >
                    Pradedam
                  </button>
                  {w ? (
                    <button
                      className="btn btn-success mr-1"
                      onClick={() => {
                        history.push("/quiz");
                      }}
                    >
                      Tavo rezultatai
                    </button>
                  ) : null}
                </div>
              );
            }}
          </Watch>
          <img
            src="https://cdn.pixabay.com/photo/2016/10/21/19/04/lithuania-1758830_1280.png"
            alt=""
            className="img-fluid"
            style={{
              margin: 30,
              maxWidth: "50%",
            }}
          ></img>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="container">
          <section className="features-overview" id="features-section">
            <div className="content-header">
              <h2>Kaip tai veikia?</h2>
              <h6 className="section-subtitle text-muted">
                Balsuok už įstatymus ir sužinok kurie politikai
                <br />
                labiausiai atitinka tavo interesus
              </h6>
            </div>
            <div className="d-md-flex justify-content-between">
              <div className="grid-margin d-flex justify-content-start">
                <div className="features-width">
                  <img src="images/Group12.svg" alt="" className="img-icons" />
                  <h5 className="py-3">1. Balsuok už tau rūpimus klausimus</h5>
                  <p className="text-muted">
                    Ar buvo reikalingas referendumas dėl seimo narių mažinimo?
                    Ar turėjo būti uždraustas smurtas prieš vaikus? Jūs
                    nuspręskite!
                  </p>
                </div>
              </div>
              <div className="grid-margin d-flex justify-content-center">
                <div className="features-width">
                  <img src="images/Group7.svg" alt="" className="img-icons" />
                  <h5 className="py-3">2. Duomenų palyginimas</h5>
                  <p className="text-muted">
                    Jūsų sprendimai bus palyginti su realiais politikų balsavimo
                    rezultatais
                  </p>
                </div>
              </div>
              <div className="grid-margin d-flex justify-content-end">
                <div className="features-width">
                  <img src="images/Group5.svg" alt="" className="img-icons" />
                  <h5 className="py-3">3. Kandidatų atranka</h5>
                  <p className="text-muted">
                    Išmanioji reitingavimo sistema leis atsirinkti tinkamiausius
                    kandidatus
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section
            className="digital-marketing-service"
            id="digital-marketing-section"
          >
            <div className="row align-items-center">
              <div
                className="col-12 col-lg-7 grid-margin grid-margin-lg-0"
                data-aos="fade-right"
              >
                <h3 className="m-0">Balsuokime protingai ir atsakingai.</h3>
                <div className="col-lg-7 col-xl-6 p-0">
                  <p className="py-4 m-0 text-muted">
                    Kiekvienas iš mūsų gali prisidėti prie geresnės Lietuvos
                    kūrimo.
                    {/* 
                    Mes tikime, kad kiekvienas balsas yra svarbus. 
                    
                    Mes siekiame didinti politine atskaitomybe bei skatinti pilietiškumą.
                                      
                    Kiekvienas iš mūsų gali prisidėti prie geresnės Lietuvos kūrimo.
                    
                    Pasinaudokime 21 amžiaus technologijomis, tam, kad
                    įveiktume šimtečio demokratijos problemą.
 */}
                  </p>
                  <p className="font-weight-medium text-muted">
                    LRS rinkimai 2020 m. spalio 11 d.
                  </p>
                </div>
              </div>
              <div
                className="col-12 col-lg-5 p-0 img-digital grid-margin grid-margin-lg-0"
                data-aos="fade-left"
              >
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/31/19/21/ballot-1294935_960_720.png"
                  alt=""
                  className="img-fluid"
                  style={{
                    margin: 30,
                    maxWidth: "50%",
                  }}
                ></img>
              </div>
            </div>
          </section>
          <section className="contact-us" id="contact-section">
            <div className="contact-us-bgimage grid-margin">
              <div className="pb-4">
                <h4 className="px-3 px-md-0 m-0" data-aos="fade-down">
                  Sužinok tau labiausiai tinkančius politikus
                </h4>
              </div>
              <div data-aos="fade-up">
                <button
                  className="btn btn-rounded btn-outline-danger"
                  onClick={() => {
                    history.push("/quiz");
                  }}
                >
                  Pradedam
                </button>
              </div>
            </div>
          </section>
          <Footer></Footer>
          {/* Modal for Contact - us Button */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="exampleModalLabel">
                    Contact Us
                  </h4>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="Name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="Email-1"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Message">Message</label>
                      <textarea
                        className="form-control"
                        id="Message"
                        placeholder="Enter your Message"
                        defaultValue={""}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
