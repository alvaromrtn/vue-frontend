import axios from "axios";

const GRUPOS_TEORIA_API_BASE_URL = "http://192.168.0.24:8080/api/gruposTeoria";
const GRUPOS_PRACTICA_API_BASE_URL =
  "http://192.168.0.24:8080/api/gruposPractica";

class Grupos_Service {
  getGruposTeoria(codigo_asignatura) {
    let data = { codigo: codigo_asignatura };

    return axios.post(GRUPOS_TEORIA_API_BASE_URL, data);
  }

  getGruposPractica(codigo_asignatura) {
    let data = { codigo: codigo_asignatura };

    return axios.post(GRUPOS_PRACTICA_API_BASE_URL, data);
  }
}

export default new Grupos_Service();
