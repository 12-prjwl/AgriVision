import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, TextField } from "@mui/material";

import styles from "./Reset.module.css";

import { requestPasswordReset } from "@/features/auth/authActions";

import Navbar from "@/components/Elementals/Navbar/Navbar";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function Reset() {
    const [formState, setFormState] = useState({
        email: "",
    });

    const { email } = formState;

    const dispatch = useDispatch();

    const inputChangeHandler = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const submitFormHandler = (event) => {
        event.preventDefault();

        console.log()

        const isEmailValid = isValidEmail(email);

        if (isEmailValid) {
            dispatch(requestPasswordReset(email));
        }
    };

    return (
        <>
            <div className={styles.resetContainer}>
                <Navbar />
                <div className={styles.resetCard}>
                    <h1 className={styles.resetHeading}>{"Reset Password"}</h1>

                    <form
                        className={styles.resetForm}
                        noValidate
                        onSubmit={submitFormHandler}>
                        <TextField
                            margin="normal"
                            inputProps={{ className: styles.resetInput }}
                            InputLabelProps={{ className: styles.resetLabels }}
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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            className={styles.resetButton}>
                            {"Send Reset Link"}
                        </Button>

                        <div className={styles.anchorsContainer}>
                            <NavLink to="/login" className={styles.anchors}>
                                {"Remembered Password? Login"}
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Reset;
