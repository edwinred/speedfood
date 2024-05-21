import Axios from "axios";

//export const urlMain = "http://localhost:3000";
//export const urlMain = "http://192.168.1.76:3000";
export const urlMain = "https://experienced-lea-speedfood-8a57717f.koyeb.app";
export const multipartHeader = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};
// const token = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user")).token
//   : null;

export default Axios.create({
  baseURL: urlMain + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  // validateStatus: function (status) {
  //   console.log({ status });
  //   if (status === 403) {
  //     window.location.href = "/login";
  //     localStorage.removeItem("user");
  //   }

  //   return status >= 200 && status < 300;
  // },
});
