import { paths } from '@/routes/path'
import { redirect } from 'next/navigation'

function SettingsPage() {
  redirect(paths.settings.children.profile.nav.path)
}

export default SettingsPage
