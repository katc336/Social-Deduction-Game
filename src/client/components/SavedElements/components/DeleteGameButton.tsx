import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const DeleteGameButton: React.FC<GameIdProps> = ({ gameId }) => {
    return (
        <div>
            <button className="blank-button">
                <DeleteForeverIcon />
            </button>
        </div>
    )
}
export default DeleteGameButton