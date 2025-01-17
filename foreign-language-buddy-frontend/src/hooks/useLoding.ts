import { useContext } from "react";
import { GlobalContext } from "../context";

const useLoading = () => {
    const { state, update } = useContext(GlobalContext);
   
    const isLodingTrue = () => {
        update({ isLoading: true });
    }

    const isLodingFalse = () => {
        update({ isLoading: false });
    }

    const isGenerateLoadingTrue = () => {
        update({ isGenerateLoading: true });
    }

    const isGenerateLoadingFalse = () => {
        update({ isGenerateLoading: false });
    }

    const isInitializeLodingTrue = () => {
        update({ isInitializeLoding: true });
    }

    const isInitializeLodingFalse = () => {
        update({ isInitializeLoding: false });
    }

    return {
        isLoading: state.isLoading,
        isGenerateLoading: state.isGenerateLoading,
        isInitializeLoding: state.isInitializeLoding,

        isLodingTrue,
        isLodingFalse,
        isGenerateLoadingTrue,
        isGenerateLoadingFalse,
        isInitializeLodingTrue,
        isInitializeLodingFalse
    }
}

export default useLoading;