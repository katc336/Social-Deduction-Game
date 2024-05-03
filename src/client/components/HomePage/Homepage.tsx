import LoginForm from "./components/LoginInForm"
import { useState } from "react"
const HomePage: React.FC = () => {
    const [login, setLogin] = useState(true);
    const [register, setRegister] = useState(false)
    return (
        <div>
            <LoginForm />
        </div>
    )
}
export default HomePage