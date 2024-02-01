import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import AgricultureRoundedIcon from "@mui/icons-material/AgricultureRounded";

import styles from "./Home.module.css";

import Navbar from "@/components/Elementals/Navbar/Navbar";

function Home() {
    return (
        <>
            <div className={styles.homeContainer}>
                <Navbar />

                <div className={styles.modelContainer}>
                    <NavLink to="/predictor">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={styles.modelButton}>
                            <div className={styles.modelContent}>
                                <div>
                                    {"Agricultural Field Image Predictor"}
                                </div>
                                <div>{"Fertility / Infertility"}</div>
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
