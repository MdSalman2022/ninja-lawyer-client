import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import "./App.css";
import { useContext } from "react";
import { StateContext } from "./contexts/StateProvider/StateProvider";
import { Toaster } from "react-hot-toast";
import useUserAcivityTimer from "./Custom Hooks/User State Hook/UserActivityHook";

function App() {
  const { darkmode } = useContext(StateContext);
  useUserAcivityTimer();

  return (
    <div className={darkmode && "dark"}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
