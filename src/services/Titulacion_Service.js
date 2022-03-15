import axios from "axios";

const TITULACIONES_API_BASE_URL = "http://localhost:8080/api/titulaciones";
const ASIGNATURAS_API_BASE_URL = "http://localhost:8080/api/asignaturas";

class Titulacion_Service {
  getTitulaciones() {
    return axios.get(TITULACIONES_API_BASE_URL);
  }

  getAsignaturas(codigo) {
    let data = { codigo: codigo };

    return axios.post(ASIGNATURAS_API_BASE_URL, data);
  }
}

export default new Titulacion_Service();
