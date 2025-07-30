import React, { useState, useEffect } from "react";
import { useRegisterMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    roleName: "user",
  });
  const { name, email, password, roleName } = user;
  const [register, { isLoading, error, data }] = useRegisterMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();
    const signUpData = {
      name,
      email,
      password,
      roleName,
    };
    register(signUpData);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="align-items-center justify-content-center min-vh-100">
        <div className="row justify-content-center">
          <div className="col-10 col-lg-5">
            <form
              className="shadow rounded bg-body p-4"
              onSubmit={submitHandler}
            >
              <h2 className="mb-4 text-center">Register</h2>

              <div className="mb-3">
                <label htmlFor="name_field" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email_field" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password_field" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>
              <input type="hidden" name="roleName" value={roleName} />
              <button
                id="register_button"
                type="submit"
                className="btn btn-primary w-100 py-2"
                disabled={isLoading}
              >
                {isLoading ? "Loading" : "REGISTER"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
