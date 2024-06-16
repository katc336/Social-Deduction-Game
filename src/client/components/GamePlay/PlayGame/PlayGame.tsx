
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleGameQuery } from "../../../../redux/api";
import ReturnDashButton from "../Shared/ReturnDashButton";
import UpdateRole from "./UpdateRole";
import UpdateDeath from "./UpdateDeath";

const PlayGame: React.FC = () => {
  const [updatePlayer, setUpdatePlayer] = useState(false);
  const { gameId } = useParams();
  const id = Number(gameId);
  const { data, error, isLoading } = useGetSingleGameQuery(id);
  if (isLoading) {
    console.log("Loading...");
    return
  }
  if (data) {
    console.log("Hi!")
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
  // console.log(data)
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
            <Box sx={{
              position: "absolute",
              top: calculateY(index, data.players.length) - 30,
              left: calculateX(index, data.players.length) - 35,
              zIndex: 1
            }}>
              <UpdateDeath playerId={player.playerId} />
            </Box>
            <Card
              onClick={() => {
                console.log(`Clicked on ${player.name}`);
                setUpdatePlayer(player.playerId); // Update here with player.playerId
              }}
              elevation={10}
              sx={{
                backgroundImage: "radial-gradient(circle,#ffdac4,#ffdac4,#ffdac4,#ffdac4, #ffdac4, #ffd9b7, #ffd8a9, #ffd99b, #ffda8d, #f8c27a, #f0ab6a, #e7935d, #c66156, #993550, #631348, #280138)",
                position: "absolute",
                left: calculateX(index, data.players.length),
                top: calculateY(index, data.players.length),
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
                  {role && role.name}
                </Typography>
              </Box>
            </Card>
            {updatePlayer === player.playerId && // Check if updatePlayer matches player.playerId
              <UpdateRole
                playerId={player.playerId}
                gameId={id}
                roleId={player.roleId}
                originalName={player.name}
              />}
          </div>
        );
      })}
    </div>
  )
}
export default PlayGame