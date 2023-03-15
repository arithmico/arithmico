import { SettingsState } from "./slices/settings";
import { engineFeaturesState } from "./slices/engine-features";

export interface CalculatorProfile {
  settings: SettingsState;
  features: engineFeaturesState;
}

const defaultProfile: CalculatorProfile = JSON.parse(
  // @ts-ignore
  import.meta.env.VITE_CALCULATOR_PROFILE ?? "null"
) ?? {
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
