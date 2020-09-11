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
            Paslaugų teikimo taisyklės
          </h1>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="container">
          <section>
            <header>
              <h2>Naudojimo sąlygos</h2>
            </header>
            <p>
              „PriimkSprendima.lt“ svetainės naudojimą nustato čia pateiktos
              nuostatos ir sąlygos, visi kiti taikomi įstatymai ir reglamentai.
              Naudodami šios svetainės turinį, be apribojimų ir išlygų sutinkate
              su šiomis naudojimo sąlygomis ir pripažįstate, kad čia išdėstytos
              nuostatos ir sąlygos pakeičia bet kokius kitus susitarimus tarp
              jūsų ir „PriimkSprendima.lt“.
            </p>
          </section>
          <section>
            <header>
              <h2>Informacijos paskirtis</h2>
            </header>
            <p>
              „PriimkSprendima.lt“ svetainės tikslas – pristatyti jums aktualią
              informaciją apie politikus, politines partijas bei rinkimus. Visa
              šioje svetainėje pateikta informacija yra tik pažintinio ir
              informacinio pobūdžio; ji negali būti laikoma skatinimu ar siūlimu
              balsuoti už tam tikrą politiką ar politinę partiją.
            </p>
          </section>
          <section>
            <header>
              <h2>Nuorodos į kitas interneto svetaines</h2>
            </header>
            <p>
              Kad būtų patogiau, pateikiamos nuorodos į kitas interneto
              svetaines. „PriimkSprendima.lt“ neprisiima jokios atsakomybės dėl
              šių svetainių turinio ar veikimo ir nėra atsakinga už jokią žalą
              ar sužalojimus, kilusius dėl jų turinio ar veikimo.
            </p>
          </section>
          <section>
            <header>
              <h2>Privatumas</h2>
            </header>
            <p>
              Viena didžiausių “PriimkSprendima.lt” vertybių yra skaidrumas. Dėl
              to visas internetinio puslapio programinis kodas yra pateikiamas
              GitHub svetainėje. Šiame programiniame kode atsispindi duomenų
              rinkimo ir apdorojimo aspektai.
            </p>
          </section>
          <section>
            <header>
              <h2>Atsakomybės atsisakymas</h2>
            </header>
            <p>
              „PriimkSprendima.lt“ negarantuoja, kad prieiga prie svetainės ir
              jos turinys bus nepertraukiamas arba be klaidų. Ši svetainė ir
              visas jos turinys pateikiamas „kaip yra“ be jokių garantijų,
              išsakytų arba numanomų, įskaitant, bet neapsiribojant, teisių ar
              pažeidimo nebuvimo garantijas, arba numanomas perkamumo ar
              tinkamumo konkrečiam tikslui garantijas, parengtas atsižvelgiant į
              prieinamumą, tikslumą, saugumą, patikimumą ar svetainės turinį.
              Svetainėje gali būti techninių ir kitų klaidų, netikslumų arba
              spausdinimo klaidų. „PriimkSprendima.lt“ bet kuriuo metu be
              įspėjimo gali keisti svetainėje prieinamą turinį, išdėstymą ir
              paslaugas, įskaitant čia išvardytų produktų kainas ir aprašymus.
              Šios svetainės turinys ir paslaugos gali būti pasenę, o
              „PriimkSprendima.lt“ neįsipareigoja tokio turinio ar paslaugų
              atnaujinti. Nei „PriimkSprendima.lt“, nei bet kuris jos rangovas,
              susijęs su šios svetainės kūrimu, ruošimu ar turinio pateikimu,
              neatsako už jokius tiesioginius, netiesioginius, atsitiktinius,
              specialiuosius, priežastinius ar baudžiamuosius nuostolius,
              prarastą pelną ar verslo veiklos sustabdymą, susijusį su šios
              svetainės naudojimu ar negalėjimu naudotis, net jei
              „PriimkSprendima.lt“ buvo pranešta apie tokią galimą žalą.
              „PriimkSprendima.lt“ neatsako ir neprisiima jokios atsakomybės už
              nuostolius ar virusus, kuriais gali būti užkrėsta jūsų
              kompiuterinė įranga ar kita nuosavybė dėl naudojimosi arba
              prieigos prie šios svetainės. Kai kuriose jurisdikcijose
              neleidžiamas tam tikrų garantijų ar atsakomybės apribojimų
              neįtraukimas, todėl aukščiau minėti apribojimai ar išimtys gali
              būti jums netaikomos. „PriimkSprendima.lt“ atsakomybė tokiu atveju
              būtų apribota, kiek tai leidžiama pagal įstatymus.
            </p>
          </section>
          <section>
            <header>
              <h2>Taikoma teisė</h2>
            </header>
            <p>
              Šios svetainės turinys ir joje pateikiama teisinė informacija turi
              būti taikoma ir aiškinama remiantis Lietuvos materialine teise.
              Bet kokie ginčai, kilę dėl šios teisinės informacijos arba su ja
              susiję, jeigu negali būti išspręsti draugiškai, turi būti
              sprendžiami Lietuvos teisme. Jei esate nepatenkinti bet kuria šios
              svetainės dalimi, jūsų vienintelė ir išskirtinė priemonė yra
              nebenaudoti šios svetainės.
            </p>
          </section>
        </div>
      </div>
    </Page>
  );
}
