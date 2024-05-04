import AddRoles from "./AddRoles"
import { useParams } from "react-router-dom"
import { useGetSingleGameQuery } from "../../../redux/api";

const GameSetUp: React.FC = () => {
    const { gameId } = useParams();
    const id = Number(gameId);
    
    const { data, error, isLoading } = useGetSingleGameQuery(id);
    if (isLoading){
        console.log("Loading...");
    }
    if (error) {
        console.error(error);
    }
    if (data) {
        console.log(data);
    }
    return (
        <div>
            <AddRoles/>
        </div>
    )
}
export default GameSetUp