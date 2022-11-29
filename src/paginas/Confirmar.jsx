import {useEffect, useState} from "react"
import {useParams, Link} from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/axios.jsx";

function Confirmar() {
  const params = useParams() //Empleamos useParams para extraer los parametros presentes en la url
  const {id} = params; //Hacemos destructuring de la variable de id en los parametros
  const [confirmada, setConfirmada] = useState(false) //State que controla si la cuenta fue confirmada
  const [cargando, setCargando] = useState(false) //State que controla si la app esta cargando 
  const [alerta, setAlerta] = useState({}) //State que controla la alerta

  useEffect(() => { //Use effect para ejecutar este codigo solo 1 vez al renderizar el componente
    const confirmarCuenta = async () => { //Confirma la cuenta previamente creada
      try {
        const url = `/veterinarios/confirmar/${id}` //Construimos el url de la peticion con el id de la url
        const {data} = await clienteAxios(url) //Hacemos la peticion al servidor por medio de axios
        setConfirmada(true) //La cuenta fue confirmada
        setAlerta({ //Mostramos alerta con mensaje de confirmacion desde el servidor
          msg: data.msg,
          error: false
        })
      } catch (error) {
        setAlerta({ //Si hay algun error mostramos mensaje de error del servidor
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta(); //Llamamos la funcion dentro del effect para que se ejecute al renderizar la app
  }, [])

  return (
    <>
      <div>
        <h1
          className="text-indigo-600 font-black text-5xl">Crea tu Cuenta y Administra tus
          <span className="text-black"> Pacientes</span>
        </h1>
      </div>
      <div className="shadow-lg px-8 py-10 rounded-xl bg-white">
        {/* Componente dinamico que muestra alerta cuando no este cargando */}
        {!cargando && 
          <Alerta 
            alerta={alerta}
          />
        }
        {/* Componente dinamico que muestra alerta cuando se haya confirmado la cuenta */}
        {confirmada && (
            <Link
              to="/"
              className="text-gray-500 mt-5 hover:text-gray-600 text-center block transition-all"> Inicia Sesion
            </Link>
        )}
      </div>
    </>
  )
}

export default Confirmar