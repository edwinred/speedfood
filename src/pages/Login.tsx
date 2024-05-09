import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab2.css";
import Tarjetatiendas from "../components/Comenzar";
import Login from "../components/Comenzar";
import { useEffect, useState } from "react";
import Axios from "../Axios";
import { Preferences } from "@capacitor/preferences";

const Tab3: React.FC = () => {
  const navigate = useIonRouter();
  const [body, setbody] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const handle = (evento: any) => {
    const { name, value } = evento.target;
    setbody((prev) => ({ ...prev, [name]: value }));
  };

  const login = async (e: any) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/usuarios/login", body);
      await Preferences.set({
        key: "user",
        value: JSON.stringify(response.data),
      });
      navigate.push("/app/tab1");
    } catch (error) {}
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">hola</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonInput
          label="Usuario"
          labelPlacement="floating"
          fill="solid"
          onIonInput={handle}
          name="username"
          value={body.username}
        ></IonInput>

        <br />

        <IonInput
          label="Contraseña"
          labelPlacement="floating"
          fill="outline"
          placeholder="Ingresa contraseña"
          name="password"
          value={body.password}
          onIonInput={handle}
        ></IonInput>

        <IonButton onClick={login}>Iniciar sesión</IonButton>
        <IonButton
          color="danger"
          onClick={async () => {
            await Preferences.remove({ key: "user" });
            navigate.push("/app");
          }}
        >
          Cerrar sesion
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
