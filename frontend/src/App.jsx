import ResistorBox from "../components/ResistorBox";
import DataSheet from "../components/DataSheet";
import { useState } from "react";
import { digitBandValues, toleranceBandValues } from "../data/colorValues";
import calcResistance from "../functions/calculateResistance";

function App() {
    const [bandColors, setBandColors] = useState({
        band1: "red",
        band2: "red",
        band3: "red",
        band4: "red",
        band5: "gold",
    });
    const [selectedBand, setSelectedBand] = useState(null);
    const bandNames = {
        "Band - A": "band1",
        "Band - B": "band2",
        "Band - C": "band3",
        "Band - D": "band4",
        Tolerance: "band5",
    };

    const resistance = calcResistance(bandColors);
    const tolerance = toleranceBandValues[bandColors["band5"]];

    return (
        <>
            <div className="container">
                <nav>
                    <div className="navButton">Resistance Calculator</div>
                </nav>
                <div className="themeBackground">
                    <div className="calculatorCard">
                        <h1>Resistance Calculator</h1>
                        <ResistorBox
                            bandColors={bandColors}
                            selectedBand={selectedBand}
                            setSelectedBand={setSelectedBand}
                        />
                        <div class="resistanceRow">
                             <h2 class="resistance"> {resistance} ± {tolerance}%</h2>
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
                                <button className="saveBtn">Save</button>
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

export default App;
