import { SHIPMENT_STATUS } from '@/constants/shipment-status'
import { HiHome } from 'react-icons/hi'

const ROOTS = {
  ROOT: '/',
  AUTH: '/auth',
  SETTINGS: '/settings',
  NEWS: '/news',
  TASKS: '/tasks',
  PRODUCTS: '/products',
  HELP: '/help',
  PRIVACY: '/privacy',
  TERMS: '/terms',
}

export const paths = {
  root: ROOTS.ROOT,
  auth: {
    signIn: `${ROOTS.AUTH}/sign-in`,
  },
  settings: {
    root: ROOTS.SETTINGS,
    breadcrumb: {
      matchPath: `${ROOTS.SETTINGS}`,
      paths: [
        {
          label: '首頁',
          href: ROOTS.ROOT,
        },
        {
          label: '會員專區',
          href: `${ROOTS.SETTINGS}`,
        },
      ],
    },
    children: {
      profile: {
        nav: {
          title: '會員資料',
          path: `${ROOTS.SETTINGS}/profile`,
          enabled: true,
        },
        breadcrumb: {
          matchPath: `${ROOTS.SETTINGS}/profile`,
          paths: [
            {
              label: '首頁',
              href: ROOTS.ROOT,
            },
            {
              label: '會員專區',
              href: `${ROOTS.SETTINGS}`,
            },
          ],
        },
      },
      points: {
        children: {
          transactions: {
            nav: {
              title: '點數兌換紀錄',
              path: `${ROOTS.SETTINGS}/points/transactions`,
              enabled: true,
            },
            breadcrumb: {
              matchPath: `${ROOTS.SETTINGS}/points/transactions`,
              paths: [
                {
                  label: '首頁',
                  href: ROOTS.ROOT,
                },
                {
                  label: '會員專區',
                  href: `${ROOTS.SETTINGS}`,
                },
              ],
            },
          },
        },
      },
      redeem: {
        children: {
          'virtual-treasure': {
            children: {
              history: {
                nva: {
                  title: '虛寶兌換紀錄',
                  path: `${ROOTS.SETTINGS}/redeem/virtual-treasure/history`,
                  enabled: true,
                },
                breadcrumb: {
                  matchPath: `${ROOTS.SETTINGS}/redeem/virtual-treasure/history`,
                  paths: [
                    {
                      label: '首頁',
                      href: ROOTS.ROOT,
                    },
                    {
                      label: '會員專區',
                      href: `${ROOTS.SETTINGS}`,
                    },
                  ],
                },
              },
              detail: {
                nav: {
                  title: '虛寶兌換詳細資訊',
                  path: `${ROOTS.SETTINGS}/redeem/virtual-treasure/detail`,
                  enabled: true,
                },
                breadcrumb: {
                  matchPath: `${ROOTS.SETTINGS}/redeem/virtual-treasure/detail/[id]`,
                  paths: [
                    {
                      label: '首頁',
                      href: ROOTS.ROOT,
                    },
                    {
                      label: '會員專區',
                      href: `${ROOTS.SETTINGS}`,
                    },
                    {
                      label: '虛寶兌換紀錄',
                      href: `${ROOTS.SETTINGS}/redeem/virtual-treasure/history`,
                    },
                  ],
                },
              },
            },
          },
        },
      },
      'e-tickets': {
        nav: {
          title: '我的電子票券',
          path: `${ROOTS.SETTINGS}/e-tickets`,
          enabled: false,
        },
        breadcrumb: {
          matchPath: `${ROOTS.SETTINGS}/e-tickets`,
          paths: [
            {
              label: '首頁',
              href: ROOTS.ROOT,
            },
          ],
        },
      },
      'shipment-tracking': {
        defaultQuery: `?status=${SHIPMENT_STATUS.PENDING.code}`,
        nav: {
          title: '實體好禮出貨查詢',
          path: `${ROOTS.SETTINGS}/shipment-tracking`,
          enabled: true,
        },
        breadcrumb: {
          matchPath: `${ROOTS.SETTINGS}/shipment-tracking`,
          paths: [
            {
              label: '首頁',
              href: ROOTS.ROOT,
            },
            {
              label: '會員專區',
              href: `${ROOTS.SETTINGS}`,
            },
          ],
        },
        children: {
          detail: {
            nav: {
              title: '實體好禮出貨詳細資訊',
              path: `${ROOTS.SETTINGS}/shipment-tracking/detail`,
              enabled: true,
            },
            breadcrumb: {
              matchPath: `${ROOTS.SETTINGS}/shipment-tracking/detail/[id]`,
              paths: [
                {
                  label: '首頁',
                  href: ROOTS.ROOT,
                },
                {
                  label: '會員專區',
                  href: `${ROOTS.SETTINGS}`,
                },
                {
                  label: '實體好禮出貨查詢',
                  href: `${ROOTS.SETTINGS}/shipment-tracking`,
                },
              ],
            },
          },
        },
      },
    },
  },
  news: {
    root: `${ROOTS.NEWS}`,
    scopeNode: {
      title: '最新消息',
      path: `${ROOTS.NEWS}`,
      enabled: false,
      scopes: ['header', 'footer', 'sidebar'],
    },
    breadcrumb: {
      matchPath: `${ROOTS.NEWS}`,
      paths: [
        {
          label: '首頁',
          href: ROOTS.ROOT,
        },
        {
          label: '最新消息',
          href: ROOTS.NEWS,
        },
      ],
    },
  },
  tasks: {
    root: `${ROOTS.TASKS}`,
    scopeNode: {
      title: '任務專區',
      path: `${ROOTS.TASKS}`,
      enabled: false,
      scopes: ['header', 'footer', 'sidebar'],
    },
    breadcrumb: {
      matchPath: `${ROOTS.TASKS}`,
      paths: [
        {
          label: '首頁',
          href: ROOTS.ROOT,
        },
        {
          label: '任務專區',
          href: ROOTS.TASKS,
        },
      ],
    },
  },
  products: {
    root: `${ROOTS.PRODUCTS}`,
    scopeNode: {
      title: '包鑽商城',
      path: `${ROOTS.PRODUCTS}`,
      enabled: true,
      scopes: ['header', 'sidebar'],
    },
    breadcrumb: {
      matchPath: `${ROOTS.PRODUCTS}`,
      paths: [
        {
          icon: HiHome,
          label: '首頁',
          href: ROOTS.ROOT,
        },
        {
          label: '包鑽商城',
          href: ROOTS.PRODUCTS,
        },
      ],
    },
    children: {
      choice: {
        breadcrumb: {
          matchPath: `${ROOTS.PRODUCTS}/[id]`,
          paths: [
            {
              label: '首頁',
              href: ROOTS.ROOT,
            },
            {
              label: '包鑽商城',
              href: ROOTS.PRODUCTS,
            },
          ],
        },
      },
      checkout: {
        breadcrumb: {
          matchPath: `${ROOTS.PRODUCTS}/[id]/checkout`,
          paths: [
            {
              label: '首頁',
              href: ROOTS.ROOT,
            },
            {
              label: '包鑽商城',
              href: ROOTS.PRODUCTS,
            },
          ],
        },
      },
      complete: {
        breadcrumb: {
          matchPath: `${ROOTS.PRODUCTS}/[id]/complete`,
          paths: [
            {
              label: '首頁',
              href: ROOTS.ROOT,
            },
            {
              label: '包鑽商城',
              href: ROOTS.PRODUCTS,
            },
          ],
        },
      },
    },
  },
  help: {
    root: `${ROOTS.HELP}`,
    scopeNode: {
      title: '常見問題',
      path: `${ROOTS.HELP}`,
      enabled: false,
      scopes: ['header', 'footer', 'sidebar'],
    },
    breadcrumb: {
      matchPath: `${ROOTS.HELP}`,
      paths: [
        {
          label: '首頁',
          href: ROOTS.ROOT,
        },
        {
          label: '常見問題',
          href: ROOTS.HELP,
        },
      ],
    },
  },
  privacy: {
    root: `${ROOTS.PRIVACY}`,
    scopeNode: {
      title: '隱私條款',
      path: `${ROOTS.PRIVACY}`,
      enabled: true,
      scopes: ['footer'],
    },
  },
  terms: {
    root: `${ROOTS.TERMS}`,
    scopeNode: {
      title: '使用合約',
      path: `${ROOTS.TERMS}`,
      enabled: true,
      scopes: ['footer'],
    },
  },
}

export type BreadcrumbItem = {
  icon?: React.ComponentType<{ className?: string; size?: number; stroke?: number }>
  href: string | null
  label: string
}

type UnknownRecord = Record<string, unknown>

type CompiledEntry = {
  matchPath: string
  regex: RegExp
  dynamic: boolean
  score: number
  paths: BreadcrumbItem[]
}

const isRecord = (v: unknown): v is UnknownRecord => typeof v === 'object' && v !== null

const hasBreadcrumb = (
  v: UnknownRecord
): v is { breadcrumb: { matchPath: string; paths: BreadcrumbItem[] } } => {
  const bc = v['breadcrumb']
  return isRecord(bc) && typeof bc['matchPath'] === 'string' && Array.isArray(bc['paths'])
}

const getChildren = (v: UnknownRecord): Record<string, unknown> | null => {
  const c = v['children']
  return isRecord(c) ? (c as Record<string, unknown>) : null
}

const isDynamicPattern = (pattern: string): boolean => /(\*|:[A-Za-z0-9_]+|\[.+?\])/.test(pattern)

// 將 matchPath 編譯成「全字串」正則；支援 [id]、:id、*
const compilePattern = (pattern: string): RegExp => {
  const escaped = pattern
    .replace(/[-/\\^$+?.()|[\]{}]/g, '\\$&')
    .replace(/\\\*/g, '.*')
    .replace(/\\\:([A-Za-z0-9_]+)/g, '[^/]+')
    .replace(/\\\[(.+?)\\\]/g, '[^/]+')
  return new RegExp(`^${escaped}$`)
}

