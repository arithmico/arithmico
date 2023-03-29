import { MathItem } from '../stores/session-store/types';
import useSessionStore from '../stores/session-store/use-session-store';

export default function useCurrentOutput() {
  const outputResetted = useSessionStore((state) => state.session.outputResetted);
  const mathItems = useSessionStore((state) =>
    state.session.protocol.filter((hItem) => hItem.type === 'math')
  ) as MathItem[];
  return !outputResetted && mathItems.length > 0 ? mathItems[mathItems.length - 1].output : '';
}
