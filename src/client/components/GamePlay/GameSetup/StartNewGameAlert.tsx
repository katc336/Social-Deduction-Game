import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import BackspaceIcon from '@mui/icons-material/Backspace';
import MobileTheme from "../../SizeThemes/MobileTheme"
import scroll from "../../../images/scroll.png"
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteAllPlayersMutation } from "../../../../redux/api";

const StartNewGameAlert: React.FC = () => {
    const [alert, setAlert] = useState(false);
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
                minWidth: "60vw",
                mx: isMobile ? 1 : "10vw"
            }}>
                {alert
                    ?
                    <div>
                        <Grid container>
                            <Grid item xs={9} />
                            <Grid item xs={1}>
                                <button
                                    className="blank-button"
                                    onClick={() => setAlert(false)}>
                                    <BackspaceIcon />
                                </button>
                            </Grid>
                            <Grid
                                item xs={12}>
                                <Alert
                                    sx={{ backgroundColor: "transparent", mt: 2, mx: 10 }}
                                    severity="warning">
                                    <Typography sx={{ textAlign: "center", fontFamily: "fantasy" }}>
                                        If you start a new game, the old game's players will be deleted.
                                    </Typography>
                                </Alert>
                            </Grid>
                        </Grid>
                        <Typography sx={{ textAlign: "center" }}>
                            <button
                                onClick={handleDelete}
                                className={isMobile ? "nav2-mobile-button" : "nav2-button"}>
                                Delete Game Forever
                            </button>
                        </Typography>
                    </div>
                    :
                    <div>
                        <Typography
                            variant={isMobile ? "h6" : "h5"}
                            sx={{ my: 2, textAlign: "center", fontFamily: "fantasy" }}>
                            There is already a game with this script.
                        </Typography>
                        <Typography
                            sx={{ textAlign: "center" }}>
                            <Link to={`/story_teller/${id}`}>
                                <button className={isMobile ? "nav2-mobile-button" : "nav2-button"}>
                                    Resume Old Game
                                </button>
                            </Link>
                            <button
                                onClick={() => setAlert(true)}
                                className={isMobile ? "nav2-mobile-button" : "nav2-button"}>
                                Start New Game
                            </button>
                        </Typography>
                    </div>
                }
            </Box>
        </div>
    )
}
export default StartNewGameAlert