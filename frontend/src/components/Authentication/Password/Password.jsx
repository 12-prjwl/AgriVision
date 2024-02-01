import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import styles from "./Password.module.css";

import { confirmPasswordReset } from "@/features/auth/authActions";

import Navbar from "@/components/Elementals/Navbar/Navbar";

const isValidPasswordLength = (value) => value.trim().length > 7 && !/\s/.test(value);
const arePasswordsEqual = (password1, password2) => password1 === password2;

function Password() {
    const { uid, token } = useParams();

    const [formState, setFormState] = useState({
        newPassword: "",
        confirmPassword: "",
        isShowNewPassword: false,
        isShowConfirmPassword: false,
    });

    const {
        newPassword,
        confirmPassword,
        isShowNewPassword,
        isShowConfirmPassword,
    } = formState;

    const dispatch = useDispatch();

    const inputChangeHandler = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const toggleShowNewPassword = () => {
        setFormState({
            ...formState,
            isShowNewPassword: !isShowNewPassword,
        });
    };

    const toggleShowConfirmPassword = () => {
        setFormState({
            ...formState,
            isShowConfirmPassword: !isShowConfirmPassword,
        });
    };

    const submitFormHandler = (event) => {
        event.preventDefault();

        const isPassword1Valid = isValidPasswordLength(newPassword);
        const isPassword2Valid = isValidPasswordLength(confirmPassword);
        const arePasswordsEquals = arePasswordsEqual(
            newPassword,
            confirmPassword
        );

        if (isPassword1Valid && isPassword2Valid && arePasswordsEquals) {
            dispatch(
                confirmPasswordReset({
                    uid,
                    token,
                    new_password: newPassword,
                    re_new_password: confirmPassword,
                })
            );
        }
    };

    return (
        <>
            <div className={styles.passwordContainer}>
                <Navbar />
                <div className={styles.passwordCard}>
                    <h1 className={styles.passwordHeading}>
                        {"Change Password"}
                    </h1>

                    <form
                        className={styles.passwordForm}
                        noValidate
                        onSubmit={submitFormHandler}>
                        <TextField
                            margin="normal"
                            inputProps={{ className: styles.passwordInput }}
                            InputLabelProps={{
                                className: styles.passwordLabels,
                            }}
                            color="warning"
                            required
                            fullWidth
                            label="New Password"
                            name="newPassword"
                            id="newpassword"
                            type={isShowNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={inputChangeHandler}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={
                                                toggleShowNewPassword
                                            }
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

                        <TextField
                            margin="normal"
                            inputProps={{ className: styles.passwordInput }}
                            InputLabelProps={{
                                className: styles.passwordLabels,
                            }}
                            color="warning"
                            required
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            id="confirmpassword"
                            type={isShowConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={inputChangeHandler}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={
                                                toggleShowConfirmPassword
                                            }
                                            edge="end">
                                            {isShowConfirmPassword ? (
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
                            className={styles.passwordButton}>
                            {"Change"}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Password;
