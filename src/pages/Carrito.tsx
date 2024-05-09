import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { Preferences } from "@capacitor/preferences";

import { FC, useState } from "react";
import useGetData from "../hooks/useGetData";
import Axios from "../Axios";

const Carrito: FC = () => {
  const [userData, setUserData] = useState<{}>({});
  const [actualizar, setActualizar] = useState<boolean>(false);
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

  console.log(data);

  return (
    <IonPage>
      <IonContent>
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
      </IonContent>
    </IonPage>
  );
};
export default Carrito;
