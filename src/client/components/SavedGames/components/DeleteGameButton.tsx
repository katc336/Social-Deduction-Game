import Grid from '@mui/material/Grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteGameMutation } from '../../../../redux/api';
import MobileTheme from '../../SizeThemes/MobileTheme';

const DeleteGameButton: React.FC<GameIdProps> = ({ gameId }) => {
    const [deleteGame] = useDeleteGameMutation();
    const { isMobile } = MobileTheme();
    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            event.preventDefault();
            console.log("Delete")
            const result = await deleteGame(Number(gameId))
            console.log(result)
        } catch (error) {
            console.error(error);
        }
    }
    console.log(gameId)
    return (
        <div>
            <Grid
                sx={{ mt: isMobile ? 3 : "" }}
                container>
                <Grid item xs={10} />
                <Grid item xs={1}>
                    <button
                        className="blank-button"
                        onClick={handleDelete}>
                        <DeleteForeverIcon />
                    </button>
                </Grid>
            </Grid>
        </div>
    )
}
export default DeleteGameButton