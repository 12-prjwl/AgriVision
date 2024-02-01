import { useRef, useState } from "react";
import { Button } from "@mui/material";

import styles from "./Predictor.module.css";

import Navbar from "@/components/Elementals/Navbar/Navbar";

function Predictor() {
    const imageRef = useRef(null);
    const [image, setImage] = useState(null);

    const imageChangeHandler = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const imageClickHandler = () => {
        imageRef.current.click();
    };

    return (
        <>
            <div className={styles.predictorContainer}>
                <Navbar />

                <div className={styles.uploadButtonCard}>
                    <Button
                        variant="contained"
                        size="large"
                        component="label"
                        className={styles.uploadButton}>
                        {"Image"}
                        <input
                            type="file"
                            ref={imageRef}
                            onChange={imageChangeHandler}
                            hidden
                        />
                    </Button>
                </div>

                <div className={styles.predictionCards}>
                    <div className={styles.imageCard}>
                        <input
                            type="file"
                            ref={imageRef}
                            style={{ display: "none" }}
                            onChange={imageChangeHandler}
                        />
                        <div
                            className={styles.imageTemplate}
                            onClick={imageClickHandler}>
                            {image && (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Input Image"
                                    className={styles.renderedImage}
                                />
                            )}
                        </div>
                    </div>
                    <div className={styles.imageCard}>
                        <div
                            className={styles.imageTemplate}
                            onClick={imageClickHandler}>
                            {/* {image && (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Predicted Image"
                                />
                            )} */}
                        </div>
                    </div>
                </div>

                <div className={styles.predictionReportCard}>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        className={styles.predictButton}>
                        {"Predict"}
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Predictor;
