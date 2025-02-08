import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for showing error messages

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const handleBackButton = () => {
    navigate("/");
  };

  const onSubmit = async (data) => {
    setSuccessMessage("");
    setErrorMessage("");
  
    try {
      const checkResponse = await axios.post(
        `https:192.168.1.29:8080/api/admin/check-email/${data.email}`
      );
  
      if (checkResponse.status === 200) {
        const otpResponse = await axios.post(
          "https:192.168.1.29:8080/api/admin/forgot-password",
          data
        );
  
        if (otpResponse.status === 200) {
          setSuccessMessage("OTP sent successfully! Please check your email.");
          setTimeout(() => {
            // Send the email in the state to the reset-password page
            navigate("/reset-password", { state: { email: data.email } });
          }, 1000);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("The email address is not registered.");
        reset();
      } else {
        setErrorMessage("An error occurred. Please try again.");
        reset();
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 flex-col">
      <div className="w-1/4 bg-white rounded-sm shadow-lg p-6">
        <div className="flex flex-col space-y-4">
          <p className="text-lg font-semibold text-center border-b border-gray-300 pb-2">
            Forgot Password?
          </p>

          {/* Success Message */}
          {successMessage && (
            <p className="text-green-500 text-center text-sm">{successMessage}</p>
          )}

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-center text-sm">{errorMessage}</p>
          )}

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="flex flex-col">
              <label className="text-sm font-medium pb-2">Email</label>
              <input
                className={`border rounded-sm p-2 focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                type="email"
                placeholder="Enter email and get code"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Back Button */}
            <div className="text-right">
              <button
                type="button"
                className="text-blue-500 text-sm"
                onClick={handleBackButton}
              >
                <span className="flex gap-1 items-center hover:underline">
                  <Icon icon="bx:arrow-back" />
                  Back
                </span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              className="bg-blue-500 text-white rounded-sm py-2 mt-2 hover:bg-blue-600"
              type="submit"
            >
              Get Code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
