import { Outlet } from "react-router-dom"; //El outlet debe usarse en elementos de ruta principales para representar sus elementos de ruta secundarios.

function AuthLayout() { //Componente con el contenedor principal estilado, que contendra a todos los componentes de la misma forma.
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-10 gap-12 p-5 items-center">
        <Outlet />
      </main>
    </>
  );
}

export default AuthLayout