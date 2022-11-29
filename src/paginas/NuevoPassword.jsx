import {useState, useEffect} from "react"
import clienteAxios from "../../config/axios"
import Alerta from '../components/Alerta'
import {useParams, Link} from 'react-router-dom'

function NuevoPassword() { //Componente para crear el nuevo password cuando se ha olvidado
  const [alerta, setAlerta] = useState({}) //State de la alerta
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [tokenValid, setTokenValid] = useState(false) //State que controla si el token del enlace es valido
  const [passwordModificado, setPasswordModificado] = useState(false) //State que controla si el password fue modificado

  const params = useParams() //Empleamos useParams para extraer los parametros presentes en la url
  const {token} = params; //Hacemos destructuring de la variable de id en los parametros

  useEffect(() => { //Use effect para ejecutar este codigo solo 1 vez al renderizar el componente
    const comprobarToken = async () => { //Comprueba que el token si exista en alguno de los usuarios en la base de datos
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`) //Hacemos la peticion mediante axios a la url de la api incluyendo el token del enlace
        setAlerta({msg: 'Coloca tu nuevo password'}) //Si el token es valid se muestra una alerta de instruccion
        setTokenValid(true) //Se cambia el state de token valid
      } catch (error) {
        setAlerta({ //Si hay algun error mostramos mensaje de error del servidor
          msg: 'Hubo un error con el enlace',
          error: true,
        })
        return
      }
    }
    comprobarToken(); //Llamamos la funcion dentro del effect para que se ejecute al renderizar la app
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();

    if(password === '' || password.length < 8) { //Validamos que el password no este vacio y que sea mas largo de 8 caracteres
      setAlerta({
        msg: 'Tu contraseña debe tener al menos 8 caracteres',
        error: true,
      })
      return
    }
    if(password !== repetirPassword) { //Validamos si las passwords coinciden
      setAlerta({
        msg: 'Las contraseñas no coinciden',
        error: true,
      })
      return
    }

    try {
      const url = `/veterinarios/olvide-password/${token}` //Construimos la url para hacer la peticion a la api e incluimos el token
      const {data} = await clienteAxios.post(url, {password}) //Hacemos la peticion al servidor por medio de axios
      setAlerta({
        msg: data.msg,
        error: false,
      })
      setPasswordModificado(true) //Cambiamos el state de password modificado a true
    } catch (error) { //Si hay algun error mostramos mensaje de error del servidor
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
        className="text-indigo-600 font-black text-5xl">Restablece tu contraseña y sigue Administrando tus
        <span className="text-black"> Pacientes</span>
      </h1>
    </div>
    <div className="shadow-lg px-8 py-10 rounded-xl bg-white">
      {alerta.msg && <Alerta 
        alerta={alerta}
      />}
      {tokenValid && (
        <>
        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <label className="block uppercase text-gray-700 font-bold text-xl">
              Nueva contraseña
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
            value="Restablecer"
            className="bg-indigo-700 text-white font-bold uppercase mt-8 rounded p-2 w-full md:w-auto cursor-pointer hover:bg-indigo-800 transition-all" />
        </form>
        </>
      )}
      {/* Componente dinamico que muestra un Link cuando la constraseña haya cambiado correctamente*/}
      {passwordModificado && 
      <Link
          to="/"
          className="text-gray-500 hover:text-gray-600 text-center mt-5 font-bold block transition-all">
        Inicia Sesion</Link>}
    </div>
  </>
  )
}

export default NuevoPassword