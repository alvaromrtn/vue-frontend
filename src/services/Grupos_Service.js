import axios from "axios";

const GRUPOS_TEORIA_API_BASE_URL = "http://localhost:8080/api/gruposTeoria";
const GRUPOS_PRACTICA_API_BASE_URL = "http://localhost:8080/api/gruposPractica";

class Grupos_Service {
  getGruposTeoria(codigo) {
    let data = { codigo: codigo };

    return axios.post(GRUPOS_TEORIA_API_BASE_URL, data);
  }

  getGruposPractica(codigo) {
    let data = { codigo: codigo };

    return axios.post(GRUPOS_PRACTICA_API_BASE_URL, data);
  }
}

export default new Grupos_Service();
