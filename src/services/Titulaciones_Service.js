import axios from "axios";

const TITULACIONES_API_BASE_URL = "http://192.168.0.24:8080/api/titulaciones";

class Titulaciones_Service {
  getTitulaciones() {
    return axios.get(TITULACIONES_API_BASE_URL);
  }
}

export default new Titulaciones_Service();
