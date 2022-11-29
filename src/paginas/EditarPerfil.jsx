import {useState, useEffect} from 'react'
import NavPerfil from '../components/NavPerfil'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'

function EditarPerfil() {

  const {auth, actualizarPerfil} = useAuth() //Se importan el state de auth y la funcion de actualizarPerfil desde el context

  const [perfil, setPerfil] = useState({}) //Creamos un state como objeto que contendra los campos del perfil del veterinario

  useEffect( () => { //Effect que actua al haber un cambio en el state auth y guarda el objeto de este state en el state de perfil para mostrarlo en el formulario
    setPerfil(auth)
  }, [auth])

  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    if([perfil.nombre, perfil.email].includes('')) { //Valida que no haya campos obligatorios vacios
      setAlerta({
        msg: 'Los campos de Email y Nombre son obligatorios',
        error: true,
      })
      setTimeout(() => {
        setAlerta({msg: ''})
      }, 3000);
      return
    }
    const resultado = await actualizarPerfil(perfil) //Llama la funcion de actualizat perfil y manda el objeto de perfil como parametro, la funion retorna un mensaje
    setAlerta(resultado) //El mensaje retornado por la funcion se usa para el componente Alerta
    setTimeout(() => {
      setAlerta({msg: ''})
    }, 3000);

  }


  return (
    <>
      <NavPerfil />

      <h2 className='font-bold text-3xl text-center'>Editar Perfil</h2>
      <p className='text-gray-500 text-lg font-bold text-center'>Modifica <span className='text-indigo-600'>tu información aquí</span></p>

      <div className='flex justify-center'>
        <div className='w-full md:w-1/2 bg-white p-5 self-center mx-5 rounded shadow-lg my-5 md:mb-0'>
        {alerta.msg ? <Alerta alerta={alerta} /> : null}
          <form className='mt-3' onSubmit={handleSubmit}>
            <div className='mb-8 flex flex-col'>
              <label className='uppercase font-bold text-gray-700'>nombre:</label>
              <input
                name='nombre' //Este atributo tiene el mismo nombre que la propiedad del objeto perfil correspondiente al nombre
                value={perfil.nombre || ''} // El value del input se controla por el state, si el state retorna null entonces el value del input es ''
                // Al cambiar se modifica el objeto completo de perfil pero cambiando solo la propiedad deseada
                onChange={e => setPerfil({
                  ...perfil, //Se hace una copia del objeto de perfil, pero...
                  [e.target.name] : e.target.value //...Se asigna el valor del input a la propiedad que tiene el mismo nombre que el atributo 'name' del input
                })}
                className='rounded mt-2 border border-gray-300 p-1 bg-gray-200'
                ></input>
            </div>
            <div className='mb-8 flex flex-col'>
              <label className='uppercase font-bold text-gray-700'>email:</label>
              <input
                name='email' //Este atributo tiene el mismo nombre que la propiedad del objeto perfil correspondiente al correo electronico
                value={perfil.email || ''} //El value del input se controla por el state, si el state retorna null entonces el value del input es ''
                type='email'
                onChange={e => setPerfil({
                  ...perfil, //Se hace una copia del objeto de perfil, pero...
                  [e.target.name] : e.target.value //...Se asigna el valor del input a la propiedad que tiene el mismo nombre que el atributo 'name' del input
                })}
                className='rounded mt-2 border border-gray-300 p-1 bg-gray-200'
                ></input>
            </div>
            <div className='mb-8 flex flex-col'>
              <label className='uppercase font-bold text-gray-700'>telefono:</label>
              <input
                name='telefono' //Este atributo tiene el mismo nombre que la propiedad del objeto perfil correspondiente al numero telefonico
                value={perfil.telefono || ''} // El value del input se controla por el state, si el state retorna null entonces el value del input es ''
                onChange={e => setPerfil({
                  ...perfil, //Se hace una copia del objeto de perfil, pero...
                  [e.target.name] : e.target.value //...Se asigna el valor del input a la propiedad que tiene el mismo nombre que el atributo 'name' del input
                })}
                className='rounded mt-2 border border-gray-300 p-1 bg-gray-200'
                placeholder={perfil.telefono === null ? 'Agregar uno' : ''} //Si el valor de la propiedad telefono en el objeto es null, se aplica un placeholder
                ></input>
            </div>
            <div className='mb-8 flex flex-col'>
              <label className='uppercase font-bold text-gray-700'>sitio web:</label>
              <input
                name='web' //Este atributo tiene el mismo nombre que la propiedad del objeto perfil correspondiente al sitio web
                value={perfil.web || ''} // El value del input se controla por el state, si el state retorna null entonces el value del input es ''
                onChange={e => setPerfil({
                  ...perfil, //Se hace una copia del objeto de perfil, pero...
                  [e.target.name] : e.target.value //...Se asigna el valor del input a la propiedad que tiene el mismo nombre que el atributo 'name' del input
                })}
                className='rounded mt-2 border border-gray-300 p-1 bg-gray-200'
                placeholder={perfil.web === null ? 'Agregar uno' : ''} //Si el valor de la propiedad web en el objeto es null, se aplica un placeholder
                ></input>
            </div>
            <input
              type='submit'
              value='Guardar Cambios'
              className="w-full bg-indigo-600 hover:bg-white text-white hover:text-indigo-600 rounded p-2 border-4 border-indigo-600 font-bold my-4 cursor-pointer transition-all uppercase"
            ></input>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditarPerfil