import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import ResistorBox from "../components/ResistorBox";
import calcResistance from "../functions/calculateResistance";
import { toleranceBandValues } from "../data/colorValues";
import { useNavigate } from "react-router-dom";

function HistoryPage() {
    const [historyList, setHistoryList] = useState([]);
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate();
    async function getBands() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/get-bands`);
            const data = await response.json();
            setHistoryList(data);
            console.log(data);
        } catch (error) {
            console.log("An Error Occured : ", error);
        } finally {
            setLoading(false)
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
                    {loading ? <h3 style={{padding:"100px 0px",color:"#00ADB5"}}>Loading...</h3> :
                    !historyList ? <h3 style={{color:"#00ADB5"}}>No Bands are Saved Yet</h3> :
                    historyList.map((doc) => {
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
