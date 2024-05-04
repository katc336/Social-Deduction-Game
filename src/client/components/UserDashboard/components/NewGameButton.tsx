import { Link } from "react-router-dom"

const NewGameButton: React.FC = () => {
    return (
        <div>
            <Link to={"/story_teller/new_game"}>
                <button>
                    New Game
                </button>
            </Link>
        </div>
    )
}
export default NewGameButton