export const SUCCESS_CODE = 10000

export const ERROR_CODE: Record<
  number,
  Record<number, { code: number; customShow: boolean; message: string }>
> = {
  // 包鑽商城
  1: {
    111002: {
      code: 111002,
      customShow: false,
      message: '查無此商品',
    },
    111009: {
      code: 111009,
      customShow: true,
      message: '查無此會員',
    },
    112057: {
      code: 112057,
      customShow: false,
      message: '驗證失敗',
    },
    114001: {
      code: 114001,
      customShow: false,
      message: '點數餘額不足',
    },
    115011: {
      code: 115011,
      customShow: false,
      message: '商品庫存不足',
    },
    116008: {
      code: 116008,
      customShow: false,
      message: '兌換獎項已失效',
    },
    116012: {
      code: 116012,
      customShow: false,
      message: '兌換獎項已失效',
    },
    116013: {
      code: 116013,
      customShow: false,
      message: '兌換獎項已失效',
    },
  },
} as const
