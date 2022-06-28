import useSessionStore from '../stores/session-store/use-session-store';

export default function useCurrentInput() {
  return useSessionStore((state) => state.session.input);
}
