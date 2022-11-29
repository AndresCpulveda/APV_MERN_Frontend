import {useState, useEffect} from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes"

function Formulario() {

  //Se crea un state para controlar cada campo del formulario, para la alerta y para el id si aplica
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [alerta, setAlerta] = useState({})
  const [id, setId] = useState(null)

  const {guardarPaciente, paciente} = usePacientes(); //Importamos la funcion de guardar paciente y el state de paciente del context


  useEffect( () => { //Effect que se ejecuta al haber un cambio en el state de paciente
    if(paciente?.nombre) {//Si el paciente tiene una propiedad id (indica que se va a editar) se llena el formulario con los datos del state paciente
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
      setId(paciente._id)
    }
  },[paciente]) //Effect controla la variable de paciente

  const handleSubmit = (e) => {
    e.preventDefault()

    if([nombre, propietario, email, fecha, sintomas].includes('')) { //Valida si los campos estan vacios
      setAlerta({//Muestra una alerta si estan vacios
        msg: "Todos los campos son obligatorios",
        error: true,
      })
      return
    }
    guardarPaciente({nombre, propietario, email, fecha, sintomas, id}) //Ejecutamos la funcion de guardar enviando el parametro id ya sea que este definido o no
    setAlerta({
      msg: 'Guardado Correctamente'
    })
    setTimeout(() => {
      setAlerta({msg: ''})
    }, 4000);

    //Al terminar vaciamos todos los campos
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    setId('')
  }

  return (
    <>
    <p className="text-lg text-center mb-3 font-bold text-indigo-900">Agrega tus Pacientes y Administralos</p>
    <form className="bg-white p-5 mx-5 rounded shadow-lg mb-5 md:mb-0" onSubmit={handleSubmit}>
      <div className="flex flex-col mt-8 gap-2">
        <label
          htmlFor="nombreMascota"
          className="uppercase font-bold text-indigo-900 text-sm"
        >nombre mascota</label>
        <input
          value={nombre}
          onChange={(e) => {setNombre(e.target.value)}}
          id="nombreMascota"
          className="border rounded border-gray-400 py-1 px-2"
          placeholder="Nombre de la mascota"
        ></input>
      </div>
      <div className="flex flex-col mt-8 gap-2">
        <label
          htmlFor="nombrePropietario"
          className="uppercase font-bold text-indigo-900 text-sm"
        >nombre propietario</label>
        <input
          value={propietario}
          onChange={(e) => {setPropietario(e.target.value)}}
          id="nombrePropietario"
          className="border rounded border-gray-400 py-1 px-2"
          placeholder="Nombre del propietario"
        ></input>
      </div>
      <div className="flex flex-col mt-8 gap-2">
        <label
          htmlFor="emailPropietario"
          className="uppercase font-bold text-indigo-900 text-sm"
        >email propietario</label>
        <input
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          id="emailPropietario"
          className="border rounded border-gray-400 py-1 px-2"
          placeholder="Email del propietario"
        ></input>
      </div>
      <div className="flex flex-col mt-8 gap-2">
        <label
          htmlFor="fechaCita"
          className="uppercase font-bold text-indigo-900 text-sm"
        >fecha cita</label>
        <input
          value={fecha}
          onChange={(e) => {setFecha(e.target.value)}}
          id="fechaCita"
          type="date"
          className="border rounded border-gray-400 py-1 px-2"
        ></input>
      </div>
      <div className="flex flex-col mt-8 gap-2">
        <label
          htmlFor="sintomas"
          className="uppercase font-bold text-indigo-900 text-sm"
        >sintomas</label>
        <textarea
          value={sintomas}
          onChange={(e) => {setSintomas(e.target.value)}}
          id="sintomas"
          placeholder="Describe los sintomas"
          className="border rounded border-gray-400 py-1 px-2"
        ></textarea>
      </div>
      <input
        type="submit"
        value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
        id="btnAñadirPaciente"
        className="w-full bg-indigo-600 hover:bg-white text-white hover:text-indigo-600 rounded p-2 border-4 border-indigo-600 font-bold my-5 cursor-pointer transition-all uppercase"
      ></input>
      {alerta.msg && <Alerta alerta={alerta}/>}
    </form>
    </>
  )
}

export default Formulario