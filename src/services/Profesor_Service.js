import axios from "axios";

const PROFESORES_API = "http://localhost:8080/api/profesores";

class Profesor_Service {
  getProfesores() {
    return axios.get(PROFESORES_API);
  }
}

export default new Profesor_Service();