// 具體度：靜態段越多越高；同分以長度較長者優先
const specificityScore = (pattern: string): number => {
  const segments = pattern.split('/').filter(Boolean)
  let score = 0
  segments.forEach((seg) => {
    if (seg !== '*' && !seg.startsWith(':') && !(seg.startsWith('[') && seg.endsWith(']'))) {
      score += 2
    }
  })
  return score * 1000 + pattern.length
}

const BREADCRUMB_ENTRIES: CompiledEntry[] = (() => {
  const entries: CompiledEntry[] = []

  const visit = (node: unknown) => {
    if (!isRecord(node)) return

    if (hasBreadcrumb(node)) {
      const src = node.breadcrumb.matchPath
      const dynamic = isDynamicPattern(src)
      entries.push({
        matchPath: src,
        regex: compilePattern(src),
        dynamic,
        score: specificityScore(src),
        paths: node.breadcrumb.paths,
      })
    }

    const children = getChildren(node)
    if (children) Object.values(children).forEach(visit)

    Object.entries(node).forEach(([key, value]) => {
      if (key !== 'children' && key !== 'breadcrumb') visit(value)
    })
  }

  visit(paths)

  // 先依具體度排序（高→低）
  return entries.sort((a, b) => b.score - a.score)
})()

export const getBreadcrumbByPath = (pathname: string): BreadcrumbItem[] => {
  // 1) 完全精準（僅限非動態 pattern）
  const exact = BREADCRUMB_ENTRIES.find((e) => !e.dynamic && e.matchPath === pathname)
  if (exact) return exact.paths

  // 2) 全字串正則比對（支援動態段）
  const match = BREADCRUMB_ENTRIES.find((e) => e.regex.test(pathname))
  return match ? match.paths : []
}

export const getSettingsNav = () => {
  const s = paths.settings.children

  const items = [
    { title: s.profile.nav.title, path: s.profile.nav.path, enabled: s.profile.nav.enabled },
    {
      title: s.points.children.transactions.nav.title,
      path: s.points.children.transactions.nav.path,
      enabled: s.points.children.transactions.nav.enabled,
    },
    {
      title: s['e-tickets'].nav.title,
      path: s['e-tickets'].nav.path,
      enabled: s['e-tickets'].nav.enabled,
    },
    {
      title: s['shipment-tracking'].nav.title,
      path: s['shipment-tracking'].nav.path,
      enabled: s['shipment-tracking'].nav.enabled,
      defaultQuery: s['shipment-tracking'].defaultQuery,
    },
    {
      title: s.redeem.children['virtual-treasure'].children.history.nva.title,
      path: s.redeem.children['virtual-treasure'].children.history.nva.path,
      enabled: s.redeem.children['virtual-treasure'].children.history.nva.enabled,
    },
  ]

  return items
    .filter((i) => i.enabled !== false)
    .map((i) => ({
      title: i.title,
      href: i.defaultQuery ? `${i.path}${i.defaultQuery}` : i.path,
    }))
}

// ------------------------------------------------

type NavScope = 'header' | 'footer' | 'sidebar' | 'category'

type NavNode = {
  title: string
  path: string
  enabled?: boolean
  defaultQuery?: string
  scopes?: NavScope[] // 新增：宣告在哪些區塊顯示
  children?: Record<string, NavNode>
}

export const collectNavByScope = (scope: NavScope) => {
  const result: { title: string; href: string }[] = []

  const traverse = (node: NavNode | undefined) => {
    if (!node) return
    if (node.enabled !== false && node.scopes?.includes(scope)) {
      result.push({
        title: node.title,
        href: node.defaultQuery ? `${node.path}${node.defaultQuery}` : node.path,
      })
    }
    if (node.children) Object.values(node.children).forEach(traverse)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.values(paths).forEach((entry: any) => traverse(entry.scopeNode))
  return result
}
