import React, { FC, useState, useEffect } from "react";

import useGetData from "../hooks/useGetData";
import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  useIonViewWillEnter,
  IonLoading,
  IonSpinner,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonTextarea,
} from "@ionic/react";
import { Preferences } from "@capacitor/preferences";
import Axios from "../Axios";
const Prueba: FC<{ match: { params: { id: string } } }> = ({ match }) => {
  const [userData, setUserData] = useState<{}>({});
  const [cantidad, setCantidad] = useState<number>(1);
  const [preferencias, setPreferencias] = useState<string | undefined | null>(
    ""
  );

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [relativeData, setRelativeData] = useState<{
    nombre?: string;
    costo?: string;
    descripcion?: string;
    idplatillos?: number;
  }>({});
  const {
    data,
    isPending,
    error,
  }: { data: any; isPending: boolean; error: boolean } = useGetData(
    `/platillo/obtener/${match.params.id}`
  );

  useIonViewWillEnter(() => {
    getUser();
  });

  const getUser = async () => {
    try {
      const user: any = await Preferences.get({ key: "user" });
      setUserData(JSON.parse(user?.value));
    } catch (error) {
      console.log(error);
    }
  };

  const addCarrito = async () => {
    try {
      const { value } = await Preferences.get({ key: "user" });

      console.log(JSON.parse(String(value)).data.token);

      await Axios.post(
        "/carrito/crear",
        {
          platillos_idplatillos: relativeData.idplatillos,
          cantidad,
          preferencias,
        },
        {
          headers: {
            Authorization: JSON.parse(String(value)).data.token,
          },
        }
      );
      console.log("añadido al carrito");
    } catch (error) {}
  };

  console.log(modalOpen, relativeData);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonButton
          color="danger"
          size="small"
          routerDirection="back"
          routerLink=".."
        >
          regresar
        </IonButton>
        {!isPending && !error && (
          <IonList>
            {data.response.map((el: any) => (
              <IonItem>
                <img
                  src={el.imagen}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <IonLabel>{el.nombre}</IonLabel>
                <i>{el.descripcion}</i>
                {userData && userData.hasOwnProperty("data") && (
                  <IonButton
                    color="warning"
                    size="small"
                    onClick={() => {
                      setRelativeData(el);
                      setModalOpen(true);
                    }}
                  >
                    Agregar a carrito
                  </IonButton>
                )}
              </IonItem>
            ))}
          </IonList>
        )}
        {!isPending && error && <p>Sin platillos</p>}
        {isPending && (
          <center>
            <IonSpinner style={{ width: "100px", height: "100px" }} />
          </center>
        )}
        <IonModal isOpen={modalOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Añadir al carro: {relativeData.nombre}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setModalOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <IonButton
                onClick={() =>
                  setCantidad((prev) => {
                    if (prev < 2) {
                      return 1;
                    }
                    return prev - 1;
                  })
                }
              >
                -
              </IonButton>
              <p>Cantidad: {cantidad}</p>
              <IonButton onClick={() => setCantidad((prev) => prev + 1)}>
                +
              </IonButton>
            </div>
            <p>Costo ${Number(relativeData.costo) * cantidad}</p>
            <i>{relativeData.descripcion}</i>
            <IonTextarea
              label="Preferencias"
              labelPlacement="floating"
              onIonInput={(e) => setPreferencias(e.target.value)}
              autoGrow
            />
            <IonButton onClick={addCarrito}>Añadir al carrio</IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Prueba;
