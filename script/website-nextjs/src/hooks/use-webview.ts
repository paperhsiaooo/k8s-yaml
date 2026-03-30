import { useSessionStorage } from './use-session-storage'

export const WEBVIEW_SESSION_STORAGE_KEY = 'app-webview-mode'

export function useWebview() {
  const { state: webviewStatue } = useSessionStorage<string>(WEBVIEW_SESSION_STORAGE_KEY, '')
  const isWebviewMode = webviewStatue === 'webview'

  return {
    isWebviewMode,
  }
}
