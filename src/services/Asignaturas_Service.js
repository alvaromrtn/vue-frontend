import axios from "axios";

const ASIGNATURAS_API_BASE_URL = "http://localhost:8080/api/asignaturas";

const ASIGNATURASEXCEL_API_BASE_URL =
  "http://localhost:8080/api/asignaturas_excel";

const ASIGNATURASPROFESOREXCEL_API_BASE_URL =
  "http://localhost:8080/api/asignaturasProfesor_excel";

class Asignaturas_Service {
  getAsignaturas(codigo_titulacion) {
    let data = { codigo: codigo_titulacion };

    return axios.post(ASIGNATURAS_API_BASE_URL, data);
  }
  getAsignaturasExcel() {
    return axios.get(ASIGNATURASEXCEL_API_BASE_URL);
  }
  getAsignaturasProfesorExcel(columna_profesor) {
    let data = { columna: columna_profesor };

    return axios.post(ASIGNATURASPROFESOREXCEL_API_BASE_URL, data);
  }
}

export default new Asignaturas_Service();
