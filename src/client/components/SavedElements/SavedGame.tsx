import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
import { useGetAllGamesQuery } from "../../../redux/api"
import DeleteGameButton from './components/DeleteGameButton';
import ReturnDashButton from '../GameSetupPage/ReturnDashButton';
import PlayButton from './components/PlayButton';


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
            <Box>
                <Stack
                    direction="row"
                    flexWrap="wrap"
                >
                    {data && data.map((game: any) => (
                        <div key={game.id}>
                            <Card sx={{ m: 1, p: 1, width: 180 }}>
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
                                    <Link to={`/story_teller/my_game/${game.id}`}>
                                        <PlayButton gameId={game.id} />
                                    </Link>
                                </Typography>
                            </Card>
                        </div>
                    ))}
                </Stack>
            </Box>

        </div>
    )
}
export default SavedGame