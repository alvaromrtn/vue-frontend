import axios from "axios";

const ASIGNATURAS_TITULACION_API =
  "http://localhost:8080/api/asignaturasTitulacion";

const ASIGNATURAS_API = "http://localhost:8080/api/asignaturas";

const ASIGNATURAS_PROFESOR_API =
  "http://localhost:8080/api/asignaturasProfesor";

class Asignaturas_Service {
  getAsignaturasTitulacion(codigo_titulacion) {
    let data = { codigo: codigo_titulacion };

    return axios.post(ASIGNATURAS_TITULACION_API, data);
  }
  getAsignaturas() {
    return axios.get(ASIGNATURAS_API);
  }
  getAsignaturasProfesor(columna_profesor) {
    let data = { columna: columna_profesor };

    return axios.post(ASIGNATURAS_PROFESOR_API, data);
  }
}

export default new Asignaturas_Service();
