import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MobileTheme from "../../SizeThemes/MobileTheme"
import scroll from "../../../images/scroll.png"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteAllPlayersMutation } from "../../../../redux/api";

const StartNewGameAlert: React.FC = () => {
    const { isMobile } = MobileTheme();
    const { gameId } = useParams();
    const navigate = useNavigate();
    const id = Number(gameId);
    const [deleteAllPlayers] = useDeleteAllPlayersMutation();

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            event.preventDefault();
            console.log("Delete")
            const result = await deleteAllPlayers(id)
            console.log(result);
            navigate(`/story_teller/char-select/${id}`)
        } catch (error) {
            console.error(error);
        }
    }

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
                    <Link to={`/story_teller/${id}`}>
                        <button
                            className="nav2-button">
                            Resume Game
                        </button>
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="nav2-button">
                        Start New Game
                    </button>
                </Stack>
            </Box>

        </div>
    )
}
export default StartNewGameAlert