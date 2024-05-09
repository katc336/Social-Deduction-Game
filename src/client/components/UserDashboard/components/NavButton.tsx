import Typography from "@mui/material/Typography"

const NavButton: React.FC<NavButtonProps> = ({ text }) => {
    return (
        <div>
            <button className="nav-button">
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: "center",
                        color: "#1E0542",
                        fontFamily: "fantasy"
                    }}>
                    {text}
                </Typography>
            </button>
        </div>
    )
}
export default NavButton