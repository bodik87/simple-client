import { Link, Outlet, useLocation } from "react-router-dom";
import { HomePage } from "./HomePage";

function App() {
  const location = useLocation();
  const home = location.pathname === "/";
  return (
    <div className="px-4 max-w-lg mx-auto">
      <nav className="flex gap-3 my-6 justify-between">
        {home ? (
          <h1 className="font-bold text-lg text-black bg-blue-500 px-3 py-1 rounded-lg">
            FULLSTACK NOTES
          </h1>
        ) : (
          <Link className="underline underline-offset-4 text-blue-600" to="/">
            На головну
          </Link>
        )}

        {home && (
          <Link
            to="add"
            className="font-bold text-xl text-black bg-green-500 px-3 rounded-lg"
          >
            +
          </Link>
        )}
      </nav>

      {home ? <HomePage /> : <Outlet />}
    </div>
  );
}

export default App;
