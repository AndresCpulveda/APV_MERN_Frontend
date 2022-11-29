import {Outlet, Navigate} from "react-router-dom"
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth"


function AdminLayout() {//Layout principal de la zona de admin

  const {auth, cargando} = useAuth(); //Importamos el state de auth para controlar si esta autenticado o no, y el de cargando

  if(cargando) return 'Cargando...' //Mostramos un mensaje de cargando mientras se muestra la pagina

  return (
    <>
      <Header />
      {/* Validamos si el state de auth contiene la propiedad id, en tal caso se muestra todo el contenido <Outlet si no, se usa el <Navigate para redireccionar el usuario a la pagina de login */}
      {auth?._id ? (
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
      ) : <Navigate to="/"/>}
      <Footer />
    </>
  )
}

export default AdminLayout