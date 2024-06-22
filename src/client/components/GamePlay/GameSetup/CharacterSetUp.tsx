import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import AddRoles from "./AddRoles"
import { useParams, Link } from "react-router-dom"
import { useGetSingleGameQuery } from "../../../../redux/api";
import MobileTheme from "../../SizeThemes/MobileTheme";
import scroll from "../../../images/scroll.png"
import scrollMobile from "../../../images/scrollMobile.png"
import DeleteRoleButton from "./DeleteRoleButton";


const CharacterSetUp: React.FC = () => {
    const { gameId } = useParams();
    const id = Number(gameId);

    const { isMobile } = MobileTheme();

    const { data, error, isLoading } = useGetSingleGameQuery(id);
    if (isLoading) {
        console.log("Loading...");
    }
    if (error) {
        console.error(error);
    }
    if (data) {
        console.log(data);
    }
    return (
        <div>
            <AddRoles gameId={id} />
            <Typography sx={{ textAlign: "center" }}>
                {data && (data.players && data.players.length === 0)
                    ?
                    <div>
                        <Link to={`/story_teller/char-select/${id}`}>
                            <button className={isMobile ? "return-mobile-button" : "return-button"}>
                                <Typography>
                                    Confirm Script
                                </Typography>
                            </button>
                        </Link>
                    </div>
                    :
                    <div>
                        <Link to={`/story_teller/game_start/${id}`}>
                            <button className="return-button">
                                <Typography variant="h6">
                                    Confirm Script
                                </Typography>
                            </button>
                        </Link>
                    </div>
                }
            </Typography>
            <Box sx={{
                backgroundImage: `url(${scrollMobile})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: isMobile ? 600 : 800,
                width: isMobile ? 100 :200,
                my: isMobile ? 1 : 10,
                position: "abosolute",
                mx: isMobile ? "15vw" : "30vw",
                px: 10
            }}>
                <Typography
                    variant={isMobile ? "h6" : "h4"}
                    sx={{
                        fontFamily: "fantasy",
                        textAlign: "center",
                        color: "#1E0542",
                        mb: 1,
                        pt: 7
                    }}>
                    All Roles
                </Typography>
                {data && data.roles.map((role: any) => (
                    <div key={role.roleId}>
                        <Grid container>
                            <Grid item xs={11}>
                                <Typography
                                    sx={{
                                        fontFamily: "fantasy",
                                        textAlign: "center",
                                        my: 1,
                                        fontSize: isMobile ? 14 : 20
                                    }}>
                                    {role.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <DeleteRoleButton roleId={role.roleId} />
                            </Grid>
                        </Grid>
                    </div>
                ))}
            </Box>
        </div>
    )
}
export default CharacterSetUp