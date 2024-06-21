import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import scroll from "../../../images/scroll.png"
import { Link } from 'react-router-dom';
import MobileTheme from "../../SizeThemes/MobileTheme";

const NoGamesAlert: React.FC = () => {
    const { isMobile } = MobileTheme();
    return (
        <div>
            <Box sx={{
                backgroundImage: `url(${scroll})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: 250,
                width: { xs: 300, sm: 600 },
                py: 10,
                mx: { xs: 3, sm: 50 },
            }}>
                <Typography
                    variant={ isMobile ? "h6" : "h3"}
                    sx={{ mt: 10, textAlign: "center", fontFamily: "fantasy" }}>
                    You have no saved games
                </Typography>
                <Typography
                    sx={{ mt: 3, textAlign: "center" }}>
                    <Link to="/story_teller/new_game">
                        <button className="nav2-button">
                            Create New Game
                        </button>
                    </Link>
                </Typography>
            </Box>
        </div>
    )
}

export default NoGamesAlert