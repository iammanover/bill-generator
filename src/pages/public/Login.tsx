import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ILoginForm } from "../../utils/interface/loginForm.interface";
import { useAuthentication } from "../../hooks/useAuthentication";
import "./Login.scss"

const Login = () => {
  const { login } = useAuthentication();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<ILoginForm>();

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const loginForm: SubmitHandler<ILoginForm> = (data: ILoginForm) => {
    if (data.email === "demoBill@gmail.com" && data.password === "Demo@Bill1") {
      login(true);
    }
  };
  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="shadow  px-5 py-3 mb-5 bg-white rounded form-width">
          <div className="d-flex flex-column">
            <h4 className="fw-bold mb-4 text-center">LogIn</h4>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(loginForm)}
            >
              <div className="my-3">
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={
                    typeof errors.email?.message === "string"
                      ? errors.email.message
                      : undefined
                  }
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  label="Password"
                  type={passwordVisibility ? "text" : "password"}
                  error={!!errors.password}
                  helperText={
                    typeof errors.password?.message === "string"
                      ? errors.password.message
                      : undefined
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setPasswordVisibility(!passwordVisibility);
                          }}
                        >
                          {passwordVisibility ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
                    },
                  })}
                />
              </div>

              <Button
                type="submit"
                className="my-4"
                fullWidth
                size="large"
                variant="contained"
                color="secondary"
              >
                LOGIN
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
