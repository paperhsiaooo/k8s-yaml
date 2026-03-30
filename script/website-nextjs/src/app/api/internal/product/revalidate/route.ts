import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

type RevalidateRequest = {
  tags: string[]
}

type RevalidateResponse = {
  message: string
  tags: string[]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tags } = body as RevalidateRequest

    if (tags.length === 0) {
      return NextResponse.json({ error: '缺少 tags 參數' }, { status: 400 })
    }

    tags.forEach((tag: string) => {
      revalidateTag(tag)
    })

    return NextResponse.json<RevalidateResponse>(
      { message: `成功重新驗證 ${tags.length} 個 tag`, tags },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to revalidate products', error: error },
      { status: 500 }
    )
  }
}
