import { useHotkeys } from 'react-hotkeys-hook';

export default function useHotkey(hotkey: string, callback: () => void) {
  useHotkeys(hotkey, callback, { enableOnFormTags: ['INPUT'] });
}
