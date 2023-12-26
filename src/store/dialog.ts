import { create } from "zustand";

type SettingType = "Markup" | "Style" | "Script";

interface ShowDialog {
    isShow: boolean;
    type: SettingType;
    setShow: (status: boolean, type: SettingType ) => void;
}

const useShowDialog = create<ShowDialog>((set) => ({
    isShow: false,
    type: "Markup",
    setShow: (status: boolean, type: SettingType) => {
        set((state) => ({ isShow: status,  type: type}))
    }
}))

export {useShowDialog};