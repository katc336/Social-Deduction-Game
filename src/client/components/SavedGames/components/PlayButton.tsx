import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const PlayButton: React.FC<GameIdProps> = ({ gameId }) => {
    return (
        <div>
            <Link to={`/story_teller/my_game/${gameId}`}>
                <button className="nav2-button">
                    <Typography>
                        Play Again
                    </Typography>
                </button>
            </Link>
        </div>
    )
}
export default PlayButton