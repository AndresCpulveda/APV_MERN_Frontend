import { useState } from "react";
import {Link, useNavigate} from "react-router-dom" //Importamos Link que permite navegar hacia otras paginas en el navegador igual que un elemento <a>
import Alerta from '../components/Alerta' //Importamos el componente de alerta
import clienteAxios from "../../config/axios"; //Importamos la funcion de cliente axios para poder hacer peticiones al servidor
import useAuth from "../hooks/useAuth";

function Login() {

  const [alerta, setAlerta] = useState({}) //State que controla la alerta mostrada 
  const [email, setEmail] = useState('') //State que controla el valor ingresado en el input de email
  const [password, setPassword] = useState('') //State que controla el valor ingresado en el input de password

  const {setAuth} = useAuth();

  const navigate = useNavigate() //Usamos el hook de navigate

  const handleSubmit = async (e) => {
    e.preventDefault()

    if([email, password].includes('')) { //Validamos si hay campos vacios y mostramos alerta de error
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      })
      return
    }

    try { //Hacemos la peticion de post para autenticar al usuario mediante axios
      const {data} = await clienteAxios.post('/veterinarios/login', {email, password})
      localStorage.setItem('token', data.token) //Guardamos en local storage el token de respuesta del servidor
      setAuth(data)
      setAlerta({ //Se muestra una alerta de acceso
        msg: 'Acceso concedido',
        error: false
      })
      setTimeout(() => {
        navigate('/admin')//Se redirecciona a la pagina de admin
      }, 1500);
    } catch (error) { //Si no pasa la autenticación se muestra un error en pantalla
      console.log(error)
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  return (
    <>
      <div>
        <h1
          className="text-indigo-600 font-black text-5xl">Inicia Sesión y Administra tus
          <span className="text-black"> Pacientes</span>
        </h1>
      </div>
      <div className="shadow-lg px-8 py-10 rounded-xl bg-white">
      {/* Componente de alerta dinamico */}
        {alerta.msg && <Alerta 
          alerta={alerta}
        />}
        <form onSubmit={handleSubmit}>
          <div className="mt-10">
            <label className="block uppercase text-gray-700 font-bold text-xl">
              email
            </label>
            <input
              type="email"
              value={email}
              onChange={ e => {setEmail(e.target.value)}}
              placeholder="Tu email de registro"
              className="bg-gray-200 rounded-lg p-2 w-full mt-1" />
          </div>
          <div className="mt-5">
            <label className="block uppercase text-gray-700 font-bold text-xl">
              contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={ e => {setPassword(e.target.value)}}
              placeholder="Tu contraseña"
              className="bg-gray-200 rounded-lg p-2 w-full mt-1" />
          </div>
          <input
            type="submit"
            value="Iniciar Sesion"
            className="bg-indigo-700 text-white font-bold uppercase mt-4 rounded p-3 w-full md:w-auto cursor-pointer hover:bg-indigo-800 transition-all" />
        </form>
        <nav className="lg:flex lg:justify-between mt-8">
          <p className="text-gray-400 my-4 block text-center">¿Aun no tienes una cuenta?
            <Link
              to="/registrar"
              className="text-gray-500 hover:text-gray-600 transition-all"> Regístrate aquí
            </Link>
          </p>
          <Link
            to="/olvide-password"
            className="text-gray-400 hover:text-gray-600 my-4 block text-center transition-all">Olvidé mi contraseña
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Login