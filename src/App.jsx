import { NavLink, Outlet, useLocation } from "react-router-dom";
import { HomePage } from "./HomePage";

function App() {
  const location = useLocation();
  const home = location.pathname === "/";
  const activeStyle = { textDecoration: "underline", color: "red" };
  return (
    <div className="px-2 max-w-lg mx-auto">
      <nav className="py-2 flex gap-3 mb-4">
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Домой
        </NavLink>

        <NavLink
          to="add"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Добавить
        </NavLink>
      </nav>

      {home ? <HomePage /> : <Outlet />}
    </div>
  );
}

export default App;
