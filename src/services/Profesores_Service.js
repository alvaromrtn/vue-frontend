import axios from "axios";

const PROFESORES_API = "http://localhost:8080/api/profesores";

const PROFESORES_ASIGNATURA_API =
  "http://localhost:8080/api/profesoresAsignatura";

const PROFESOR_NOMBRE_API = "http://localhost:8080/api/profesorNombre";

class Profesores_Service {
  getProfesores() {
    return axios.get(PROFESORES_API);
  }
  getProfesoresAsignatura(id) {
    let data = { codigo: id };

    return axios.post(PROFESORES_ASIGNATURA_API, data);
  }
  getProfesorNombre(columna_profesor) {
    let data = { columna: columna_profesor };

    return axios.post(PROFESOR_NOMBRE_API, data);
  }
}

export default new Profesores_Service();
