import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
import { useGetAllGamesQuery } from "../../../redux/api"
import DeleteGameButton from './components/DeleteGameButton';
import ReturnDashButton from '../GamePlay/Shared/ReturnDashButton';
import PlayButton from './components/PlayButton';
import scroll from "../../images/scroll.png"
import NoGamesAlert from './components/NoGamesAlert';
import MobileTheme from '../SizeThemes/MobileTheme';

const SavedGame: React.FC = () => {
    const { isMobile } = MobileTheme();
    const { data, error, isLoading } = useGetAllGamesQuery({});
    if (isLoading) {
        console.log("Loading...")
    }
    if (error) {
        console.log(error)
    }
    console.log(data)
    return (
        <div>
            <ReturnDashButton />
            {data && data.length === 0
                ?
                <div>
                   <NoGamesAlert />
                </div>
                :
                <div>
                    <Box>
                        <Stack
                            direction="row"
                            flexWrap="wrap"
                        >
                            {data && data.map((game: any) => (
                                <div key={game.id}>
                                    <Box sx={{
                                        backgroundImage: `url(${scroll})`,
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        width: isMobile ? "95vw" : 550,
                                        py: isMobile ? 1 : 5,
                                    }}>
                                        <DeleteGameButton gameId={game.id} />
                                        <Typography
                                            sx={{ fontFamily: "fantasy", textAlign: "center" }}
                                            variant={isMobile ? "h5" : "h4"}>
                                            {game.name}
                                        </Typography>
                                        <Typography sx={{ fontFamily: "fantasy", textAlign: "center" }}>
                                            {game.roles.length} player game
                                        </Typography>
                                        <Typography sx={{ textAlign: "center" }}>
                                            <Box sx={{ my: isMobile ? 1 : 3 }}>
                                                <Link to={`/story_teller/my_game/${game.id}`}>
                                                    <PlayButton gameId={game.id} />
                                                </Link>
                                            </Box>
                                        </Typography>
                                    </Box>
                                </div>
                            ))}
                        </Stack>
                    </Box>
                </div>
            }

        </div>
    )
}
export default SavedGame