import { useContext } from "react"; //Importamos el hook de useContext para pasar datos entre todos los niveles de los componentes
import AuthContext from "../context/AuthProvider"; //Importamos el context de autenticacion

function useAuth() { //Hook que usa el contexto de autenticacion
  return (
    useContext(AuthContext)
  )
}

export default useAuth