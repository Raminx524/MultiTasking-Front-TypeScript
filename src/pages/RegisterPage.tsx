import React from "react";
const USER_URL = "http://localhost:3000/api/auth/";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "@/contexts/auth.context";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

function RegisterPage() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  if (user) return <Navigate to="/" />;
  async function handleRegister(e) {
    e.preventDefault();
    const formElem = e.target;
    const newUser = {
      username: formElem.username.value,
      password: formElem.password.value,
      email: formElem.email.value,
      firstName: formElem.firstName.value,
      lastName: formElem.lastName.value,
    };
    try {
      await axios.post(USER_URL + "register", newUser);
      toast({ title: "User Created Successfully!" });
      navigate("/login");
    } catch (err) {
      if (err.response.status === 400)
        toast({ title: err.response.data.error });
      else toast({ title: "Oops, Something went wrong!" });
    }
  }
  return (
    <div className="flex justify-center my-24">
      <form
        onSubmit={handleRegister}
        className="flex flex-col items-center sm:gap-4 rounded-lg w-96 p-4  border border-blue-300"
      >
        <h2 className="text-3xl">Register</h2>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex justify-between min-w-72">
            <label htmlFor="username">Username:</label>
            <input
              required
              type="text"
              name="username"
              id="username"
              className="border text-primary border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="password">Password:</label>
            <input
              required
              type="password"
              name="password"
              id="password"
              className="border text-primary border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              name="email"
              id="email"
              className="border text-primary border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="firstName">First Name</label>
            <input
              required
              type="text"
              name="firstName"
              id="firstName"
              className="border text-primary border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="lastName">Last Name</label>
            <input
              required
              type="text"
              name="lastName"
              id="lastName"
              className="border text-primary border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
        </div>
        <Button className=" transition-all duration-300 hover:bg-blue-900 hover:text-white px-4 py-2  border ">
          Sign Up
        </Button>
        <div className="border-t-2  pt-4 w-full text-center">
          <p>
            Already have an Account?{" "}
            <Link
              to="/login"
              className=" font-semibold border-b border-transparent hover:border-current"
            >
              Login Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
