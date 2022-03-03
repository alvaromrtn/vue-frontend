import axios from 'axios'

const TITULACION_API_BASE_URL = 'http://localhost:8080/api/titulaciones'

class Titulacion_Service {
    getTitulaciones() {
        return axios.get(TITULACION_API_BASE_URL);
    }
}

export default new Titulacion_Service()