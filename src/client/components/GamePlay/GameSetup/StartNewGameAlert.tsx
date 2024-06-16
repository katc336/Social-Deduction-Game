import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MobileTheme from "../../MobileTheme"
import scroll from "../../../images/scroll.png"
import { useParams } from "react-router-dom";

const StartNewGameAlert: React.FC = () => {
    const isMobile = MobileTheme();
    const { gameId } = useParams();
    const id = Number(gameId);
    return (
        <div>
            <Box sx={{
                backgroundImage: `url(${scroll})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                minHeight: "30vh",
                mx: isMobile ? 1 : 80
            }}>
                <Typography sx={{ mt: 2, textAlign: "center", fontFamily: "fantasy" }}>
                    There is already a game for this script.
                </Typography>
                <Stack direction="row" spacing={2}>
                    <button className="nav2-button">
                        Resume Game
                    </button>
                    <button className="nav2-button">
                        Start New Game
                    </button>
                </Stack>
            </Box>

        </div>
    )
}
export default StartNewGameAlert