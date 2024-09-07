import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSilce";
import food from "../img/food.jpg";


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessag, setErrorMessage] = useState(null);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("please fill all the fields"));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        setErrorMessage(data.message)
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/home");
      }
    } catch (error) {
      dispatch(signInFailure(data.message));
      setErrorMessage("password or email must be wrrong")
    }
  };

  return (
    <div className="  min-h-screen ">
       <img src={food} alt="" className="w-full h-[700px]   object-cover z-50" />

      <div className="absolute transform -translate-x-0 translate-y-0 top-1  flex justify-center items-center">
        <div className="">
          <div className=" mt-20 lg:ml-[470px] md:ml-[240px] ml-[4px] ">
            <div className=" flex justify-center items-center">
              <div>
                <h1 className="text-4xl ml-12 font-serif opacity-70 text-gray-800">
           
                </h1>

                <h1 className="text-4xl font-serif opacity-70 text-white">
                  Customer Login
                </h1>
              </div>
            </div>
            <div className="bg-white bg-opacity-50 w-[480px]  md:w-[550px] lg:w-[550px] border h-96 mt-8 max-w-3xl mx-auto rounded-3xl border-opacity-50 ">
              <div className="flex justify-center items-center   ">
                <div className="mt-16">
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                      <h3 className="font-semibold text-gray-700 ml-1">
                        Email
                      </h3>
                      <input
                        className=" bg-slate-100 bg-opacity-40 border-white border-opacity-50  p-3 rounded-lg w-[460px] h-11"
                        type="email"
                        placeholder="name@company.com"
                        id="email"
                        onChange={handlchange}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 ml-1">
                        Password
                      </h3>
                      <input
                        className=" bg-slate-100 bg-opacity-40 border-white p-3 border-opacity-50 rounded-lg w-[460px] h-11"
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={handlchange}
                      />
                    </div>
                    <button
                      className=" bg-slate-900 mt-6 bg-opacity-80 border-white border border-opacity-50 text-white p-3 rounded-lg w-[460px] h-[45px] hover:opacity-90"
                      type="submit"
                      disabled={loading}
                    >
                      
                     
                      {loading ? (
                        <>
                          <Spinner size="sm" />
                          <sapn className="pl-3">Loading...</sapn>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center">
                            <div className="font-serif text-xl opacity-75">
                              SING IN
                            </div>
                          </div>
                        </>
                      )}
                     
                    </button>
                  </form>
                  <div className="flex gap-2 text-sm ">
            <span>Have an account?</span>
            <Link to="/sign-up" className="text-blue-900 hover:text-blue-700">
              Sign up
            </Link>
          </div>

                  {errorMessag && (
                    <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
                      {errorMessag}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
