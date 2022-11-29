import React from 'react'
import {Link} from 'react-router-dom'

function NavPerfil() {
  return (
    <nav className='flex gap-5 mb-5'>
      <Link to={'/admin/perfil'} className={'font-bold uppercase text-gray-500 hover:text-gray-600'}>Editar Perfil </Link>
      <Link to={'/admin/cambiar-password'} className={'font-bold uppercase text-gray-500 hover:text-gray-600'}>Cambiar Password </Link>
    </nav>
  )
}

export default NavPerfil