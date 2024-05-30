
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import { useGetSingleGameQuery } from "../../../../redux/api";
import ReturnDashButton from "../Shared/ReturnDashButton";
const PlayGame = () => {
    const { gameId } = useParams();
    const id = Number(gameId);
    const { data, error, isLoading } = useGetSingleGameQuery(id);
    if (isLoading) {
        console.log("Loading...");
    }
    if (data) {
        console.log(data)
    }
    if (error) {
        console.error(error);
    }
    const calculateX = (index: number, total: number) => {
        const angle = (index / total) * Math.PI * 2;
        return Math.cos(angle) * 300 + 700; //radius
    }
    const calculateY = (index: number, total: number) => {
        const angle = (index / total) * Math.PI * 2;
        return Math.sin(angle) * 300 + 500; //radius
    }
    return (
        <div>
            <ReturnDashButton />
            <Typography 
            variant="h3"
            sx={{ fontWeight: "bold", color: "#FFFBE8", fontFamily: "fantasy", textAlign: "center" }}>
                {data && data.name}
            </Typography>
            {data && data.players.map((player: any, index: number) => {
                const role = data.roles.find((role: any) => role.roleId === player.roleId);
                return (
                    <div key={player.playerId}>
                        <Card
                            elevation={10}
                            sx={{
                                backgroundImage: "radial-gradient(circle,#ffdac4,#ffdac4,#ffdac4,#ffdac4, #ffdac4, #ffd9b7, #ffd8a9, #ffd99b, #ffda8d, #f8c27a, #f0ab6a, #e7935d, #c66156, #993550, #631348, #280138)",
                                position: "absolute",
                                left: calculateX(index, data.roles.length),
                                top: calculateY(index, data.roles.length),
                                width: 120,
                                height: 120,
                                borderRadius: 100
                            }}>
                            <Box
                                sx={{
                                    fontFamily: "fantasy",
                                    textAlign: "center",
                                    my: 3
                                }}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontFamily: "fantasy" }}>
                                    {player.name}
                                </Typography>
                                <Typography sx={{ fontFamily: "fantasy" }}>
                                    {role.name}
                                </Typography>
                            </Box>
                        </Card>
                    </div>
                );
            })}
        </div>
    )
}
export default PlayGame