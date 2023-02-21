import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className="flex flex-row h-screen">
      <div className="basis-full md:basis-1/2 xl:basis-2/5 flex flex-col mx-auto py-5 bg-x-white">
        <div className="w-2/5 mx-auto">
          <img
            src={require("../../pictures/logo-black-no-background.png")}
            className="object-scale-down"
          />
        </div>
        <p className="text-3xl font-bold mt-7">Log In</p>
        <form className="flex flex-col mx-auto pt-3 w-2/3 gap-5">
          <input
            type="text"
            name="login"
            placeholder="Login"
            className="input input-ghost border-0 border-b-2 focus: rounded-none border-x-green w-full"
          />
          <input
            type="password"
            name="login"
            placeholder="Password"
            className="input input-ghost border-0 border-b-2 rounded-none border-x-green w-full"
          />
          <button className="btn bg-x-green text-x-white rounded-xl w-1/2 mx-auto">
            LogIn
          </button>
        </form>
        <p className="text-sm mt-2">
          Don't have an account?
          <Link>
            <strong className="text-x-red underline"> Sign Up!</strong>
          </Link>
        </p>
        <div className="flex flex-row mt-10">
          <hr className="grow border-gray-500 border-spacing-1 my-auto mx-10" />
          <p>Sing In With</p>
          <hr className="grow border-gray-500 border-spacing-1 my-auto mx-10" />
        </div>
        <div className="flex flex-row justify-center gap-10 py-3 text-5xl">
          <i class="bi bi-google text-red-400"></i>
          <i class="bi bi-twitter text-blue-400"></i>
          <i class="bi bi-facebook text-blue-600"></i>
        </div>
      </div>
    </div>
  );
}
