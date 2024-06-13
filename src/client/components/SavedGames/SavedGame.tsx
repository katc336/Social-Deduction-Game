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

const SavedGame: React.FC = () => {
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
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        width: 550,
                                        py: 5,
                                        m: 1,
                                    }}>
                                        <DeleteGameButton gameId={game.id} />
                                        <Typography
                                            sx={{ textAlign: "center" }}
                                            variant="h5">
                                            {game.name}
                                        </Typography>
                                        <Typography sx={{ textAlign: "center" }}>
                                            {game.roles.length} player game
                                        </Typography>
                                        <Typography sx={{ textAlign: "center" }}>
                                            <Box sx={{ mt: 3 }}>
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