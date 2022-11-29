import {useState} from "react"
import {Link} from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../../config/axios.jsx"

function Registrar() {

  const [nombre, setNombre] = useState('') //State que controla el valor ingresado en el input de nombre
  const [email, setEmail] = useState('') //State que controla el valor ingresado en el input de email
  const [password, setPassword] = useState('') //State que controla el valor ingresado en el input de password
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({}) //State que controla la alerta mostrada 

  const handleSubmit = async (e) => {
    e.preventDefault()
    if ([nombre, email, password, repetirPassword].includes('')) { //Validamos si hay campos vacios y mostramos alerta de error
      setAlerta({msg: 'Hay campos vacios', error: true})
      return
    }
    if (password !== repetirPassword) { //Validamos que las contraseñas coincidan
      setAlerta({msg: 'Las contraseñas no coinciden', error: true})
      return
    }
    if(password.length < 6) { //Validamos que la contraseña se mayor a 5 caracteres
      setAlerta({msg: 'La contraseña debe tener al menos 6 caracteres', error: true})
      return
    }
    setAlerta({}) //Si todas las validaciones se pasan, se borra la alerta de la interfaz
    //Crear usuario
    try {
      await clienteAxios.post(`/veterinarios`, {nombre, email, password}) //Hacemos la peticion de post para autenticar al usuario mediante axios
      setAlerta({
        msg: 'Creado correctamente, revisa tu email',
        error: false
      })
    } catch (error) { //Si hay un error en el servidor se muestra el error retornado en una alerta
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <>
      <div>
        <h1
          className="text-indigo-600 font-black text-5xl">Crea tu Cuenta y Administra tus
          <span className="text-black"> Pacientes</span>
        </h1>
      </div>
      <div className="shadow-lg px-8 py-10 rounded-xl bg-white">
        {alerta.msg && <Alerta 
          alerta={alerta}
        />}
        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <label className="block uppercase text-gray-700 font-bold text-xl">
              nombre
            </label>
            <input
              value={nombre}
              onChange={(e) => { setNombre(e.target.value) } }
              type="text"
              placeholder="Tu nombre"
              className="bg-gray-200 rounded-lg p-2 w-full mt-1" />
          </div>
          <div className="mt-6">
            <label className="block uppercase text-gray-700 font-bold text-xl">
              email
            </label>
            <input
              value={email}
              onChange={(e) => { setEmail(e.target.value) } }
              type="email"
              placeholder="Tu email de registro"
              className="bg-gray-200 rounded-lg p-2 w-full mt-1" />
          </div>
          <div className="mt-6">
            <label className="block uppercase text-gray-700 font-bold text-xl">
              contraseña
            </label>
            <input
              value={password}
              onChange={(e) => { setPassword(e.target.value) } }
              type="password"
              placeholder="Tu contraseña"
              className="bg-gray-200 rounded-lg p-2 w-full mt-1" />
          </div>
          <div className="mt-6">
            <label className="block uppercase text-gray-700 font-bold text-xl">
              Repite contraseña
            </label>
            <input
              value={repetirPassword}
              onChange={(e) => { setRepetirPassword(e.target.value) } }
              type="password"
              placeholder="Repite tu contraseña"
              className="bg-gray-200 rounded-lg p-2 w-full mt-1" />
          </div>

          <input
            type="submit"
            value="Registrarme"
            className="bg-indigo-700 text-white font-bold uppercase mt-8 rounded p-2 w-full md:w-auto cursor-pointer hover:bg-indigo-800 transition-all" />
        </form>
        <nav className="lg:flex lg:justify-between mt-8">
          <p className="text-gray-400 my-4 block text-center">¿Ya tienes una cuenta?
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-600 transition-all"> Inicia Sesion
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

export default Registrar