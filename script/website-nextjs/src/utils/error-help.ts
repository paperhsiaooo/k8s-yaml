import { toast } from 'sonner'

export function handleZodError() {
  const errorMessage = `Server 回傳格式錯誤`
  console.error(errorMessage)
  toast.error(errorMessage)
}
