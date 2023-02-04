import { Link, Outlet, useLocation } from "react-router-dom";
import { HomePage } from "./HomePage";

function App() {
  const location = useLocation();
  const home = location.pathname === "/";
  return (
    <div className="px-4 max-w-lg mx-auto">
      <nav className="flex gap-3 my-6 justify-between items-center">
        {home ? (
          <h1 className="font-bold text-lg text-white bg-blue-600 px-3 py-2 rounded-lg">
            NOTES
          </h1>
        ) : (
          <Link className="underline underline-offset-4 text-blue-600" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
        )}

        {home && (
          <Link to="add">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="blue"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Link>
        )}
      </nav>

      {home ? <HomePage /> : <Outlet />}
    </div>
  );
}

export default App;
