import {createContext, useState, useEffect} from "react"
import clienteAxios from "../../config/axios"

const PacientesContext = createContext() //Creamos un cotext para poder usarlo en todos los niveles de la app

export function PacientesProvider({children}) { //Creamos una funcion provider donde se crearan todas las variables y funciones del context

  useEffect( () => { //Use effect que obtiene de la base de datos todos los pacientes del veterinario que accedió
    console.log('desde effect');
    const obtenerPacientes = async () => {
      const token = localStorage.getItem('token') //Obtenemos el token del local storage

      if(!token) { //Si no se obtiene token se envia mensaje a consola y se sale de la funcion
        console.log('no hay token, inicia sesion');
        return
      }
      //Si si hay token se continua
      const config = { //Se crea un objeto de config con las especificaciones necesarias para enviar la authorization al backend mediante axios
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` //En authorization incluimos nuestro token seguido de la palabra Bearer para que el backend lo valide
        }
      }
      try {
        const {data} = await clienteAxios('/pacientes', config) //Enviamos mediante axios la peticion al backend, por defecto es de tipo get
        setPacientes(data, ...pacientes) //Se obtiene los datos y se agregan al state de pacientes
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
    obtenerPacientes() //Importante llamar a la funcion justo despues de instanciarla para que el useEffect funcione correctamente
  }, [])

  const [pacientes, setPacientes] = useState([]) //State que contendrá todos los pacientes del veterinario
  const [paciente, setPaciente] = useState({}) //State que contendrá un solo paciente cuando se requiera

  const guardarPaciente = async (paciente) => { //Guarda o actualiza un paciente dado, en la base de datos

    const token = localStorage.getItem('token')
    if(!token) {
      console.log('error, no token');
      return
    }
    const config = { //Se crea el objeto de config que contendra el Bearer token como authorization en el header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    if(paciente.id) { //Si el paciente dado tiene una propiedad id, se entiende que es un paciente existente y para editar
      try {
        const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config) //Se hace la peticion de tipo put para editar el paciente en la DB
        const pacientesUpdated = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState) //Se usa un map para cambiar el array en el state de pacientes y reemplazar el paciente anterior por el nuevo editado
        setPacientes(pacientesUpdated) //Se setea el state con el nuevo array
      } catch (error) {
        console.log(error.response.data.msg);
      }
    } else { //Si el paciente dado no tiene una propiedad id se entiende que es un paciente nuevo por agregar
      try {
        const {data} = await clienteAxios.post('/pacientes', paciente, config) //Se hace la peticion de post para agregar el nuevo paciente a la base de datos
        const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data; //Este codigo crea un nuevo objeto (pacienteAlmacenado) pero excluyendo los valores escritos antes de este
        setPacientes([pacienteAlmacenado, ...pacientes]) //Se agrega el paciente almacenado al ya existente array de pacientes
      } catch (error) {
        console.log(error);
      }
    }

  }

  const setEdicion = async (paciente) => { //Cuando se esta editando un paciente, el objeto de este se agrega a un state paciente para poder ser usado en el componente de formulario
    setPaciente(paciente)
  }

  const setBorrar = async (paciente) => { //Obtiene el paciente a borrar y hace la peticion a la DB
    const confirmar = confirm('¿Estas seguro de querer eliminar este paciente?')//Incluimos un confirm como verificacion antes de eliminar el paciente
    if(confirmar) { //Si el usuario confirma se borra de la DB
      const token = localStorage.getItem('token')
      if(!token) {
        console.log('error, no token');
        return
      }
      const config = { //Se crea el objeto de config que contendra el Bearer token como authorization en el header
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const {data} = await clienteAxios.delete(`pacientes/${paciente._id}`, config) //Se hace la peticion de delete incluyedo el id del paciente y la authorization
        const pacientesUpdated = pacientes.filter( pacienteState => pacienteState._id !== paciente._id) //Se filtra el state de los pacientes para excluir el paciente recien eliminado
        setPacientes(pacientesUpdated)
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  }

  return (
    // Retornamos el context provider junto con todas las variables y funciones que queremos utilizar en los demas componentes
    <PacientesContext.Provider
      value={{
        paciente,
        pacientes,
        guardarPaciente,
        setEdicion,
        setBorrar,
      }}
    >
      {children}
    </PacientesContext.Provider>
  )
}

export default PacientesContext