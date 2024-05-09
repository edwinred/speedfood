import React, { FC } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonNav,
  IonButton,
} from "@ionic/react";

const Trjetas: FC<{
  data: {
    nombredelatienda: string;
    tiempodepreparacion: string;
    distancia: string;
    idtiendas: number;
    imagen: string;
  };
}> = ({ data }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>{data.distancia} metros</IonCardSubtitle>
        <IonCardTitle>{data.nombredelatienda}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={data.imagen}
          style={{ width: "300px", height: "300px", objectFit: "cover" }}
        />
        Tiempo de preparacion {data.tiempodepreparacion} min.
        <IonButton routerLink={`/app/detalles/${data.idtiendas}`}>
          Ver plati
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default Trjetas;
