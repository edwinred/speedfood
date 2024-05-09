import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

function Tarjetastiendas({ Nombre_Tienda }: { Nombre_Tienda: string | null }) {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{Nombre_Tienda}</IonCardTitle>
        <IonCardSubtitle>$15.99</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent></IonCardContent>
    </IonCard>
  );
}

export default Tarjetastiendas;
