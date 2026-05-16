import styles from "./DataSheet.module.css";
import { digitBandValues, toleranceBandValues } from "../data/colorValues.js";

function DataSheet({ selectedBand, bandColors, setBandColors, setIsSaved }) {
    const isToleranceBand = selectedBand === "band5";
    const isFourthBand = selectedBand === "band4";
    const bands = !isToleranceBand ? digitBandValues : toleranceBandValues;

    const changeColor = (color) => {
        setBandColors({ ...bandColors, [selectedBand]: color });
        setIsSaved({ state: false, message: null })
    };

    return (
        <table className={styles.datasheet}>
            <thead>
                <tr>
                    <th>Colour</th>
                    <th>{isToleranceBand ? "Tolerance" : "Digit"}</th>
                </tr>
            </thead>
            <tbody>
                {isFourthBand ? (
                    <tr onClick={() => changeColor(null)}>
                        <td className={styles.noBand}>No Band</td>
                        <td>-</td>
                    </tr>
                ) : null}
                {Object.entries(bands).map(([color, value], idx) => (
                    <tr key={color} onClick={() => changeColor(color)}>
                        <td className={styles.colorCell}>
                            <div
                                className={styles.colorBox}
                                style={{ backgroundColor: color }}
                            ></div>
                            {color}
                        </td>
                        <td>
                            {value}
                            {isToleranceBand && "%"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DataSheet;
