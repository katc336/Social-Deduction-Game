interface RootState {
    auth: {
        token: string
    }
}
interface GameIdProps {
    gameId: number;
 }

 interface PlayerIdProps {
    playerId: number;
    originalName: string;
    gameId: number;
    roleId: string;
 }
 
interface NavButtonProps {
    text: string;
 }
 

type SwitchForm = {
    switchForm: any
}