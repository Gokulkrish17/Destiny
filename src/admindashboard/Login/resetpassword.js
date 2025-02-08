import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";  // Import react-hook-form
import axios from "axios";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  // Use useLocation hook to get the email passed via navigation state
  const location = useLocation();
  const email = location.state?.email;

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleBackButton = () => {
    navigate("/forgot-password");
  };

  const onSubmit = async (data) => {
    try {
      // Add the email to the data being sent in the reset-password request
      const response = await axios.post("https:192.168.1.29:8080/api/admin/reset-password", {
        ...data,
        email: email // Include the email here
      });

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert("Incorrect OTP.");
          reset();
        } else if (error.response.status === 401) {
          alert("Unauthorized user.");
          reset();
        } else {
          alert("An error occurred. Please try again.");
          reset();
        }
      } else {
        alert("Unable to connect to the server.");
        reset();
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 flex-col">
      <div className="w-1/4 bg-white rounded-sm shadow-lg p-6">
        <div className="flex flex-col space-y-4">
          <p className="text-lg font-semibold text-center border-b border-gray-300 pb-2">
            Enter Your OTP
          </p>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* OTP Field */}
            <div className="flex flex-col">
              <label className="text-sm font-medium pb-2">OTP</label>
              <input
                className={`border rounded-sm p-2 focus:outline-none ${errors.otp ? "border-red-500" : "border-gray-300"}`}
                type="number"
                placeholder="Enter your 6 digit OTP"
                {...register("otp", {
                  required: "OTP is required",
                  minLength: {
                    value: 6,
                    message: "OTP should not be less than 6 digits",
                  },
                  maxLength: {
                    value: 6,
                    message: "OTP should not exceed 6 digits",
                  }
                })}
              />
              {errors.otp && (
                <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <label className="text-sm font-medium pb-2">Password</label>
              <input
                className={`border rounded-sm p-2 focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"}`}
                type="password"
                placeholder="Enter password"
                {...register("newPassword", {
                  required: "Password is required.",
                  minLength: {
                    message: "Password must be at least 6 characters long.",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col">
              <label className="text-sm font-medium pb-2">Confirm Password</label>
              <input
                className={`border rounded-sm p-2 focus:outline-none ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                type="password"
                placeholder="Re-enter your password"
                {...register("confirmPassword", {
                  required: "Confirm password is required."
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
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
              Submit Code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
