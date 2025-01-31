import { useContext } from "react";
import { AppContext } from "../context/app-context";

export default function useAppContext() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("NEEDS APP-PROVIDER")
    }
    return context;
}
