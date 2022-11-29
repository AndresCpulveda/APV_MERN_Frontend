import {useState} from "react"
function Alerta({alerta}) {//Recibe un mensaje y estado de error como props y muestra un contenedor con estilos dinamicos segun el estado de error
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-br text-white font-bold p-2 rounded text-center`}>
      {alerta.msg}
    </div>
  )
}

export default Alerta