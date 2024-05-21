import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab2.css";
import Tarjetatiendas from "../components/Tarjetastiendas";
import { trashBin } from "ionicons/icons";
import useGetData from "../hooks/useGetData";
import Trjetas from "../components/Trjetas";
import { useState } from "react";

const Tab2: React.FC = () => {
  const {
    data,
    isPending,
    error,
  }: { data: any; isPending: boolean; error: boolean } =
    useGetData("/tienda/obtener");
  console.log(data);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buscar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>

        {!isPending && <Success data={data.response} />}
      </IonContent>
    </IonPage>
  );
};

const Success: React.FC<{
  data: {
    nombredelatienda: string;
    tiempodepreparacion: string;
    distancia: string;
    idtiendas: number;
  }[];
}> = ({ data }) => {
  const [filtered, setfiltered] = useState<
    {
      nombredelatienda: string;
      tiempodepreparacion: string;
      distancia: string;
      idtiendas: number;
    }[]
  >(data);
  console.log(filtered);

  return (
    <>
      <IonSearchbar
        showClearButton="focus"
        placeholder="Buscar Tiendas"
        onIonInput={(e) => {
          const regExp = new RegExp(`${e.target.value}`, "gi");
          const filteredData = filtered.filter((el) =>
            regExp.test(el.nombredelatienda)
          );
          if (filteredData.length === 0) {
            setfiltered((prev) => (prev = data));
          } else {
            setfiltered(filteredData);
          }
        }}
      ></IonSearchbar>

      {filtered.map((el) => (
        <Trjetas data={el} />
      ))}
    </>
  );
};

export default Tab2;
