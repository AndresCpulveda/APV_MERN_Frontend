import {BrowserRouter, Routes, Route} from "react-router-dom" //Importamos los componentes de routers para construir las rutas de la app

import AuthLayout from "./layout/AuthLayout" //Importamos component dinamico de layout
import AdminLayout from "./layout/AdminLayout" //Importamos component dinamico de layout

//Importamos todos los componentes
import Login from "./paginas/Login"
import Registrar from "./paginas/Registrar"
import OlvidePassword from "./paginas/OlvidePassword"
import Confirmar from "./paginas/Confirmar"
import NuevoPassword from "./paginas/NuevoPassword"
import AdministrarPacientes from "./paginas/AdministrarPacientes"
import EditarPerfil from "./paginas/EditarPerfil"
import CambiarPassword from "./paginas/CambiarPassword"

import { AuthProvider } from "./context/AuthProvider" //Importamos el context provider de autenticación
import { PacientesProvider } from "./context/PacientesProvider"

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
              {/* Se hacen las rutas de cada pagina y se pone el componente */}
              {/* Rutas de area publica */}
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="registrar" element={<Registrar />} />
                <Route path="olvide-password" element={<OlvidePassword />} />
                <Route path="olvide-password/:token" element={<NuevoPassword />} />
                <Route path="confirmar/:id" element={<Confirmar />} />
              </Route>

              {/* Rutas de area privada y protegidas */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdministrarPacientes />} />
                <Route path="/admin/perfil" element={<EditarPerfil />} />
                <Route path="/admin/cambiar-password" element={<CambiarPassword />} />
              </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
