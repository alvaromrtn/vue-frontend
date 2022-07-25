import axios from "axios";

const HTTP = "http://";
const IP = "localhost";
const PUERTO = ":8080";

const TITULACIONES_API = "/api/titulaciones";

class Titulaciones_Service {
  getTitulaciones() {
    return axios.get(HTTP + IP + PUERTO + TITULACIONES_API);
  }
}

export default new Titulaciones_Service();
