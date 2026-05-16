import ResistorBox from "../components/ResistorBox";
import DataSheet from "../components/DataSheet";
import { useState } from "react";
import { digitBandValues, toleranceBandValues } from "../data/colorValues";
import calcResistance from "../functions/calculateResistance";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

function CalculatorPage() {
    const historyBandColors = useLocation().state?.bandColors;
    const [bandColors, setBandColors] = useState(
        historyBandColors
            ? historyBandColors
            : {
                  band1: "red",
                  band2: "red",
                  band3: "red",
                  band4: "red",
                  band5: "gold",
              },
    );
    const [selectedBand, setSelectedBand] = useState(null);
    const [isSaved, setIsSaved] = useState({ state: false, message: null });
    const bandNames = {
        "Band - A": "band1",
        "Band - B": "band2",
        "Band - C": "band3",
        "Band - D": "band4",
        Tolerance: "band5",
    };
    const resistance = calcResistance(bandColors);
    const tolerance = toleranceBandValues[bandColors["band5"]];

    async function saveBand() {
        if (!isSaved["state"]) {
            setIsSaved({ state: true, message: "Saved Successfully!" });
            const bandData = { ...bandColors };
            try {
                const response = await fetch(
                    "http://127.0.0.1:5000/save-band",
                    {
                        method: "POST",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({ bandColors: bandData }),
                    },
                );
                const data = await response.json();
                console.log(data["response"]);
            } catch (error) {
                console.log("An Error Occured", error);
            }
        } else setIsSaved({ state: true, message: "Band is already Saved" });
    }

    return (
        <>
            <div className="container">
                <Navbar currentPage="calculator" />
                <div className="themeBackground">
                    <div
                        className="calculatorCard"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setSelectedBand(null);
                                setIsSaved({ ...isSaved, message: null });
                            }
                        }}
                    >
                        <h1>Resistance Calculator</h1>
                        <ResistorBox
                            bandColors={bandColors}
                            selectedBand={selectedBand}
                            setSelectedBand={setSelectedBand}
                        />
                        <div className="resistanceRow">
                            <h2 className="resistance">
                                {resistance} ± {tolerance}%
                            </h2>
                        </div>
                        <div className="headingRow">
                            <div className="columnHeading">
                                <h3>Bands</h3>
                            </div>
                            <div className="columnHeading">
                                <h3>Colour Code</h3>
                            </div>
                        </div>
                        <div className="calcColumns">
                            <div className="calcColumn">
                                <ul className="bandList">
                                    {Object.entries(bandNames).map(
                                        ([bandName, bandId]) => (
                                            <li
                                                key={bandId}
                                                className={`bandItem ${selectedBand == bandId ? "activeBand" : ""}`}
                                                onClick={() =>
                                                    setSelectedBand(bandId)
                                                }
                                            >
                                                {bandName}
                                            </li>
                                        ),
                                    )}
                                </ul>
                                <button
                                    onClick={() => {
                                        saveBand();
                                    }}
                                    className="saveBtn"
                                >
                                    Save
                                </button>
                                {isSaved["message"] && (
                                    <p className="savedMessage">
                                        {isSaved["message"]}
                                    </p>
                                )}
                            </div>
                            <div className="calcColumn">
                                <DataSheet
                                    selectedBand={selectedBand}
                                    bandColors={bandColors}
                                    setBandColors={setBandColors}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CalculatorPage;
