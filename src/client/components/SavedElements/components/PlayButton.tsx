import Typography from "@mui/material/Typography";

const PlayButton: React.FC<GameIdProps> = ({ gameId }) => {
    return (
        <div>
            <button className="nav-button">
                <Typography>
                    Play Again
                </Typography>
            </button>
        </div>
    )
}
export default PlayButton