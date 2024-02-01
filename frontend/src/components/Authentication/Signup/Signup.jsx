import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import styles from "./Signup.module.css";

import { signupUserRequest } from "@/features/auth/authActions";

import Navbar from "@/components/Elementals/Navbar/Navbar";

const isValidUsername = (value) => /^[a-zA-Z0-9 ]+$/.test(value);
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isValidPassword = (value) => value.trim().length > 7 && !/\s/.test(value);

function Signup() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        isShowNewPassword: false,
    });

    const { name, email, password, isShowNewPassword } = formState;

    const dispatch = useDispatch();

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

    const submitFormHandler = (event) => {
        event.preventDefault();

        const isUsernameValid = isValidUsername(name);
        const isEmailValid = isValidEmail(email);
        const isPasswordValid = isValidPassword(password);

        if (isUsernameValid && isEmailValid && isPasswordValid) {
            dispatch(signupUserRequest({ name, email, password }));
        }
    };

    return (
        <>
            <div className={styles.signupContainer}>
                <Navbar />
                <div className={styles.signupCard}>
                    <h1 className={styles.signupHeading}>{"Signup"}</h1>

                    <form
                        className={styles.signupForm}
                        noValidate
                        onSubmit={submitFormHandler}>
                        <TextField
                            margin="normal"
                            inputProps={{ className: styles.signupInput }}
                            InputLabelProps={{ className: styles.signupLabels }}
                            color="warning"
                            required
                            fullWidth
                            label="Username"
                            name="name"
                            id="name"
                            type="text"
                            value={name}
                            onChange={inputChangeHandler}
                        />

                        <TextField
                            margin="normal"
                            inputProps={{ className: styles.signupInput }}
                            InputLabelProps={{ className: styles.signupLabels }}
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
                            inputProps={{ className: styles.signupInput }}
                            InputLabelProps={{ className: styles.signupLabels }}
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
                            className={styles.signupButton}>
                            {"Signup"}
                        </Button>

                        <div className={styles.anchorsContainer}>
                            <NavLink to="/login" className={styles.anchors}>
                                {"Already have an account? Login"}
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;
