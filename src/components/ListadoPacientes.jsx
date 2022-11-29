import {useEffect} from "react"
import usePacientes from "../hooks/usePacientes"
import Alerta from "./Alerta";
import Paciente from "./Paciente";

function ListadoPacientes() {
  const {pacientes} = usePacientes(); //Importamos la lista de pacientes desde el context
  return (
    <>
      <div>
      {/* Titulo dinamico dependiendo de si hay pacientes en el state o no */}
        {!pacientes.length ? <h2 className="font-bold text-lg mb-3 text-indigo-900 text-center">Aquí aparecerán tus pacientes</h2> : (
          <>
            <h2 className="font-bold text-lg text-indigo-900 mb-3 text-center">Administra tus Pacientes de Veterinaria</h2>
          </>
        )}
      </div>
      {/* Usamos map para indexar un componente <Paciente para cada paciente con sus respectivos datos */}
      {pacientes.map( paciente => (
        <Paciente 
          key={paciente._id} //Pasamos un key para evitar errores con React
          paciente={paciente} //Pasamos el objeto de paciente para usar los datos
        />
      ))}
    </>
  )
}

export default ListadoPacientes