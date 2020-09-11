import React from "react";
import { Footer, Header } from "./LandingPage";
import { Page } from "../Components/Common/Page";
export default function () {
  return (
    <Page>
      <Header></Header>
      <div className="banner">
        <div className="container">
          <h1 className="font-weight-semibold ResponsiveText">
            Slapukų politika
          </h1>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="container">
          <section>
            <header>
              <h2>Kas yra slapukai?</h2>
            </header>
            <p>
              Slapukas – tai nedidelė teksto rinkmena, kurią svetainė išsaugo
              jūsų kompiuteryje arba mobiliajame įrenginyje, kai joje
              apsilankote.
            </p>
            <ul>
              <li>
                <strong>Pirmosios šalies slapukai</strong> – tai lankomos
                svetainės sukuriami slapukai. Juose išsaugotą informaciją gali
                perskaityti tik ta interneto svetainė. Interneto svetainėje taip
                pat gali būti naudojamasi išorės paslaugomis, kurios taip pat
                sukuria savo slapukus – tai yra{" "}
                <strong>trečiosios šalies slapukai</strong>.
              </li>
              <li>
                Ilgalaikiai slapukai – tai slapukai, kurie išsaugomi naudotojo
                kompiuteryje ir automatiškai nepašalinami uždarius naršyklę,
                skirtingai negu seanso slapukai, kurie pašalinami, kai tik
                naršyklė uždaroma.
              </li>
            </ul>
            <p>
              Kaskart apsilankius “PriimkSprendima.lt”, bus{" "}
              <strong>prašoma priimti arba atmesti slapukus.</strong> <br></br>{" "}
              Slapukų paskirtis – suteikti svetainei galimybę tam tikrą laiką
              įsiminti naudotojo parinktis (pavyzdžiui, naudotojo vardą, kalbą
              ir kt.). Tokiu būdu jums nebereikia jų dar kartą nurodyti, kai
              naršote įvairiuose svetainės puslapiuose per tą patį apsilankymą.
              Slapukai taip pat gali būti naudojami anoniminei naršymo mūsų
              svetainėse statistikai rinkti.
            </p>
          </section>
          <section>
            <header>
              <h2>Kaip naudojame slapukus?</h2>
            </header>
            <p>
              “PriimkSprendima.lt” interneto svetainėse daugiausia naudojami
              pirmosios šalies slapukai.
            </p>
            <p>
              Mes naudojame <strong>3 rūšių pirmosios šalies slapukus</strong>,
              kurių paskirtis:
            </p>
            <ul>
              <li>saugoti lankytojų parinktis,</li>
              <li>užtikrinti, kad mūsų svetainės veiktų,</li>
              <li>rinkti analitinius duomenis (apie naudotojų elgseną).</li>
            </ul>
            <h6>Lankytojų parinktys</h6>
            <p>
              Šios rūšies slapukus nustatome mes ir tik mes galime perskaityti
              jų informaciją. Šie slapukai įsimena:
            </p>
            <ul>
              <li>
                ar sutikote su svetainės slapukų politika, ar su ja nesutikote
              </li>
            </ul>
            <table className="table">
              <thead>
                <tr>
                  <th>Pavadinimas</th>
                  <th>Tarnyba</th>
                  <th>Paskirtis</th>
                  <th>Slapuko rūšis ir naudojimo trukmė</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>eu_cookie_consent</td>
                  <td>Sutikimo priimti slapukus rinkinys</td>
                  <td>
                    Išsaugo jūsų slapukų parinktis (kad nebereikėtų vėl jūsų
                    klausti)
                  </td>
                  <td>
                    Pirmosios šalies seanso slapukas, pašalinamas uždarius
                    naršyklę
                  </td>
                </tr>
                <tr>
                  <td>ecsi</td>
                  <td>Interneto svetainių tyrimo priemonės</td>
                  <td>
                    Saugo informaciją apie tai, ar jau atsakėte į apklausos
                    iškylančiajame lange klausimus, kad nebebūtų prašoma vėl
                    joje dalyvauti
                  </td>
                  <td>
                    Pirmosios šalies nuolatinis slapukas, saugomas 12 mėnesių
                  </td>
                </tr>
                <tr>
                  <td>cck3</td>
                  <td>Sutikimo priimti slapukus rinkinys</td>
                  <td>
                    Išsaugo jūsų parinktis dėl trečiųjų šalių slapukų (kad
                    nebereikėtų vėl jūsų klausti)
                  </td>
                  <td>
                    Pirmosios šalies nuolatinis slapukas, saugomas 12 mėnesių
                  </td>
                </tr>
              </tbody>
            </table>
            <h3>Veiklos slapukai</h3>
            <p>
              Yra keletas slapukų, kuriuos turime įtraukti, kad galėtų veikti
              tam tikri mūsų puslapiai. Dėl šios priežasties jūsų sutikimo juos
              naudoti nereikia. Tai visų pirma:
            </p>
            <ul>
              <li>
                <strong>tapatybės nustatymo slapukai,</strong>
              </li>
              <li>
                <strong>techniniai slapukai</strong>, kurių reikia tam tikroms
                IT sistemoms.
              </li>
            </ul>
            <p>
              Šie slapukai įrašomi, kai prisijungiama prie “PriimkSprendima.lt”
              svetainės naudojantis socialinio tinklo paskyra, pvz. Facebook.
            </p>
            <table className={"table"}>
              <tbody>
                <tr>
                  <td>
                    <p>
                      <span>Pavadinimas</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>Tarnyba</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>Paskirtis</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>
                        Slapuko r&#363;&scaron;is ir naudojimo trukm&#279;
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <span>MyECASDomain</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>Tapatyb&#279;s duomen&#371; valdymo tarnyba</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>&#302;simena j&#363;s&#371; srit&#303;</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>
                        Pirmosios &scaron;alies seanso slapukas,
                        pa&scaron;alinamas u&#382;darius nar&scaron;ykl&#281;
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <span>__Secure_CASTGC</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>Tapatyb&#279;s duomen&#371; valdymo tarnyba</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>
                        Atpa&#382;&#303;sta j&#363;s&#371; seans&#261;
                      </span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>
                        Pirmosios &scaron;alies seanso slapukas,
                        pa&scaron;alinamas u&#382;darius nar&scaron;ykl&#281;
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <span>__Secure_ECAS_SESSIONID</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>Tapatyb&#279;s duomen&#371; valdymo tarnyba</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>
                        Atpa&#382;&#303;sta esam&#261; centrin&#279;s
                        tapatyb&#279;s nustatymo tarnybos seans&#261;
                      </span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>
                        Pirmosios &scaron;alies seanso slapukas,
                        pa&scaron;alinamas u&#382;darius nar&scaron;ykl&#281;
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <span>ECAS_PREFS</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>Tapatyb&#279;s duomen&#371; valdymo tarnyba</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>
                        &#302;simena j&#363;s&#371; nuostatas ir parinktis:
                      </span>
                    </p>
                    <p>
                      <span>
                        naudotojo ID, naudotojo vard&#261;, sutikim&#261; su
                        slapuk&#371; politika, didelio kontrasto
                        re&#382;im&#261;, privatumo re&#382;im&#261;,
                        i&scaron;samius paskyros duomenis po prisijungimo,
                        paskutin&#303; pasirinkt&#261; tapatyb&#279;s
                        patvirtinimo b&#363;d&#261;
                      </span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>
                        Pirmosios &scaron;alies seanso slapukas,
                        pa&scaron;alinamas u&#382;darius nar&scaron;ykl&#281;
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <span>CASPRIVACY</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>Europos darbo mobilumo portalas EURES</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>EURES tapatyb&#279;s nustatymo informacija</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>
                        Pirmosios &scaron;alies seanso slapukas,
                        pa&scaron;alinamas u&#382;darius nar&scaron;ykl&#281;
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <span>CASTGC</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>Europos darbo mobilumo portalas EURES</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>EURES tapatyb&#279;s nustatymo informacija</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>
                        Pirmosios &scaron;alies seanso slapukas,
                        pa&scaron;alinamas u&#382;darius nar&scaron;ykl&#281;
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <span>EURES_CAS_LOGGED_IN</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>Europos darbo mobilumo portalas EURES</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>EURES tapatyb&#279;s nustatymo informacija</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>
                        Pirmosios &scaron;alies seanso slapukas,
                        pa&scaron;alinamas u&#382;darius nar&scaron;ykl&#281;
                      </span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <section>
            <header>
              <h2>Trečiųjų šalių slapukai</h2>
            </header>
            <p>
              Kai kuriuose mūsų puslapiuose rodomas išorės paslaugų teikėjų,
              pvz., „YouTube“, „Facebook“, „Twitter“ turinys.
            </p>
            <p>
              Kad naudotojai galėtų pamatyti tokį trečiųjų šalių turinį,
              pirmiausia jie turi sutikti su konkrečiomis jų sąlygomis. Į šias
              sąlygas patenka ir jų slapukų politika, kuriai mes neturime jokios
              įtakos.
            </p>
            <p>
              Tačiau jeigu lankytojai šio turinio nežiūri, jų įrenginiuose
              neišsaugomi jokie trečiųjų šalių slapukai.
            </p>
            <strong>
              Trečiųjų šalių paslaugų teikėjai Komisijos svetainėse
            </strong>
            <br></br>
            <br></br>
            <ul>
              <li>
                <span>
                  <a href="https://www.google.com/url?q=https://www.youtube.com/t/terms&amp;sa=D&amp;ust=1599846193095000&amp;usg=AOvVaw3PaCHcowLTrIgYOctnjdNk">
                    &bdquo;YouTube&ldquo;
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <a href="https://www.google.com/url?q=https://archive.org/about/terms.php&amp;sa=D&amp;ust=1599846193096000&amp;usg=AOvVaw281OsejueE6mOnUPE3RgaF">
                    Interneto archyvas
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <a href="https://www.google.com/url?q=https://www.google.com/intl/lt_be/help/terms_maps/&amp;sa=D&amp;ust=1599846193096000&amp;usg=AOvVaw19aW0Q7y3XsI-WRQhc7id4">
                    &bdquo;Google Maps&ldquo;
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <a href="https://www.google.com/url?q=https://twitter.com/en/tos?wcmmode%3Ddisabled%23intlTerms&amp;sa=D&amp;ust=1599846193097000&amp;usg=AOvVaw3EqLqTK9YKadLca4C0Mohu">
                    &bdquo;Twitter&ldquo;
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <a href="https://www.google.com/url?q=https://www.tv1.eu/en/datenschutz/&amp;sa=D&amp;ust=1599846193097000&amp;usg=AOvVaw2QCiTYnkmYOV3R5PlpOV4I">
                    TV1
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <a href="https://www.google.com/url?q=https://vimeo.com/terms&amp;sa=D&amp;ust=1599846193098000&amp;usg=AOvVaw0nL6l7F4_wsZyAyx2JiKVa">
                    &bdquo;Vimeo&ldquo;
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <a href="https://www.google.com/url?q=https://www.microsoft.com/en/servicesagreement/&amp;sa=D&amp;ust=1599846193098000&amp;usg=AOvVaw33ovIA8XRp3l8L9uyh6WHa">
                    &bdquo;Microsoft&ldquo;
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <a href="https://www.google.com/url?q=https://www.facebook.com/legal/terms&amp;sa=D&amp;ust=1599846193098000&amp;usg=AOvVaw3-5BXRoMd1ZWatTQNH2ckO">
                    &bdquo;Facebook&ldquo;
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <a href="https://www.google.com/url?q=https://policies.google.com/terms?hl%3Dlt%26gl%3Dbe&amp;sa=D&amp;ust=1599846193099000&amp;usg=AOvVaw2be_PPobBRD66dvOMZbiOG">
                    &bdquo;Google&ldquo;
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <a href="https://www.google.com/url?q=https://www.linkedin.com/legal/user-agreement&amp;sa=D&amp;ust=1599846193099000&amp;usg=AOvVaw2KZTW3zfb54jELmgE6mDA1">
                    &bdquo;LinkedIn&ldquo;
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <a href="https://www.google.com/url?q=https://livestream.com/legal/terms&amp;sa=D&amp;ust=1599846193100000&amp;usg=AOvVaw25V0_EM2uigNGqETdNL9h2">
                    &bdquo;Livestream&ldquo;
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <a href="https://www.google.com/url?q=https://soundcloud.com/pages/privacy&amp;sa=D&amp;ust=1599846193100000&amp;usg=AOvVaw0upoQp2FwYdDjPNasgWvE3">
                    &bdquo;SoundCloud&ldquo;
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <a href="https://www.google.com/url?q=http://www.europarl.europa.eu/portal/lt/legal-notice&amp;sa=D&amp;ust=1599846193100000&amp;usg=AOvVaw1WpBYZNT4Ha-jmieCvqlSF">
                    Europos Parlamentas
                  </a>
                </span>
              </li>
            </ul>

            <p>
              Šių trečiųjų šalių paslaugoms “PriimkSprendima.lt” neturi įtakos.
              Paslaugų teikėjai gali bet kuriuo metu keisti savo paslaugų
              teikimo sąlygas, paskirtį, slapukų naudojimo sąlygas ir kt.
            </p>
          </section>
          <section>
            <header>
              <h2>Kaip galima tvarkyti slapukus?</h2>
            </header>
            <p>
              Naudotojai gali tvarkyti / šalinti slapukus savo nuožiūra. Išsami
              informacija pateikiama adresu <a href={"aboutcookies.org"}></a>.
            </p>
            <strong>Slapukų šalinimas iš savo įrenginio</strong>
            <p>
              Visus slapukus iš naudotojo įrenginio galima pašalinti išvalant
              naršymo istoriją naršyklėje. Tokiu būdu bus pašalinti visi visų
              aplankytų svetainių slapukai. Primename, kad taip galima prarasti
              ir tam tikrą išsaugotą informaciją (pvz., išsaugotus prisijungimo
              duomenis, svetainės parinktis).
            </p>
            <strong>Konkrečios svetainės slapukų tvarkymas</strong>
            <p>
              Norint išsamiau kontroliuoti konkrečios svetainės slapukus,
              reikėtų patikrinti savo pasirinktos naršyklės privatumo ir slapukų
              nustatymus.
            </p>
            <strong>Slapukų blokavimas</strong>
            <p>
              Naujausiose naršyklėse galima nustatyti, kad jūsų įrenginyje
              nebūtų išsaugomi jokie slapukai, tačiau tuomet gali tekti patiems
              koreguoti kai kurias parinktis kiekvieną kartą apsilankius
              svetainėje ar puslapyje, o kai kurios paslaugos ir funkcijos gali
              iš viso tinkamai neveikti (pvz., prisijungimas naudojant profilio
              duomenis).
            </p>
            <strong>Mūsų analitinių slapukų valdymas</strong>
            <p>Mūsų analitinių slapukų valdymas</p>
          </section>
        </div>
      </div>
    </Page>
  );
}
