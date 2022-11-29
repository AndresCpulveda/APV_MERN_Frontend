import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Header() {
  const {cerrarSesion} = useAuth() //Importamos la funcion de cerrar sesion del context para agregarla al boton



  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-center text-2xl text-indigo-200">Administrador de Pacientes de
          <span className="text-white font-black"> Veterinaria</span></h1>

        <nav className='flex gap-4 mt-2 lg:mt-0'>
          <Link to="/admin" className="text-indigo-200 lg:text-lg font-bold hover:text-white transition-all">Pacientes</Link>
          <Link to="/admin/perfil" className="text-indigo-200 lg:text-lg font-bold hover:text-white transition-all">Perfil</Link>
          <button type='button' onClick={cerrarSesion} className="text-indigo-200 text-sm lg:text-md hover:text-white transition-all">Cerrar Sesion</button>
        </nav>
      </div>
    </header>
  )
}

export default Header