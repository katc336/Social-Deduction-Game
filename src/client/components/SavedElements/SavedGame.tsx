import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
                {data && data.map((game: any) => (
                    <div key={game.id}>
                        <Card sx={{ m: 1, p: 1, width: 300 }}>
                            <Grid container>
                                <Grid item xs={11}>
                                    <Typography variant="h6">
                                        {game.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <DeleteGameButton gameId={game.id} />
                                </Grid>
                            </Grid>
                            <Typography>
                                {game.roles.length} player game
                            </Typography>
                            <PlayButton gameId={game.id}/>
                        </Card>
                    </div>
                ))}
            </Box>

        </div>
    )
}
export default SavedGame