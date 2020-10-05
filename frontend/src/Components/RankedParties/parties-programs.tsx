import { Collapse } from "antd";
import React from "react";

const programsByPartyId: Record<string, any> = {
  nacionalinis_susivienijimas: () => {
    return (
      <div>
        <ul>
          <li>
            <strong>Lietuva</strong> – piliečiams teisingai tarnaujanti
            valstybė.
          </li>
          <li>
            <strong>Rinkimų sistemos pertvarka</strong> – piliečių valdymui!
          </li>
          <li>
            <strong>Savivaldos valdžia</strong> – oriems ir laisviems žmonėms.
          </li>
          <li>
            <strong>Savivalda</strong> – regiono žmonių valdžia.
          </li>
          <li>
            <strong>Reali piliečių lygybė prieš įstatymą!</strong>
          </li>
          <li>
            <strong>
              Sąžininga ir skaidri viešojo sektoriaus atlyginimų sistema!
            </strong>
          </li>
          <li>
            <strong>Viešasis sektorius</strong> – valstybės įstaigos.
          </li>
          <li>
            <strong>Jokios senaties korupciniams nusikaltimams!</strong>{" "}
            (Korupcija yra papirkimas. Senatis – laiko tarpas. Jam praėjus
            išvengiama bausmės.)
          </li>
          <li>
            <strong>
              Kaimo politikoje pirmenybė šeimos ūkiams ir bendruomenėms!
            </strong>
          </li>
          <li>
            <strong>„Sodros“ pinigai</strong> – ne užsienio bankams, o Lietuvos
            pensininkams!
          </li>
          <li>
            <strong>Vaikų teisių priežiūros tarnybos</strong> – skaidriai
            veikiančios tarnybos!
          </li>
        </ul>
      </div>
    );
  },
  kartu_solidarumo_sajunga__santalka_lietuvai: () => {
    return (
      <div>
        <p>Tikslai:</p>
        <strong>Sudaryti palankias sąlygas:</strong>
        <ul>
          <li>šeimoms gausėti ir vaikams auginti</li>
          <li>teisingumą, saugumą ir orų Lietuvos žmonių gyvenimą</li>
        </ul>
        <strong>Užtikrinti:</strong>
        <ul>
          <li>teisingumą, saugumą ir orų Lietuvos žmonių gyvenimą</li>
        </ul>
        <strong>Išsaugoti:</strong>
        <ul>
          <li>tautinę Lietuvos valstybę</li>
          <li>lietuvių kalbą, kultūrą ir istoriją</li>
          <li>Lietuvos gamtą ir jos turtus ateities kartoms.</li>
        </ul>
      </div>
    );
  },
  laisves_partija: () => {
    return (
      <div>
        Lietuvai svarbiausia turėti gerą švietimą.
        <br />
        <br />
        Mokyklose mokytojai padės kiekvienam mokiniui.
        <br />
        <br />
        Pasieksime, kad mokiniams patiktų mokytis.
        <br />
        <br />
        Mokytojai gaus aukštus atlyginimus. Mokyklose visus pasieks reikalinga
        pagalba.
        <br />
        <br />
        Padėsime žmonėms, kurie stengiasi. Atsakingam verslui bus paprasta
        dirbti.
        <br />
        <br />
        Padėsime smulkiems verslams. Nebus jokių naujų mokesčių.
        <br />
        <br />
        Žmogaus teisės skirtos visiems. Pritaikysime miestus žmonėms su negalia.
        Padėsime sukurti prieinamą aplinką neįgaliesiems universitetuose.
        <br />
        <br />
        Saugosime Lietuvos gamtą vaikams. Tapsime žaliausia Europos valstybe.
      </div>
    );
  },
  tevynes_sajunga__lietuvos_krikscionys_demokratai: () => {
    return (
      <div>
        Mūsų programos ašis – pasitikėjimas Valstybe.
        <br />
        <br />
        Svarbiausi darbai:
        <br />• mažiau, bet kokybiškų įstatymų;
        <br />• šiuolaikiškas švietimas Lietuvos vaikams;
        <br />• geresnis ligų gydymas ir ilgesnis gyvenimas;
        <br />• Lietuva turi tapti biologijos ir medicinos technologijų centras
        Europoje; (Biologija – mokslas apie gamtą. Technologijos – mokslo žinių
        pritaikymas kuriant daiktus.)
        <br />• stabilios ir didėjančios pensijos;
        <br />• daugiau galimybių šeimoms;
        <br />• Baltarusijos Astravo atominės elektrinės blokada; (Atominė
        elektrinė gamina elektrą. Blokada – ryšių ir veiksmų apribojimas.)
        <br />• stipri kariuomenė ir Šaulių sąjunga;
        <br />• daugiau miškų ir švari aplinka.
      </div>
    );
  },
  lietuvos_liaudies_partija: () => {
    return (
      <div>
        Lietuvių Tautos laisvės, valstybės išsaugojimas ir gynybinės galios
        stiprinimas;
        <br />
        Lietuvos visuomenės pagrindas – prigimtinė šeima;
        <br />
        Visus pasiekiantis teisinis ir socialinis teisingumas, valdymo
        skaidrumas;
        <br />
        Kultūros, praeities, papročių išsaugojimas ir oraus piliečio formavimas;
        <br />
        Smulkiojo verslo stiprinimas;
        <br />
        Saugoma aplinka;
        <br />
        Kėsinimasis į Lietuvos teritorijos ir erdvės vientisumą, žemės gelmes,
        miškus ir aplinkos teršimas būtų baudžiamasis nusikaltimas;
        <br />
        Nemokama elektra senjorams ir daugiavaikėms šeimoms;
        <br />
        Švietimas apie regionų saugojimą elektroninėje erdvėje;
        <br />
        Moratoriumas miškų kirtimui.
      </div>
    );
  },
  lietuvos_respublikos_liberalu_sajudis: () => {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: `<div>
            <span style="font-weight: bold"
              >Už galimybių Lietuvą!<br />
              <br /></span
            >Liberalų sąjūdis siūlo galimybes, kurios leis kurti, mokytis,
            užsidirbti ir pilnavertiškai gyventi!<br />
            <br /><span style="font-weight: bold"
              >Suteiksime laisvę dirbančiam ir kuriančiam žmogui! <br /></span
            >Mažinsime mokesčius ir sieksime didesnių atlyginimų.<br />
            <br /><span style="font-weight: bold"
              >Efektyvi sveikatos apsauga! <br /></span
            >Užtikrinsime aukščiausios kokybės paslaugas, kurios būtų
            suteikiamos laiku ir artimiausioje vietoje.<br />
            <br /><span style="font-weight: bold"
              >Ugdysime laisvei pasirengusį žmogų! <br /></span
            >Tobulinsime švietimo sistemą, kuri bus atvira visiems. <br />
            <br /><span style="font-weight: bold"
              >Išmani, tvari, žalia Lietuva! <br /></span
            >Rūpinsimės mūsų gamta, kurdami saugantį aplinką verslą.<br />
            <br /><span style="font-weight: bold"
              >Užtikrintos Žmogaus teisės! <br /></span
            >Didinsime pagarbą Žmogaus teisėms ir žmonių požiūrių įvairovei.
          </div>`,
        }}
      ></div>
    );
  },
  centro_partija__tautininkai: () => {
    return (
      <div>
        Teismai visiems teisingi.
        <br />
        Nemokamas mokslas.
        <br />
        Sveikatos apsauga nemokama.
        <br />
        Pensijos ne mažesnės už vidutinį pragyvenimo lygį.
        <br />
        Mažesni mokesčiai neįgaliesiems, šeimoms su vaikais ir jaunimui.
        <br />
        Valdžia dirba žmonėms.
        <br />
        Kyšininkai turi būti nubausti.
        <br />
        Parduotuvėse – maistas iš Lietuvos žemės ūkio.
        <br />
        Aplinka, pastatai, renginiai prieinami visiems.
        <br />
        Sveikatos gerinimas ir sportas nemokami.
        <br />
        Gamtos neteršiančios įmonės moka mažesnius mokesčius.
        <br />
        Sveiką maistą gaminančios įmonės moka mažesnius mokesčius.
        <br />
        Lietuvoje pasiliekančiam jaunimui – lengvatos.
        <br />
        Draugystė su kaimyninėmis šalimis.
      </div>
    );
  },
  lietuvos_zaliuju_partija: () => {
    return (
      <div>
        Už galimybių Lietuvą! <br />
        Metas Lietuvai sužaliuoti! <br />
        Mes esame tikrieji žalieji – Lietuvos žaliųjų partija. <br />
        Savo darbu saugome gamtą. <br />
        Mes sieksime, kad Lietuvoje būtų gera gyventi visiems.
        <br />
        <br />
        Mes norime, kad: <br />• žmonės kvėpuotų švariu oru; <br />• valgytume
        sveiką maistą; <br />• gyventume švarioje aplinkoje;
        <br />• nebūtų kertami medžiai, nebūtų teršiamos upės, <br />
        nebūtų skriaudžiami gyvūnai; <br />• visi būtume gerbiami; <br />• būtų
        daugiau darbo vietų ir žmonės uždirbtų daugiau pinigų; <br />• daugiau
        žmonių dalyvautų šalies valdyme; <br />• galėtume mokytis iš kitose
        šalyse gyvenančiųjų patirties.
        <br />
        <br />
        Balsuokite už mus! Visi gyvensime geriau!
      </div>
    );
  },
  lietuvos_socialdemokratu_darbo_partija: () => {
    return (
      <div>
        Gerovės ir kūrybos Lietuva.
        <br />
        <br />
        Kursime Lietuvą žmogui. <br />
        Atversime daugiau galimybių darbo rinkoje. <br />
        Mažinsime komunalinius mokesčius ir pridėtinės vertės mokestį. <br />
        Gerinsime sveikatos priežiūros kokybę.
        <br />
        Tobulinsime švietimo sistemą. <br />
        Daugės valstybės paramos.
        <br />
        Minimali mėnesinė alga sieks tūkstantį eurų ir alga nebus apmokestinama.{" "}
        <br />
        Vidutinis mėnesio atlyginimas sieks 2 tūkstančius eurų. <br />
        Vidutinė senatvės pensija sieks 1 tūkstantį eurų. <br />
        Vaiko pinigai sieks iki 150 eurų. <br />
        Namus, kuriuose gyvena neįgalieji, pritaikysime jų poreikiams. <br />
        Skatinsime socialinių paslaugų ir socialinio verslo plėtrą.
      </div>
    );
  },
  partija_lietuva__visu: () => {
    return (
      <div>
        Mes iškovojome laisvę, atkūrėme demokratiją. (Demokratija yra valdymo
        forma, kai visi gali dalyvauti valstybės valdyme.)
        <br />
        Prelatas M. Krupavičius, sakė: „Vien tik laisve pagrįstas režimas gali
        palikti dirbantįjį luomą išnaudotojų savivalei ir sudaryti dar sunkesnes
        gyvenimo sąlygas.
        <br />
        Napoleonas Suvalkijoje lietuviams panaikino baudžiavą, bet nedavė
        teisingumo.“ (Prelatas yra aukšto rango katalikų dvasininkas.)
        <br />
        <br />
        Lietuvai įstojus į Europos Sąjungą, žmonėms problemų tik padaugėjo.
        <br />
        Esminio lūžio neįvyko. Žmonių ir regionų socialinė atskirtis padidėjo.
        <br />
        (Europos Sąjunga yra 27 susivienijusių valstybių narių grupė. Jos
        susitarė dirbti drauge ir viena kitai padėti.)
        <br />
        <br />
        Valstybė – tai žmonės.
        <br />
        Lietuva turi tapti visų Motina.
      </div>
    );
  },
  darbo_partija: () => {
    return (
      <div>
        Mes esame Darbo partija. <br />
        Mes turime išsamų planą, kaip pagerinti Lietuvos žmonių gyvenimą. <br />
        Mes turime stiprų lyderį Viktorą Uspaskich. Jį siūlysime vadovauti
        Vyriausybei. <br />
        Mums svarbu – žmonių gerovė, valstybės valdymo skaidrumas ir ekonomikos
        augimas. <br />
        Ekonomika yra šalies ūkio sistema. <br />
        Mes sudarysime palankias sąlygas žmonėms dirbti ir užsidirbti.
        <br />
        Turime konkrečius veiksmų planus. <br />
        <br />
        Įsipareigojame:
        <br />• minimalus atlyginimas – 750 eurų į rankas; <br />• vidutinis
        atlyginimas – 1 tūkstantis 289 eurai į rankas; <br />• vidutinė pensija
        – 770 eurų; <br />• 200 tūkstančių naujai sukurtų darbo vietų. <br />
        <br />
        Ir mes atsakome už savo žodžius!
      </div>
    );
  },
  krikscioniu_sajunga: () => {
    return (
      <div>
        Tikime, kad Lietuvai reikia krikščioniškų vertybių, nes jos gelbėjo mūsų
        tautą sunkiausiomis akimirkomis. <br />
        <br />
        Mūsų valstybę stiprina ne homoseksualumas (lytinis potraukis tos pačios
        lyties asmenims) ir ne homoseksualių žmonių eitynės, o pagarba istorinei
        atminčiai. <br />
        <br />
        Krikščionių sąjungos požiūriu, klestinti Lietuva yra: <br />• gyvybės
        saugojimas nuo jos pradžios iki natūralios mirties; <br />• tvirtos
        šeimos, kurią sudaro stipri vyro ir moters sąjunga; <br />• vaikai,
        gerbiantys artimuosius; <br />• nuoširdus rūpestis silpnesniaisiais;{" "}
        <br />• atsisakymas pasipelnyti.
        <br />
        <br />
        Stiprios ir kuriančios šeimos yra mūsų ateities pagrindas!
      </div>
    );
  },
  lietuvos_lenku_rinkimu_akcija__krikscionisku_seimu_sajunga: () => {
    return (
      <div>
        Šeima – svarbiausias prioritetas.
        <br />
        <br />
        Šeimos gerovė užtikrina valstybės ateitį: <br />• 120 eurų kas mėnesį
        kiekvienam vaikui; <br />• šeimos kortelėje daugiau lengvatų ir
        paslaugų; <br />• 5 procentų pridėtinės vertės mokestis maistui;
        <br />• didesnės pensijos, jas susiejant su vidutiniu darbo užmokesčiu;{" "}
        <br />• nemokami vaistai 70 metų ir vyresniems žmonėms;
        <br />• atlyginimų ir socialinių garantijų didinimas; <br />• mokyklų
        išsaugojimas. <br />
        Sieksime: <br />• turtingesni mokės didesnius mokesčius; <br />•
        apmokestinti bankus ir prekybos tinklus; <br />• remti savivaldybes,
        švietimą, kultūrą, vaikų globą;
        <br />• keisti mokinio krepšelio ir ligonių kasų kvotas; <br />• mažinti
        Seimo narių skaičių.
      </div>
    );
  },
  partija_laisve_ir_teisingumas: () => {
    return (
      <div>
        Nauja partija „Laisvė ir teisingumas“ sujungė tris politines
        <br />
        jėgas:
        <br />• Artūro Zuoko vadovaujamą Lietuvos laisvės sąjungą (liberalus);
        <br />• Remigijaus Žemaitaičio vadovaujamą Partiją Tvarka ir
        teisingumas;
        <br />• Artūro Paulausko judėjimą „Pirmyn, Lietuva!“.
        <br />
        <br />
        Gimė nauja viltis Lietuvai.
        <br />
        Siekiame šalies, jos piliečių saugumo, ekonominio klestėjimo, gyvenimo
        kokybės.
        <br />
        Mes patyrę ir pasiryžę veikti.
        <br />
        Įveiksime krizę ir vienysime tautą.
        <br />
        Mes turime aiškų tikslą ir veiksmų viziją.
        <br />
        Pasitikime žmonėmis.
        <br />
        Įstatymai kuriami ne reguliuoti ir drausti, o skatinti kūrybingumą,
        verslumą, atsakomybę.
        <br />
        Vienas už visus, visi už Lietuvą!
        <br />
        Balsuokite už Laisvės ir teisingumo partiją!
      </div>
    );
  },
  lietuvos_socialdemokratu_partija: () => {
    return (
      <div>
        Atkurkime pasitikėjimą vieni kitais, ateitimi ir Lietuva.
        <br />
        <br />
        Atėjo laikas: <br />• garantuoti nemokamą švietimą ir gydymą; <br />•
        užtikrinti poreikius tenkinantį uždarbį ir orią pensiją; <br />• keisti
        mokesčius ir mažinti nelygybę; <br />• investuoti į gamtą saugančias
        technologijas; <br />
        Technologijos – žinių pritaikymas gaminant daiktus. <br />• stiprinti
        savivaldybes ir jų valdymą; <br />• didinti teisėsaugos atsakingumą ir
        skaidrumą; <br />
        Teisėsauga saugo įstatymus. <br />• atsigręžti į kultūrą ir tautines
        mažumas; <br />• kovoti su klimato kaita; <br />
        Klimato kaita yra visuotinis atšilimas. <br />• gerinti kaimynystę ir
        ginti taiką; <br />• saugoti Konstituciją ir žmogaus teises.
        <br />
        Konstitucija yra pagrindinis įstatymas.
      </div>
    );
  },
  lietuvos_valstieciu_ir_zaliuju_sajunga: () => {
    return (
      <div>
        Siekiame, kad Lietuvos gyventojai būtų laimingi ir orūs.
        <br />
        Kuriame darnią ekonominę ir kultūrinę aplinką.
        <br />
        Saugome tradicines vertybes.
        <br />
        <br />
        Todėl:
        <br />• siekiame išsaugoti Lietuvos tautinę tapatybę ir valstybingumą;
        <br />• pasisakome už pilietiškumo ugdymą ir stiprinimą;
        <br />• palaikome konkrečias socialines programas dėl žmogaus gerovės ir
        skatiname visų Lietuvos regionų vystymąsi;
        <br />• pradėjome ir tęsime vaistų kainų mažinimo politiką;
        <br />• principingai kovojame su korupcija, mažiname biurokratiją;
        <br />
        Korupcija yra papirkimas. Biurokratija yra sudėtinga darbo organizavimo
        sistema.
        <br />• stengiamės mažinti alkoholio ir kitų priklausomybių žalą
        visuomenei.
      </div>
    );
  },
  drasos_kelias_politine_partija: () => {
    return (
      <div>
        Mums svarbi pagarba žmogui ir jo orumui.
        <br />
        Gerbiame asmens laisvę ir atsakomybės pareigą.
        <br />
        Tikime gėriu, teisingumu ir Tauta.
        <br />
        Remiamės krikščioniškosios Vakarų civilizacijos principais.
        <br />
        <br />
        Mūsų tikslai:
        <ul>
          <li>stiprinti demokratiją ir visur siekti teisingumo</li>
          <li>valdžia privalo tarnauti žmonėms</li>
          <li>
            referendumams organizuoti reiktų 100 tūkstančių piliečių parašų
          </li>
          <li>Seimo narių skaičių sumažinti iki 101</li>
          <li>panaikinti partijų finansavimą iš valstybės biudžeto</li>
          <li>
            pertvarkyti teisėjų ir prokurorų atrankos ir vertinimo sistemą
          </li>
          <li>
            baigti vykdyti liustraciją. (Liustracija yra patikrinimas, ar asmuo
            bendradarbiavo su KGB. KGB – buvusios Sovietų Sąjungos slaptoji
            tarnyba.)
          </li>
        </ul>
      </div>
    );
  },
};

export const ProgramPlan = (props: { partyId: string }) => {
  const partyProgram = programsByPartyId[props.partyId];
  // if (partyProgram == null) return null
  return (
    <Collapse bordered={false}>
      <Collapse.Panel
        header="Politinė programa"
        key="1"
        className="site-collapse-custom-panel"
      >
        {partyProgram?.()}
      </Collapse.Panel>
    </Collapse>
  );
};
