import { Link } from "react-router-dom";
import { ButtonLogin } from "../components/Login/ButtonLogin";
import { GoogleButton } from "../components/Login/GoogleButton";
import { InputsLogin } from "../components/Login/InputsLogin";
import { LogoResponsive } from "../components/Logo/LogoResponsive";
export const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <LogoResponsive />
      <div className="text-center">
        <h2 className="text-2xl">Login</h2>
        <InputsLogin />
        <p className=" text-gray-400 ">Or </p>
        <GoogleButton />
        <p>
          Don't have an account?{" "}
          <Link className="text-teal" to={"/register"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
