// frontend/src/screens/SignupScreen.jsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import { useRegisterMutation } from "../slices/usersApiSlice.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const calculateDefaultDOB = () => {
  // Calculate 18 years ago from today
  const today = new Date();
  const defaultDOB = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  return defaultDOB.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  dob: Yup.date()
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
      "Must be at least 18 years old"
    )
    .required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
      "Must contain 5 characters, one uppercase, one lowercase, one number and one special character"
    )
    .min(5, "Must be at least 5 characters")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  coupon: Yup.string().required("Required"),
});

const Signup = () => {
  const [registerUser, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      dob: calculateDefaultDOB(), // Set default DOB
      password: "",
      confirmPassword: "",
      coupon: "",
      honeypot: "", // Invisible field for bots
    },
    validationSchema,
    onSubmit: async (values) => {
      if (values.honeypot) {
        // If honeypot is filled, it's likely a bot submission
        console.log("Honeypot triggered");
        return; // Do nothing or handle as bot submission
      }
      // Use the RTK Query mutation
      try {
        //console.log(values);
        const res = await registerUser(values).unwrap();
        localStorage.setItem("balance", res.balance);
        dispatch(setCredentials({ ...res }));
        navigate("/lobby");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    },
  });

  return (
    <>
      <BackgroundImage />
      <div className="flex flex-col relative opacity-80 z-20 items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-blue-500 ">
        <main className="flex-grow flex items-center justify-center w-full">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full max-w-xs md:max-w-md bg-white p-8 rounded-lg shadow-lg"
          >
            <Link
              to="/"
              className="text-center text-blue-900 text-2xl font-bold mb-6 block"
            >
              DobKonektor
            </Link>
            {/* Email */}
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
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                {...formik.getFieldProps("dob")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {formik.touched.dob && formik.errors.dob ? (
                <div className="text-red-500 text-xs">{formik.errors.dob}</div>
              ) : null}
            </div>

            {/* Password */}
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
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...formik.getFieldProps("confirmPassword")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>

            {/* Invitation Code */}
            <div className="mb-6">
              <label
                htmlFor="coupon"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Invitation Code
              </label>
              <input
                type="text"
                id="coupon"
                {...formik.getFieldProps("coupon")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {formik.touched.coupon && formik.errors.coupon ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.coupon}
                </div>
              ) : null}
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
            >
              Sign Up
            </button>
          </form>
        </main>
        {/* Footer for the copyright text */}
        <footer className="text-center pb-4">
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

export default Signup;
