import { useContext } from "react";
import { GlobalContext } from "../context";
import serverProvider from "../service";

const useUser = () => {
    const { state, update } = useContext(GlobalContext);

    const signUp = async (userData: any) => {
        const result = await serverProvider.signUp(userData);
        alert("SignUp Successfully");
        console.log(result);
    }

    const login = async (userData: any) => {
        const result = await serverProvider.login(userData);
        console.log("result", result);
        localStorage.setItem("userData", JSON.stringify(result));
        getUserData();
    }

    const logOut = () => {
        update({ userData: null });
        localStorage.removeItem("userData");
    }

    const getUserData = () => {
        const userData = localStorage.getItem("userData");
        console.log("userData", userData);
        if (userData) {
            const user = JSON.parse(userData);
            console.log("user", user);
            update({ userData: user });
        } else {
            console.log("userData is null");
            update({ userData: null });
        }
        console.log("state.userData", state.userData);
    }

    return {
        userData: state.userData,
        signUp,
        login,
        logOut,
        getUserData
    }
}

export default useUser;