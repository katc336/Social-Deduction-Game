import Grid from '@mui/material/Grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteRoleMutation } from '../../../../redux/api';
import MobileTheme from '../../SizeThemes/MobileTheme';

const DeleteRoleButton: React.FC<RoleIdProps> = ({ roleId }) => {
    const [deleteRole] = useDeleteRoleMutation();
    const { isMobile } = MobileTheme();
    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            console.log("Delete")
            const result = await deleteRole(Number(roleId))
            console.log(result)
        } catch (error) {
            console.error(error);
        }
    }
    console.log(roleId)
    return (
        <div>
            <Grid container>
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
export default DeleteRoleButton