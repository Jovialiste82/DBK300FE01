import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import { useLoginMutation } from "../slices/usersApiSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
      "Must contain 5 characters, one uppercase, one lowercase, one number and one special character"
    )
    .min(5, "Must be at least 5 characters")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
});

const Login = () => {
  const [loginUser, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      honeypot: "", // Invisible field for bots
    },
    validationSchema,
    onSubmit: async (values) => {
      // console.log(values);
      if (values.honeypot) {
        // If honeypot is filled, it's likely a bot submission
        // console.log("Honeypot triggered");
        return; // Do nothing or handle as bot submission
      }
      // Use the RTK Query mutation
      try {
        const res = await loginUser(values).unwrap();
        // console.log("res", res);
        dispatch(setCredentials({ ...res }));
        localStorage.setItem("balance", res.balance);
        navigate("/lobby");
      } catch (err) {
        // console.log("first catch");
        // console.log(err.data);
        toast.error(err?.data?.message || err.error);
      }
    },
  });

  return (
    <>
      <BackgroundImage />
      <div className="flex flex-col relative items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-blue-500  opacity-80 z-20">
        <main className="flex-grow flex items-center justify-center w-full">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full  max-w-xs md:max-w-md bg-white p-8 rounded-lg shadow-lg"
          >
            <Link
              to="/"
              className="text-center text-blue-900 text-2xl font-bold mb-6 block"
            >
              DobKonektor
            </Link>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-xs">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...formik.getFieldProps("password")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-xs">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="hidden">
              <input
                type="text"
                {...formik.getFieldProps("honeypot")}
                className="invisible"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </main>

        {/* Footer for the copyright text */}
        <footer className="text-center pb-4 flex">
          <a
            href="https://philippecharpentier.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white transition duration-200 ease-in-out transform hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-opacity-50"
          >
            &copy; Copyright 2024 - Philippe Charpentier
          </a>
        </footer>
      </div>
    </>
  );
};

export default Login;
