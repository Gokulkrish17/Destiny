import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/api/admin/login", data);
      const responseData = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", responseData.token);
        navigate("/userlist");
        reset(); // Reset form after successful login
      }
    } catch (error) {
      // Handle errors and reset form in case of failure
      if (error.response) {
        if (error.response.status === 400) {
          alert("Incorrect username or password.");
          reset(); // Reset form on error
        } else if (error.response.status === 401) {
          alert("Unauthorized user.");
          reset(); // Reset form on error
        } else {
          alert("An error occurred. Please try again.");
          reset(); // Reset form on error
        }
      } else {
        alert("Unable to connect to the server.");
        reset(); // Reset form if unable to connect
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 flex-col">
      <div className="w-1/4 bg-white rounded-sm shadow-lg p-6">
        <div className="flex flex-col space-y-4">
          <p className="text-xl font-semibold text-center">Login Form</p>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="flex flex-col">
              <label className="text-sm font-medium pb-2">Email</label>
              <input
                className={`border rounded-sm p-2 focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format.",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <label className="text-sm font-medium pb-2">Password</label>
              <input
                className={`border rounded-sm p-2 focus:outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long.",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-blue-500 text-sm hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              className="bg-blue-500 text-white rounded-sm py-2 mt-2 hover:bg-blue-600"
              type="submit"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
