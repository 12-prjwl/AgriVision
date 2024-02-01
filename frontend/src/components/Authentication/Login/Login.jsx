import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import styles from "./Login.module.css";

import { loginUserRequest } from "@/features/auth/authActions";

import Navbar from "@/components/Elementals/Navbar/Navbar";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isValidPassword = (value) => value.trim().length > 7 && !/\s/.test(value);

function Login() {
    const [formState, setFormState] = useState({
        email: "",
        password: "",
        isShowNewPassword: false,
    });

    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);

    const { email, password, isShowNewPassword } = formState;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputChangeHandler = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const toggleShowPassword = () => {
        setFormState({
            ...formState,
            isShowNewPassword: !isShowNewPassword,
        });
    };

    const successDialogOpenHandler = () => setSuccessDialogOpen(true);
    const successDialogCloseHandler = () => {
        setSuccessDialogOpen(false);
        navigate("/");
    };

    const errorDialogOpenHandler = () => setErrorDialogOpen(true);
    const errorDialogCloseHandler = () => setErrorDialogOpen(false);

    const submitFormHandler = async (event) => {
        event.preventDefault();

        const isEmailValid = isValidEmail(email);
        const isPasswordValid = isValidPassword(password);

        if (isEmailValid && isPasswordValid) {
            try {
                await dispatch(loginUserRequest({ email, password }));
                successDialogOpenHandler();
            } catch (error) {
                errorDialogOpenHandler();
            }
        } else {
            errorDialogOpenHandler();
        }
    };

    return (
        <>
            <div className={styles.loginContainer}>
                <Navbar />
                <div className={styles.loginCard}>
                    <h1 className={styles.loginHeading}>{"Login"}</h1>

                    <form
                        className={styles.loginForm}
                        noValidate
                        onSubmit={submitFormHandler}>
                        <TextField
                            margin="normal"
                            inputProps={{ className: styles.loginInput }}
                            InputLabelProps={{ className: styles.loginLabels }}
                            color="warning"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            id="email"
                            type="email"
                            value={email}
                            onChange={inputChangeHandler}
                        />

                        <TextField
                            margin="normal"
                            inputProps={{ className: styles.loginInput }}
                            InputLabelProps={{ className: styles.loginLabels }}
                            color="warning"
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            id="password"
                            type={isShowNewPassword ? "text" : "password"}
                            value={password}
                            onChange={inputChangeHandler}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={toggleShowPassword}
                                            edge="end">
                                            {isShowNewPassword ? (
                                                <VisibilityOff
                                                    className={
                                                        styles.showPasswordIcon
                                                    }
                                                />
                                            ) : (
                                                <Visibility
                                                    className={
                                                        styles.showPasswordIcon
                                                    }
                                                />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            className={styles.loginButton}>
                            {"Login"}
                        </Button>

                        <div className={styles.anchorsContainer}>
                            <NavLink
                                to="/reset-password"
                                className={styles.anchors}>
                                {"Forgot password?"}
                            </NavLink>
                            <NavLink to="/signup" className={styles.anchors}>
                                {"Don't have an account? Signup"}
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>

            <Dialog
                open={successDialogOpen}
                onClose={successDialogCloseHandler}>
                <DialogTitle>{"Login Successful"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {"Welcome! You have successfully logged in."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={successDialogCloseHandler} autoFocus>
                        {"OK"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={errorDialogOpen} onClose={errorDialogCloseHandler}>
                <DialogTitle>{"Login Failed"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {"Invalid email or password. Please try again."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={errorDialogCloseHandler} autoFocus>
                        {"OK"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Login;
