import React, { createContext, useState, useRef } from "react";

export const GlobalContext = createContext<any>({})
const initState = {
    isInitializeLoding: true,
    isGenerateLoading: false,
    isLoading: true,
    courses: [],
    userData: null,
    chatHistory: [],
}

const ContextProvider = ({ children }: any) => {
    const [state, setState] = useState(initState)
    const stateRef = useRef(state);

    const update = (newState: any) => {
        setState(prevState => {
            const updatedState = { ...prevState, ...newState }
            stateRef.current = updatedState;
            return updatedState
        })
    }

    return (
        <GlobalContext.Provider
            value={{ state, stateRef, update }}
        >
            {children}
        </GlobalContext.Provider>
    )

};


export default ContextProvider