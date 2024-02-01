import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import styles from "./Navbar.module.css";

import { logout } from "@/features/auth/authSlice";

import guardingerLogo from "/guardingerLogo.png";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const logoutUserHandler = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navHeader}>
                    <NavLink to="/" className={styles.brand}>
                        <img
                            src={guardingerLogo}
                            alt="Guardinger Logo"
                            className={styles.logo}
                        />
                        <span>{"AgriVision"}</span>
                    </NavLink>
                </div>

                {location.pathname !== "/" && (
                    <div className={styles.navContent}>
                        <NavLink to="/" className={styles.navItem}>
                            {"Home"}
                        </NavLink>
                        <NavLink to="/predictor" className={styles.navItem}>
                            {"Predictor"}
                        </NavLink>
                    </div>
                )}

                <div className={styles.actions}>
                    {isAuthenticated ? (
                        <>
                            <Button
                                variant="contained"
                                size="large"
                                className={styles.buttons}
                                onClick={logoutUserHandler}>
                                {"Logout"}
                            </Button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">
                                <Button
                                    variant="contained"
                                    size="large"
                                    className={styles.buttons}>
                                    {"Login"}
                                </Button>
                            </NavLink>
                            <NavLink to="/signup">
                                <Button
                                    variant="contained"
                                    size="large"
                                    className={styles.buttons}>
                                    {"Signup"}
                                </Button>
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
