import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { Preferences } from "@capacitor/preferences";

import React, { FC, useState } from "react";
import useGetData from "../hooks/useGetData";
import Axios, { urlMain } from "../Axios";
import { Link } from "react-router-dom";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PGTA0P3QrwGa9Cf51I4hbsk6MmeUmXeHmlIeZdPAQsbcXMVWJycy7I9PGW8zQN8o82Y8KLUku0qQoafm7SjaJTt00IA403qnv"
);

const Carrito: FC = () => {
  const [userData, setUserData] = useState<{}>({});
  const [actualizar, setActualizar] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data, isPending }: { data: any; isPending: boolean } = useGetData(
    "/carrito/obtener",
    actualizar
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

  const total =
    !isPending &&
    data.response
      .map(
        (el: { cantidad: number; platillos: { costo: string } }) =>
          el.cantidad * Number(el.platillos.costo)
      )
      .reduce((a: number, b: number) => a + b, 0);

  const fetchClientSecret = React.useCallback(async () => {
    // Create a Checkout Session
    return fetch(`${urlMain}/api/pagos/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ monto: total }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [modalOpen]);

  const options = { fetchClientSecret };

  const deleteElem = async (id: number) => {
    try {
      const { value } = await Preferences.get({ key: "user" });
      await Axios.delete(`/carrito/eliminar/${id}`, {
        headers: {
          Authorization: JSON.parse(String(value)).data.token,
        },
      });
      console.log("eliminado");
      setActualizar(!actualizar);
    } catch (error) {}
  };

  return (
    <IonPage>
      <IonContent>
        <IonModal isOpen={modalOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Realizar pago</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setModalOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div id="checkout">
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ ...options }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          </IonContent>
        </IonModal>
        {!isPending && (
          <IonList>
            {data.response?.map((el: any) => (
              <IonItem>
                <img
                  src={el.platillos.imagen}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <IonLabel>
                  {el.platillos.nombre} X <b>{el.cantidad}</b>
                </IonLabel>
                <i>{el.platillos.descripcion}</i>
                {userData && userData.hasOwnProperty("data") && (
                  <IonButton
                    color="danger"
                    size="small"
                    onClick={() => deleteElem(el.idcarrito)}
                  >
                    Eliminar
                  </IonButton>
                )}
              </IonItem>
            ))}
          </IonList>
        )}
        <IonButton onClick={() => setModalOpen(true)} expand="block">
          Pagar ${total}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
export default Carrito;
