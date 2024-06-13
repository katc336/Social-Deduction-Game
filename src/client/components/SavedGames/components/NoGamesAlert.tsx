import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import scroll from "../../../images/scroll.png"
import { Link } from 'react-router-dom';

const NoGamesAlert: React.FC = () => {
    return (
        <div>
            <Box sx={{
                backgroundImage: `url(${scroll})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: 250,
                width: 600,
                py: 10,
                mx: 50,
            }}>
                <Typography
                    variant="h3"
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