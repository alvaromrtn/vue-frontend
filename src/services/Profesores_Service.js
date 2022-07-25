import axios from "axios";

const HTTP = "http://";
const IP = "localhost";
const PUERTO = ":8080";

const PROFESORES_API = "/api/profesores";
const PROFESORES_ASIGNATURA_API = "/api/profesoresAsignatura";
const PROFESOR_NOMBRE_API = "/api/profesorNombre";

class Profesores_Service {
  getProfesores() {
    return axios.get(HTTP + IP + PUERTO + PROFESORES_API);
  }
  getProfesoresAsignatura(id) {
    let data = { codigo: id };

    return axios.post(HTTP + IP + PUERTO + PROFESORES_ASIGNATURA_API, data);
  }
  getProfesorNombre(columna_profesor) {
    let data = { columna: columna_profesor };

    return axios.post(HTTP + IP + PUERTO + PROFESOR_NOMBRE_API, data);
  }
}

export default new Profesores_Service();
