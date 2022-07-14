import axios from "axios";

const TITULACIONES_API = "http://localhost:8080/api/titulaciones";

class Titulaciones_Service {
  getTitulaciones() {
    return axios.get(TITULACIONES_API);
  }
}

export default new Titulaciones_Service();
