import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import AgricultureRoundedIcon from "@mui/icons-material/AgricultureRounded";

import styles from "./Home.module.css";

import Navbar from "@/components/Elementals/Navbar/Navbar";

function Home() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <>
            <div className={styles.homeContainer}>
                <Navbar />

                <div className={styles.modelContainer}>
                    <NavLink to={!isAuthenticated ? "/" : "/predictor"}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={styles.modelButton}
                            disabled={!isAuthenticated}>
                            <div className={styles.modelContent}>
                                <div>
                                    {"Agricultural Field Image Predictor"}
                                </div>
                                {!isAuthenticated ? (
                                    <div>{"Login To Use The Model"}</div>
                                ) : (
                                    <div>
                                        {"(Fertility / Infertility) Area"}
                                    </div>
                                )}
                                <AgricultureRoundedIcon
                                    sx={{ fontSize: "3rem" }}
                                />
                            </div>
                        </Button>
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default Home;
