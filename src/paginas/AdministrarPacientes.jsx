import {useState} from "react"
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes"

function AdministrarPacientes() {

  const [mostrarForm, setMostrarForm] = useState(false) //State para controlar si se muestra el form en pantallas pequeñas

  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="submit"
        id="btnAñadirPaciente"
        onClick={() => {setMostrarForm(!mostrarForm)}}
        className="bg-indigo-600 text-white text-sm rounded p-2 font-bold mx-3 my-5 uppercase md:hidden"
        // Se cambia dinamicamente el texto del boton segun el state, el boton solo se muestra en pantallas sm
      >{mostrarForm ? "ocultar formulario" : "mostrar formulario"}</button>
      {/* El Form no se muestra por defecto en pantallas pequeñas */}
      <div className={`${mostrarForm ? "block" : "hidden md:block"} md:w-1/2 lg:w-2/5`}>
        <Formulario />
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes />
      </div>
    </div>
  )
}

export default AdministrarPacientes