import axios from "axios";

const PROFESORES_API = "http://localhost:8080/api/profesores";

const PROFESOR_NOMBRE_API = "http://localhost:8080/api/profesorNombre";

class Profesores_Service {
  getProfesores() {
    return axios.get(PROFESORES_API);
  }
  getProfesorNombre(columna_profesor) {
    let data = { columna: columna_profesor };

    return axios.post(PROFESOR_NOMBRE_API, data);
  }
}

export default new Profesores_Service();
