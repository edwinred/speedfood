import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import Trjetas from "../components/Trjetas";
import Axios from "../Axios";
import { useEffect, useState } from "react";
import useGetData from "../hooks/useGetData";

const Tab1: React.FC = () => {
  const [actualizador, setActualizador] = useState<boolean>(false);
  const {
    data,
    isPending,
    error,
  }: { data: any; isPending: boolean; error: boolean } = useGetData(
    "/tienda/obtener",
    actualizador
  );

  useIonViewWillEnter(() => {
    setActualizador(!actualizador);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!isPending && data.response.map((el: any) => <Trjetas data={el} />)}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
