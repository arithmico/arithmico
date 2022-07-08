import { getLoadingLog } from "@arithmico/engine";
import { InfoItem, MathItem } from "../stores/session-store/types";
import useSessionStore from "../stores/session-store/use-session-store";

export default function useProtocol(): (MathItem | InfoItem)[] {
  const excludeInfo = useSessionStore(
    (state) => state.settings.excludeInfoInProtocol
  );
  const history = useSessionStore((state) => state.session.protocol);
  return [
    ...getLoadingLog().map(
      (value) => ({ type: "info", info: value } as InfoItem)
    ),
    ...history,
  ].filter((item) => item.type === "math" || !excludeInfo);
}
