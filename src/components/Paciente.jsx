import React from "react"
import usePacientes from "../hooks/usePacientes";

function Paciente({paciente}) {

  const {nombre, email, propietario, fecha, sintomas} = paciente; //Se extraen las propiedades del objeto de paciente dado

  const {setEdicion, setBorrar} = usePacientes(); //Traemos las funciones de borrar y editar mediante el context

  const formatearFecha = (fecha) => { //Formateamos la fecha para mostrarla en un formato mas legible
    const nuevaFecha = new Date(fecha)
    return new Intl.DateTimeFormat('es-MX', {dataStyle: 'long'}).format(nuevaFecha)
  }

  return (
    <div className="bg-white p-5 mx-5 rounded shadow-lg mb-5">
      <p className="uppercase font-bold text-indigo-900 text-sm mb-1">nombre:{' '} 
        <span className="font-normal normal-case text-gray-800">{nombre}</span>
      </p>
      <p className="uppercase font-bold text-indigo-900 text-sm mb-1">propietario:{' '} 
        <span className="font-normal normal-case text-gray-800">{propietario}</span>
      </p>
      <p className="uppercase font-bold text-indigo-900 text-sm mb-1">email:{' '} 
        <span className="font-normal normal-case text-gray-800">{email}</span>
      </p>
      <p className="uppercase font-bold text-indigo-900 text-sm mb-1">fecha cita:{' '} 
        <span className="font-normal normal-case text-gray-800">{formatearFecha(fecha)}</span>
      </p>
      <p className="uppercase font-bold text-indigo-900 text-sm mb-1">sintomas:{' '} 
        <span className="font-normal normal-case text-gray-800">{sintomas}</span>
      </p>
      <button 
        onClick={() => setEdicion(paciente)}
        className=" bg-indigo-700 hover:bg-white text-white hover:text-indigo-700 rounded px-2 border-4 border-indigo-700 font-bold my-2 mr-5 cursor-pointer transition-all uppercase">editar
      </button>
      <button
        onClick={() => setBorrar(paciente)}
        className=" bg-red-700 hover:bg-white text-white hover:text-red-700 rounded px-2 border-4 border-red-700 font-bold my-2 mr-5 cursor-pointer transition-all uppercase">eliminar
      </button>
    </div>
  )
}

export default Paciente