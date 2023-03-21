import { Profile } from "@arithmico/engine/lib/types";
import { SettingsState } from "./slices/settings";

export interface CalculatorProfile {
  settings: SettingsState;
  loadingMode: Profile["loadingMode"];
  loadingList: Profile["loadingList"];
}

const defaultProfile: CalculatorProfile = JSON.parse(
  // @ts-ignore
  import.meta.env.VITE_CALCULATOR_PROFILE ?? "null"
) ?? {
  loadingMode: "blacklist",
  loadingList: [],
  settings: {
    language: "de",
    numberFormat: "de",
    angleUnit: "degrees",
    decimalPlaces: 5,
    theme: "light",
    fontSize: "medium",
    boldFont: false,
    copySynopsisOnClick: false,
  },
};

export default defaultProfile;
