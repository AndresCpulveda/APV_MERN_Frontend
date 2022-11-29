import { useState } from "react"
import Alerta from "../components/Alerta"
import {Link} from "react-router-dom"
import clienteAxios from "../../config/axios"

function OlvidePassword() {
  const [email, setEmail] = useState('')  
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    if(email === '' || email.length < 7) { //Validamos que el email no este vacio y que sea mas largo de 6 caracteres
      setAlerta({msg: 'Ingresa un email valido', error: true})
      return
    }
    try {
      const {data} = await clienteAxios.post('/veterinarios/olvide-password/', {email}) //Hacemos la peticion al servidor por medio de axios
      setAlerta({msg: data.msg}) //Mostramos el mensaje de confirmacion que retorna el servidor
    } catch (error) { //Si hay algun error mostramos mensaje de error del servidor
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
          className="text-indigo-600 font-black text-5xl">Restablece tu contraseña y recupera
          <span className="text-black"> Tus pacientes</span>
        </h1>
      </div>
      <div className="shadow-lg px-8 py-10 rounded-xl bg-white">
        {alerta.msg && 
          <Alerta alerta={alerta}
        />}
        <form onSubmit={handleSubmit}>
          <div className="mt-10">
            <label className="block uppercase text-gray-700 font-bold text-xl">
              email
            </label>
            <input
              value={email}
              onChange={e => {setEmail(e.target.value)}}
              type="email"
              placeholder="Tu email de registro"
              className="bg-gray-200 rounded-lg p-2 w-full mt-1" />
          </div>
          <input
            type="submit"
            value="Enviar instrucciones"
            className="bg-indigo-700 text-white font-bold uppercase mt-8 rounded p-3 w-full md:w-auto cursor-pointer hover:bg-indigo-800 transition-all" />
        </form>
        <nav className="lg:flex lg:justify-between mt-8">
          <p className="text-gray-400 my-4 block text-center">¿Aun no tienes una cuenta?
            <Link
              to="/registrar"
              className="text-gray-500 hover:text-gray-600 transition-all"> Regístrate aquí
            </Link>
          </p>
        </nav>

      </div>
    </>
  )
}

export default OlvidePassword