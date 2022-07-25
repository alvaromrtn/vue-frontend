import axios from "axios";

const HTTP = "http://";
const IP = "localhost";
const PUERTO = ":8080";

const GRUPOS_TEORIA_API = "/api/gruposTeoria";
const GRUPOS_PRACTICA_API = "/api/gruposPractica";

class Grupos_Service {
  getGruposTeoria(codigo_asignatura) {
    let data = { codigo: codigo_asignatura };

    return axios.post(HTTP + IP + PUERTO + GRUPOS_TEORIA_API, data);
  }

  getGruposPractica(codigo_asignatura) {
    let data = { codigo: codigo_asignatura };

    return axios.post(HTTP + IP + PUERTO + GRUPOS_PRACTICA_API, data);
  }
}

export default new Grupos_Service();
