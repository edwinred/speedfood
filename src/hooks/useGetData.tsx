import { useState, useEffect } from "react";
import Axios from "../Axios";
//Es un cambio
function useGetData(url: string, actualizador: boolean = false) {
  const [data, setData] = useState<{}>({});
  const [error, setError] = useState<boolean>(true);
  const [dataError, setDataError] = useState<{}>({});
  const [isPending, setIsPending] = useState<boolean>(true);

  useEffect(() => {
    consultar(url)
      .then((res) => {
        const { success, response } = res;
        if (success && response.length === 0) {
          setData(res);
          setIsPending(false);
          setError(true);
        } else {
          setData(res);
          setIsPending(false);
          setError(false);
        }
      })
      .catch((err) => {
        setDataError(err.data);
        setError(true);
        setIsPending(false);
      });
  }, [url, actualizador /* , stateAuth */]);

  return { data, error, dataError, isPending };
}

export default useGetData;

const consultar = async (url: string) => {
  try {
    const response = await Axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
