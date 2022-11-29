import {useState} from 'react'
import NavPerfil from '../components/NavPerfil'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth';

function CambiarPassword() {

  const {actualizarContraseña} = useAuth(); //Importamos la funcion del context

  //Creamos states para cada campo del formulario
  const [passwordActual, setPasswordActual] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('')

  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ([passwordActual, newPassword, newPasswordRepeat].includes('')) { //Validamos si hay campos vacios y mostramos alerta de error
      setAlerta({msg: 'Hay campos vacios', error: true})
      setTimeout(() => {
        setAlerta({msg: ''})
      }, 3000);
      return
    }
    if (newPassword !== newPasswordRepeat) { //Validamos que las contraseñas coincidan
      setAlerta({msg: 'Las contraseñas no coinciden', error: true})
      setTimeout(() => {
        setAlerta({msg: ''})
      }, 3000);
      return
    }
    if(newPassword.length < 6) { //Validamos que la contraseña se mayor a 5 caracteres
      setAlerta({msg: 'La contraseña debe tener al menos 6 caracteres', error: true})
      setTimeout(() => {
        setAlerta({msg: ''})
      }, 3000);
      return
    }

    const resultado = await actualizarContraseña({passwordActual, newPassword}) //Una vez pasadas las validaciones ejecutamos la funcion de actualizar y guardamos su mensaje de return para usarlo en el componente Alert
    setAlerta(resultado)
  }

  return (
    <>
      <NavPerfil />

      <h2 className='font-bold text-3xl text-center'>Cambiar Contraseña</h2>
      <p className='text-gray-500 text-lg font-bold text-center'>Cambia tu contraseña llenando <span className='text-indigo-600'>este formulario</span></p>

      <form className="bg-white p-5 self-center mx-5 rounded shadow-lg my-5 md:mb-0" onSubmit={handleSubmit}>
        {alerta.msg ? <Alerta alerta={alerta} /> : null}
        <div className="flex flex-col mt-8 gap-2">
          <label
            htmlFor="contraseñaActual"
            className="uppercase font-bold text-indigo-900 text-sm"
          >escribe tu contraseña actual</label>
          <input
            type='password'
            value={passwordActual}
            onChange={e => setPasswordActual(e.target.value)}
            id="contraseñaActual"
            className="border rounded border-gray-400 py-1 px-2"
            placeholder="Tu contraseña actual"
          ></input>
        </div>
        <div className="flex flex-col mt-8 gap-2">
          <label
            htmlFor="nuevaContraseña"
            className="uppercase font-bold text-indigo-900 text-sm"
          >escribe tu nueva contraseña</label>
          <input
            type='password'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            id="nuevaContraseña"
            className="border rounded border-gray-400 py-1 px-2"
            placeholder="Tu nueva contraseña"
          ></input>
        </div>
        <div className="flex flex-col mt-8 gap-2">
          <label
            htmlFor="repiteNuevaContraseña"
            className="uppercase font-bold text-indigo-900 text-sm"
          >repite tu nueva contraseña</label>
          <input
            type='password'
            value={newPasswordRepeat}
            onChange={e => setNewPasswordRepeat(e.target.value)}
            id="repiteNuevaContraseña"
            className="border rounded border-gray-400 py-1 px-2"
            placeholder="Repite la contraseña"
          ></input>
        </div>
        <input
          type="submit"
          value={'Guardar nueva contraseña'}
          id="btnAñadirPaciente"
          className="w-full bg-indigo-600 hover:bg-white text-white hover:text-indigo-600 rounded p-2 border-4 border-indigo-600 font-bold my-5 cursor-pointer transition-all uppercase"
        ></input>
      </form>
    </>
  )
}

export default CambiarPassword