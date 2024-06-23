import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteRoleMutation } from '../../../../redux/api';
import { useState } from 'react';
import MobileTheme from '../../SizeThemes/MobileTheme';

const DeleteRoleButton: React.FC<RoleIdProps> = ({ roleId }) => {
    const [alert, setAlert] = useState(false)
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
                        onClick={() => setAlert(true)}>
                        <DeleteForeverIcon />
                    </button>
                </Grid>
                <Grid item xs={12}>
                    {alert &&
                        <Alert severity="warning">
                            <Typography>
                                If you delete this role, it will also be removed from all scripts it appears in. Are you sure you want to delete it?
                            </Typography>
                            <Stack direction="row">
                                <button onClick={handleDelete}>
                                    Yes, delete this role
                                </button>
                                <button onClick={() => setAlert(false)}>
                                    No, keep this role
                                </button>
                            </Stack>
                        </Alert>
                    }
                </Grid>
            </Grid>
        </div>
    )
}
export default DeleteRoleButton