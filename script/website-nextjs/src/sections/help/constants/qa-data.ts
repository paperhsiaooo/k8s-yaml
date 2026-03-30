export interface QAItem {
  id: string
  question: string
  answer: string
}

export const QA_DATA: QAItem[] = [
  {
    id: '1',
    question: '如何修改暱稱?',
    answer: '至首頁點選會員中心進入【會員資料】,再點選編輯即可修改帳號暱稱。',
  },
  {
    id: '2',
    question: '如何變更手機號碼?',
    answer: '請至會員中心選擇【會員資料】，點選手機號碼旁的編輯按鈕，依照指示完成驗證即可變更。',
  },
  {
    id: '3',
    question: '在進行手機簡訊驗證時,收不到驗證碼怎麼辦?',
    answer:
      '請檢查手機號碼是否正確，確認手機訊號良好，並檢查簡訊是否被歸類到垃圾訊息。如仍有問題，請聯繫客服協助處理。',
  },
  {
    id: '4',
    question: '如何解綁包你發帳號?',
    answer:
      '請至設定頁面選擇【帳號管理】，找到包你發帳號並點選解綁，依照指示完成驗證即可解除綁定。',
  },
  {
    id: '5',
    question: '客服申請文件在哪裡?',
    answer: '客服申請文件可在會員中心的【客服中心】頁面下載，或直接聯繫客服人員索取相關文件。',
  },
]
