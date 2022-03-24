import axios from "axios";

const ASIGNATURAS_API_BASE_URL = "http://localhost:8080/api/asignaturas";

class Asignaturas_Service {
  getAsignaturas(codigo_titulacion) {
    let data = { codigo: codigo_titulacion };

    return axios.post(ASIGNATURAS_API_BASE_URL, data);
  }
}

export default new Asignaturas_Service();
