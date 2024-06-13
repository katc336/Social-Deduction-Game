import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteRoleMutation } from '../../../../redux/api';

const DeleteRoleButton: React.FC<RoleIdProps> = ({ roleId }) => {
    const [deleteRole] = useDeleteRoleMutation();

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            event.preventDefault();
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
            <button
                className="blank-button"
                onClick={handleDelete}>
                <DeleteForeverIcon />
            </button>
        </div>
    )
}
export default DeleteRoleButton