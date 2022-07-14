import axios from "axios";

const ASIGNATURAS_TITULACION_API =
  "http://localhost:8080/api/asignaturasTitulacion";

const ASIGNATURAS_API = "http://localhost:8080/api/asignaturas";

const ASIGNATURASPROFESOREXCEL_API_BASE_URL =
  "http://localhost:8080/api/asignaturasProfesor_excel";

class Asignaturas_Service {
  getAsignaturasTitulacion(codigo_titulacion) {
    let data = { codigo: codigo_titulacion };

    return axios.post(ASIGNATURAS_TITULACION_API, data);
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
