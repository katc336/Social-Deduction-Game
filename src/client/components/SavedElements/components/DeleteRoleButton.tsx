import Grid from '@mui/material/Grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteRoleMutation } from '../../../../redux/api';

const DeleteRoleButton: React.FC<GameIdProps> = ({ gameId }) => {
    const [deleteRole] = useDeleteRoleMutation({});

    const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const result = await deleteRole({ roleId: gameId })
            console.log(result)
        } catch (error) {
            console.error(error);
        }
    }
    console.log(gameId)
    return (
        <div>
            <Grid container>
                <Grid item xs={10} />
                <Grid item xs={1}>
                    <button
                        className="blank-button"
                        onClick={() => handleDelete}>
                        <DeleteForeverIcon />
                    </button>
                </Grid>
            </Grid>
        </div>
    )
}
export default DeleteRoleButton