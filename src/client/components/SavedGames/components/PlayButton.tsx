import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import MobileTheme from "../../SizeThemes/MobileTheme";

const PlayButton: React.FC<GameIdProps> = ({ gameId }) => {
    const { isMobile } = MobileTheme();

    return (
        <div>
            <Link to={`/story_teller/my_game/${gameId}`}>
                <button className={ isMobile ? "nav2-mobile-button" : "nav2-button"}>
                    <Typography>
                        Play Again
                    </Typography>
                </button>
            </Link>
        </div>
    )
}
export default PlayButton