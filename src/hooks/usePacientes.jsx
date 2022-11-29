import { useContext } from "react"; //Importamos el hook de useContext para pasar datos entre todos los niveles de los componentes
import PacientesContext from "../context/PacientesProvider"; //Importamos el context de pacientes

function usePacientes() { //Hook que usa el contexto de pacientes
  return (
    useContext(PacientesContext)
  )
}

export default usePacientes