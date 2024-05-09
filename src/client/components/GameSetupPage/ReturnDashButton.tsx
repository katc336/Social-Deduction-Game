import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"

const ReturnDashButton = () => {
    return (
        <div>
            <Link to={"/story_teller"}>
                <button className="return-button">
                    <Typography>
                    Return to Dashboard
                    </Typography>
                </button>
            </Link>
        </div>
    )
}
export default ReturnDashButton