import axios from "axios";

const ASIGNATURAS_API_BASE_URL = "http://localhost:8080/api/asignaturas_diaweb";

const ASIGNATURAS_API = "http://localhost:8080/api/asignaturas";

const ASIGNATURASPROFESOREXCEL_API_BASE_URL =
  "http://localhost:8080/api/asignaturasProfesor_excel";

class Asignaturas_Service {
  getAsignaturasDiaweb(codigo_titulacion) {
    let data = { codigo: codigo_titulacion };

    return axios.post(ASIGNATURAS_API_BASE_URL, data);
  }
  getAsignaturas() {
    return axios.get(ASIGNATURAS_API);
  }
  getAsignaturasProfesorExcel(columna_profesor) {
    let data = { columna: columna_profesor };

    return axios.post(ASIGNATURASPROFESOREXCEL_API_BASE_URL, data);
  }
}

export default new Asignaturas_Service();
