import { createContext, useReducer } from "react";
import type {
  reactChildrenNodeAttributes,
  settingContextAttributes,
  settingInitialStateAttributes,
} from "../../utilities/types.declarationts";
import { SettingReducer } from "./settings.reducer";

const initialSettingState: settingInitialStateAttributes = {
  isSideBar: false, //for places that sidebar is emabled but for mobile show or hide
  isTheme: "light",
  isLoading: false,
};
export const settingContext = createContext<settingContextAttributes>({
  settingsState: initialSettingState,
  settingDispatch: () => null,
});

export const SettingProvider = ({ children }: reactChildrenNodeAttributes) => {
  const [settingsState, settingDispatch] = useReducer(
    SettingReducer,
    initialSettingState
  );

  return (
    <settingContext.Provider value={{ settingsState, settingDispatch }}>
      {children}
    </settingContext.Provider>
  );
};
