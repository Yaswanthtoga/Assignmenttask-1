import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import Footer from './components/Footer.jsx'
import OTP from './pages/OTP.jsx'
// import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import { UserContext } from "./context/userContext.js";
import { useContext } from "react";


function App() {
  const { currentUser } = useContext(UserContext);

  // Protected Route
  const ProtectedRoute = ({children})=>{
    if(currentUser){
      return children;
    }
    return <Navigate to='/login' />
  }

  const router = createBrowserRouter([
    {
      path:'/',
      index:true,
      element:<ProtectedRoute><Home/></ProtectedRoute>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Register/>
    },
    {
      path:'/otp',
      element:<OTP/>
    },
    {
      path:'/forgot-password',
      element:<ForgotPassword/>
    }
  ]);

  return (
    <>
      <RouterProvider router={router}/>
      <Footer/>
    </>
  );
}

export default App;
