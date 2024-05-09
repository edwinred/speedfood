import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import {
  bag,
  carOutline,
  cartOutline,
  homeOutline,
  images,
  person,
  personOutline,
  search,
  triangle,
} from "ionicons/icons";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Login";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "../theme/variables.css";
import Prueba from "./Lista_platillos";
import { Preferences } from "@capacitor/preferences";
import { useEffect, useState } from "react";
import Carrito from "./Carrito";

setupIonicReact();

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/app/tab1" component={Tab1} />
        <Route exact path="/app/detalles/:id" component={Prueba} />
        <Route path="/app/tab2" component={Tab2} />
        <Route path="/app/tab3" component={Tab3} />
        <Route path="/app/carrito" component={Carrito} />
        <Route exact path="/app">
          <Redirect to="/app/tab1" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/app/tab1">
          <IonIcon aria-hidden="true" icon={homeOutline} />
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/app/tab2">
          <IonIcon icon={search} />
          <IonLabel>Buscar</IonLabel>
        </IonTabButton>

        <IonTabButton tab="tab3" href="/app/carrito">
          <IonIcon aria-hidden="true" icon={cartOutline} />
          <IonLabel>Carrito</IonLabel>
        </IonTabButton>

        <IonTabButton tab="tab4" href="/app/tab3">
          <IonIcon aria-hidden="true" icon={personOutline} />
          <IonLabel>Sesión</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
export default Tabs;
