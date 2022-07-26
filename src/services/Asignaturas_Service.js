import axios from "axios";

const HTTP = "http://";
const IP = "localhost";
const PUERTO = ":8080";

const ASIGNATURAS_TITULACION_API = "/api/asignaturasTitulacion";
const ASIGNATURAS_API = "/api/asignaturas";
const ASIGNATURAS_PROFESOR_API = "/api/asignaturasProfesor";
const ASIGNATURA_NOMBRE_API = "/api/asignaturaNombre";

class Asignaturas_Service {
  getAsignaturasTitulacion(codigo_titulacion) {
    let data = { codigo: codigo_titulacion };

    return axios.post(HTTP + IP + PUERTO + ASIGNATURAS_TITULACION_API, data);
  }
  getAsignaturas() {
    return axios.get(HTTP + IP + PUERTO + ASIGNATURAS_API);
  }
  getAsignaturasProfesor(columna_profesor) {
    let data = { columna: columna_profesor };

    return axios.post(HTTP + IP + PUERTO + ASIGNATURAS_PROFESOR_API, data);
  }
  getAsignaturaNombre(id) {
    let data = { codigo: id };

    return axios.post(HTTP + IP + PUERTO + ASIGNATURA_NOMBRE_API, data);
  }
}

export default new Asignaturas_Service();
