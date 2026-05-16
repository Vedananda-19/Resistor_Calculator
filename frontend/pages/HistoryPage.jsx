import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import ResistorBox from "../components/ResistorBox";
import calcResistance from "../functions/calculateResistance";
import { toleranceBandValues } from "../data/colorValues";
import { useNavigate } from "react-router-dom";

function HistoryPage() {
    const [historyList, setHistoryList] = useState([]);
    const navigate = useNavigate();
    async function getBands() {
        try {
            const response = await fetch("http://127.0.0.1:5000/get-bands");
            const data = await response.json();
            setHistoryList(data);
            console.log(data);
        } catch (error) {
            console.log("An Error Occured : ", error);
        }
    }
    useEffect(() => {
        getBands();
    }, []);
    return (
        <div className="container">
            <Navbar currentPage="history" />
            <div className="themeBackground">
                <div className="calculatorCard">
                    <h1>History</h1>
                    {historyList.map((doc) => {
                        const resistance = calcResistance(doc["bandColors"]);
                        const tolerance =
                            toleranceBandValues[doc["bandColors"]["band5"]];
                        return (
                            <div
                                className="historyRow"
                                onClick={(e) => {
                                    (e.target.className !== "resistanceRow") &
                                        (e.target.className !== "resistance") &&
                                        navigate("/", {
                                            state: {
                                                bandColors: doc["bandColors"],
                                            },
                                        });
                                }}
                                key={doc["_id"]}
                            >
                                <ResistorBox
                                    bandColors={doc["bandColors"]}
                                    isHistoryBand={true}
                                />
                                <div className="resistanceRow">
                                    <h2 className="resistance">
                                        {resistance} ± {tolerance}%
                                    </h2>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default HistoryPage;
