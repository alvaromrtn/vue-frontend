import axios from "axios";

const PROFESOR_API_BASE_URL = "http://192.168.0.24:8080/api/profesores";

class Profesor_Service {
  getProfesores() {
    return axios.get(PROFESOR_API_BASE_URL);
  }
}

export default new Profesor_Service();
