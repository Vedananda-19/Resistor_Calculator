import { useNavigate } from "react-router-dom"

function Navbar({currentPage}){
    const navigate = useNavigate()
    return (
        <nav>
            <div className={`navButton ${currentPage==="calculator" && "currentNavBtn"}`} onClick={() => navigate("/")}>Resistance Calculator</div>
            <div className={`navButton ${currentPage==="history" && "currentNavBtn"}`} onClick={() => navigate("/history")}>History</div>
        </nav>
    )
}

export default Navbar