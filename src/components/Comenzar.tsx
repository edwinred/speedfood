import { IonButton, useIonRouter, useIonViewWillEnter } from "@ionic/react";
import Logo from "../assets/img/Logo.jpg";
import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";

function Comenzar({ titulo }: { titulo: string | null }) {
  const navigate = useIonRouter();

  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { value } = await Preferences.get({ key: "user" });

    if (value) {
      navigate.push("/app/tab1");
    }
  };

  return (
    <center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <img src={Logo} />
      <IonButton routerLink="/app" size="large" color="tertiary">
        Comenzar a Explorar
      </IonButton>
    </center>
  );
}

export default Comenzar;
