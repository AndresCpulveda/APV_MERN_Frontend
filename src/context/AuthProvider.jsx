import {useState, useEffect, createContext} from "react" //Importamos los hooks que usaremos
import {useNavigate} from "react-router-dom"
import clienteAxios from '../../config/axios' //Importamos la funcion de cliente axios para realizar peticiones al servidor

const AuthContext = createContext() //Guardamos la instancia de create context en una variable

function AuthProvider({children}) { //Funcion que autentica el usuario y retorna el context provider

  const [auth, setAuth] = useState({}) //State global que controlara si el usuario esta autenticado
  const [cargando, setCargando] = useState(true) //State global que controlara si la autenticacion esta cargando

  useEffect( () => { //Autentica el usuario en el momento en que se renderiza el componente por primera vez
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token') //Busca el token en el local storage
      if(!token) { //Si no se obtiene ningun token, el ususario no esta autenticado y se retorna de la funcion
        setCargando(false)
        return
      } 
        
      const config = { //Se crea el objeto de config que contendra el Bearer token como authorization en el header
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const {data} = await clienteAxios('/veterinarios/perfil', config) //Hacemos la peticion y pasamos el objeto de config como segundo parametro
        setAuth(data) //La respuesta del servidor se guarda en el state de Auth
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({}) //Si hay error en el servidor se reinicia el state al valor vacio
      }
      setCargando(false)
    }
    autenticarUsuario(); //Se llama la funcion dentro del effect para que se ejecute al renderizar el componente
  }, [])

  const navigate = useNavigate() //Usamos navigate para redireccionar al usuario

  const cerrarSesion =  () => {
    //Para cerrar sesion borramos el token de local storage y del state de auth, tambien redireccionamos el usuario a pagina de login
    localStorage.removeItem('token')

    setAuth({})

    navigate('/')
  }

  const actualizarPerfil = async (perfil) => { //Recibe una version editada del perfil del veterinario y envia una peticion al backend para que cambie este en la DB
    const token = localStorage.getItem('token') //Busca el token en el local storage
    if(!token) { //Si no se obtiene ningun token, el ususario no esta autenticado y se retorna de la funcion
      return
    } 
      
    const config = { //Se crea el objeto de config que contendra el Bearer token como authorization en el header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const {data} = await clienteAxios.put(`/veterinarios/perfil/${perfil._id}`, perfil, config ) //Hacemos la peticion y pasamos el objeto del perfil como segundo parametro y el objeto de config como el tercero
      setAuth(data) //Actualizamos el state de Auth con la nueva info del veterinario
      return {
        msg: 'Guardado Correctamente' //Retornamos un mensaje para ser usado en el componente Alert
      }
    } catch (error) {
      return { //Retornamos un mensaje para ser usado en el componente Alert
        msg: error.response.data.msg,
        error: true,
      }
    }
  }

  const actualizarContraseña = async (passwords) => {//Envia peticion al backend para cambiar la contraseña del veterinario 
    const token = localStorage.getItem('token') //Busca el token en el local storage
    if(!token) { //Si no se obtiene ningun token, el ususario no esta autenticado y se retorna de la funcion
      return
    } 
      
    const config = { //Se crea el objeto de config que contendra el Bearer token como authorization en el header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const {data} = await clienteAxios.put(`veterinarios/perfil/cambiar-password/${auth._id}`, passwords, config ) //Enviamos peticion put para modificar el registro, pasamos un objeto de las passwords como segundo parametro y la config como tercer parametro
      return {msg: data.msg} //Retornamos el mensaje enviado por el backend para usarlo en el componente Alert
    } catch (error) {
      console.log(error);
      return {msg: error.response.data.msg, error: true} //Retornamos el mensaje enviado por el backend para usarlo en el componente Alert
    }
  }

  return (
    //Se retorna el componente de context provider para poder pasar los values a los componentes hijos (children)
    <AuthContext.Provider 
      value={{ //Se pasan los states o demas valores del context para ser usados en los children
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        actualizarContraseña,
      }}
    >
      {/* Se pasa el prop de children para indicar que el componente contiene otros componentes */}
      {children} 
    </AuthContext.Provider>
  )
}

export {AuthProvider} //Exportamos la funcion de provider
export default AuthContext //Exportamos el context
