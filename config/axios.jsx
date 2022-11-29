import axios from 'axios' //Axios permite realizar peticiones http al servidor desde nuestros componentes en el frontend

const clienteAxios = axios.create({ //Creamos la constante de cliente axios con la url base de las peticiones (la url esta guardada como variable de entorno)
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default clienteAxios