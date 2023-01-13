import Heading from "../heading/heading";
import { useDispatch, useSelector } from "react-redux";
import {
  setAngleUnit,
  setBoldFont,
  setCopySynopsisOnClick,
  setDecimalPlaces,
  setExcludeInfoInProtocol,
  setFontSize,
  setLanguage,
  setNumberFormat,
  setTheme,
} from "@stores/slices/settings";
import { ConfigRootState } from "@stores/config-store";
import Listbox from "../listbox/listbox";
import Switch from "../switch/switch";
import DecimalPlacesListbox from "../decimal-places-listbox/decimal-places-listbox";

export default function DefaultSettings() {
  const dispatch = useDispatch();
  const language = useSelector(
    (state: ConfigRootState) => state.settings.language
  );
  const boldFont = useSelector(
    (state: ConfigRootState) => state.settings.boldFont
  );
  const copySynopsisOnClick = useSelector(
    (state: ConfigRootState) => state.settings.copySynopsisOnClick
  );
  const excludeInfoInProtocol = useSelector(
    (state: ConfigRootState) => state.settings.excludeInfoInProtocol
  );
  const theme = useSelector((state: ConfigRootState) => state.settings.theme);
  const fontSize = useSelector(
    (state: ConfigRootState) => state.settings.fontSize
  );
  const decimalPlaces = useSelector(
    (state: ConfigRootState) => state.settings.decimalPlaces
  );
  const numberFormat = useSelector(
    (state: ConfigRootState) => state.settings.numberFormat
  );
  const angleUnit = useSelector(
    (state: ConfigRootState) => state.settings.angleUnit
  );

  return (
    <section>
      <Heading>Default Settings</Heading>
      <Heading type={2}>Interface</Heading>
      <Listbox
        label="Language"
        onChange={(v: string) => dispatch(setLanguage(v))}
        value={language}
        options={[
          { label: "English", value: "en" },
          { label: "German", value: "de" },
        ]}
      />
      <Switch
        enabled={boldFont}
        label="Bold font"
        onChange={(v: boolean) => dispatch(setBoldFont(v))}
      />
      <Switch
        enabled={copySynopsisOnClick}
        label="Copy manual content by clicking"
        onChange={(v: boolean) => dispatch(setCopySynopsisOnClick(v))}
      />
      <Switch
        enabled={excludeInfoInProtocol}
        label="Exclude info in protocol"
        onChange={(v: boolean) => dispatch(setExcludeInfoInProtocol(v))}
      />

      <Heading type={2}>Appearance</Heading>
      <Listbox
        label="Theme"
        onChange={(v: string) => dispatch(setTheme(v))}
        value={theme}
        options={[
          { label: "Light", value: "light" },
          { label: "Dark", value: "dark" },
        ]}
      />
      <Listbox
        label="Font size"
        onChange={(v: string) => dispatch(setFontSize(v))}
        value={fontSize}
        options={[
          { label: "Small", value: "small" },
          { label: "Medium", value: "medium" },
          { label: "Large", value: "large" },
        ]}
      />

      <Heading type={2}>Calculator</Heading>
      <DecimalPlacesListbox
        value={decimalPlaces}
        onChange={(v: number) => dispatch(setDecimalPlaces(v))}
      />
      <Listbox
        label="Number format"
        onChange={(v: string) => dispatch(setNumberFormat(v))}
        value={numberFormat}
        options={[
          { label: "Default", value: "default" },
          { label: "English", value: "en" },
          { label: "German", value: "de" },
        ]}
      />
      <Listbox
        label="Angle unit"
        onChange={(v: string) => setAngleUnit(v)}
        value={angleUnit}
        options={[
          { label: "Degrees", value: "degrees" },
          { label: "Radians", value: "radians" },
        ]}
      />
    </section>
  );
}
