import { CONFIG } from '@/config-global'

function PrivacyView() {
  return (
    <div className="bg-yile-100 footer-padding">
      <div className="wrapper my-12 break-all">
        <h1 className="text-2xl font-bold text-center privacy-item">隱私條款</h1>
        <div className="privacy-item">
          <p className="leading-relaxed tracking-widest font-noto-sans-tc">
            本隱私權條款適用於嘉璟股份有限公司（下稱「本公司」或「我們」）於【包鑽】
            集點平台（下稱「本平台」）提供的集點服務，為了保障您的線上隱私，讓您能夠
            安心使用本平台為您所提供的各項服務，我們在此先向您說明並告知個人資料保
            護法規定之事項，幫助您了解當您使用本平台的各項服務時，對於您個人資料處
            理的原則與政策，以及資料蒐集及利用的範圍與目的，如果您不具備完全行為能
            力，請務必經由法定代理人閱讀並同意以下條款後再使用我們的服務！
          </p>
        </div>
        <ul className="privacy-item">
          <li>
            <p className="privacy-sub-title">A. 個人資料之蒐集政策</p>
            <div className="pl-6">
              <div className="privacy-array">
                <p className="privacy-no">1.</p>
                <p>蒐集之目的：代號 ○ 九 ○ 消費者、客戶管理與服務。</p>
              </div>

              <div className="privacy-array">
                <p className="privacy-no">2.</p>
                <p>
                  個人資料之類別：姓名、住址、電話、電子郵件地址、網路平臺申請之帳號、相片、身分證統一編號、出生年月日、結婚有無、配偶及父母之姓名、以及其它任何可辨識您本人之資料。
                </p>
              </div>

              <div className="privacy-array">
                <p className="privacy-no">3.</p>
                <p>
                  當您選擇使用第三方提供之身分驗證機制（例如 Facebook 帳號、Google
                  帳號等方式）申請成為本應用程式之會員，我們會透過該身分驗證機制取得您在該等帳號中同意揭露之個人資料。
                </p>
              </div>

              <div className="privacy-array">
                <p className="privacy-no">4.</p>
                <p>
                  除了上述資料外，如果您透過電子郵件或通訊軟體反應您的意見或詢問相關業務問題，我們會保存您的通訊記錄。我們也會保留您在使用本應用程式時，由伺服器自動進行的相關記錄，包括連線設備的
                  IP
                  位址、使用時間、使用的裝置、作業系統類型及版本編號、實際位置、瀏覽及點選資料紀錄等。
                </p>
              </div>

              <div className="privacy-array">
                <p className="privacy-no">5.</p>
                <p>
                  個人資料利用之期間、地區、對象及方式：
                  <br />
                  (1) 期間：蒐集目的之存續期間或相關法令規定之保存期限，以較長者為準。
                  <br />
                  (2)
                  地區：除蒐集目的涉及國際業務或活動外，本公司僅於中華民國領域內利用您的個人資料。
                  <br />
                  (3) 對象：本公司、依法令規定之相關主管機關。
                  <br />
                  (4) 方式：符合個人資料保護相關法令以自動化機器或其他非自動化之利用方式。
                </p>
              </div>

              <div className="privacy-array">
                <p className="privacy-no">6.</p>
                <p>
                  您可透過客服信箱（
                  <a
                    className="underline underline-offset-2 text-blue-700"
                    href={`mailto:${CONFIG.site.serviceEmail}`}
                  >
                    {CONFIG.site.serviceEmail}
                  </a>
                  ）向本公司行使下列權利：
                  <br />
                  (1) 查詢或請求閱覽。
                  <br />
                  (2) 請求製給複製本。
                  <br />
                  (3) 請求補充或更正。
                  <br />
                  (4) 請求停止蒐集、處理及利用。
                  <br />
                  (5) 請求刪除您的個人資料。
                </p>
              </div>

              <div className="privacy-array">
                <p className="privacy-no">7.</p>
                <p>
                  您依前項規定查詢或請求閱覽個人資料或製給複製本時，本公司得酌收必要成本費用。即使您的帳號被永久刪除，相關資料副本仍可能暫存在本公司之離線備份系統中。該等備份僅用於系統安全及災難復原之必要用途，不會再被使用於任何日常營運或商業目的，並將依本公司資料保存政策於特定期間後自動銷毀。
                </p>
              </div>

              <div className="privacy-array">
                <p className="privacy-no">8.</p>
                <p>若您的請求不符合申請程序或法律另有規定者，前項所列權利將會受到限制。</p>
              </div>

              <div className="privacy-array">
                <p className="privacy-no">9.</p>
                <p>
                  您可自由選擇是否提供個人資料。如您無法提供正確且完整之個人資料，我們將無法為您提供本平台之相關服務。
                </p>
              </div>
            </div>
          </li>

          <li>
            <p className="privacy-sub-title">B. 第三方蒐集</p>
            <p>
              請您注意，與本應用程式連結的其它網站或服務，也可能蒐集您的個人資料。對於您主動提供的個人資料，這些連結網站應有其個別的隱私政策，其資料處理措施不適用本隱私條款，且本公司不負任何連帶責任。
            </p>
          </li>

          <li>
            <p className="privacy-sub-title">C. 個人資料之利用政策</p>
            <p>
              本公司所蒐集的個人資料，將依蒐集之特定目的，做為提供服務、寄發電子報、提供技術資訊、提供市場資訊等之用。除法令或本隱私條款另有規定外，本公司不會對個人資料為蒐集之特定目的外之利用，亦不會任意對其他第三者揭露。
            </p>
          </li>

          <li>
            <p className="privacy-sub-title">D. 與第三者共用個人資料之政策</p>
            <div className="pl-6">
              <div className="privacy-array">
                <p className="privacy-no">1.</p>
                <p>
                  我們絕對不會任意出售、交換、出租或以其他變相之方式，將您的個人資料揭露予其他團體或個人，但有法律依據或合約義務者，不在此限。
                </p>
              </div>

              <div className="privacy-array">
                <p className="privacy-no">2.</p>
                <p>
                  前項但書之情形包括不限於：
                  <br />
                  (1) 法律明文規定。
                  <br />
                  (2) 為增進公共利益所必要。
                  <br />
                  (3) 為免除您生命、身體、自由或財產上之危險。
                  <br />
                  (4) 為防止他人權益之重大危害。
                  <br />
                  (5)
                  公務機關或學術研究機構基於公共利益為統計或學術研究而有必要，且資料經過提供者處理後或經蒐集者依其揭露方式無從識別特定之當事人。
                  <br />
                  (6) 經您的同意。
                  <br />
                  (7) 有利於您的權益。
                </p>
              </div>

              <div className="privacy-array">
                <p className="privacy-no">6.</p>
                <p>
                  您可透過客服信箱（
                  <a
                    className="underline underline-offset-2 text-blue-700"
                    href={`mailto:${CONFIG.site.serviceEmail}`}
                  >
                    {CONFIG.site.serviceEmail}
                  </a>
                  ）向本公司行使下列權利：
                  <br />
                  (1) 查詢或請求閱覽。
                  <br />
                  (2) 請求製給複製本。
                  <br />
                  (3) 請求補充或更正。
                  <br />
                  (4) 請求停止蒐集、處理及利用。
                  <br />
                  (5) 請求刪除您的個人資料。
                </p>
              </div>

              <div className="privacy-array">
                <p className="privacy-no">7.</p>
                <p>
                  您依前項規定查詢或請求閱覽個人資料或製給複製本時，本公司得酌收必要成本費用。即使您的帳號被永久刪除，相關資料副本仍可能暫存在本公司之離線備份系統中。該等備份僅用於系統安全及災難復原之必要用途，不會再被使用於任何日常營運或商業目的，並將依本公司資料保存政策於特定期間後自動銷毀。
                </p>
              </div>

              <div className="privacy-array">
                <p className="privacy-no">8.</p>
                <p>若您的請求不符合申請程序或法律另有規定者，前項所列權利將會受到限制。</p>
              </div>

              <div className="privacy-array">
                <p className="privacy-no">9.</p>
                <p>
                  您可自由選擇是否提供個人資料。如您無法提供正確且完整之個人資料，我們將無法為您提供本平台之相關服務。
                </p>
              </div>
            </div>
          </li>

          <li>
            <p className="privacy-sub-title">E. 傳送電子郵件或電子報等商業資訊之政策</p>
            <p>
              本公司將在事前或註冊登錄取得您的同意後，傳送電子郵件或電子報等商業資訊給您。本公司除了在該資料或電子郵件上註明是由我們發送，也會在該資料或電子郵件上提供您能隨時停止接收這些資料或電子郵件的方法、說明或功能連結。
            </p>
          </li>

          <li>
            <p className="privacy-sub-title">F. COOKIES 的運用與政策</p>
            <p>
              COOKIES
              是伺服端為了區別使用者的不同喜好，經由瀏覽器寫入使用者硬碟的一些簡短資訊。您可以修改您使用之瀏覽器對
              COOKIES 的接受程度。本公司利用 COOKIES
              記錄您登入網站後的相關操作，並可能以之作為爭議處理的參考資料。如果您選擇拒絕所有的
              COOKIES，您就可能無法使用部份個人化服務，或是參與部份的活動。
            </p>
          </li>

          <li>
            <p className="privacy-sub-title">G. 自我保護措施</p>
            <p>
              請妥善保管您的憑證、密碼或任何個人資料，不要將任何個人資料，尤其是帳號及密碼提供給任何人或其他機構。在您使用完本應用程式所提供的各項服務功能後，請務必記得登出帳號，若您是與他人共享電腦或使用公共電腦，切記要關閉瀏覽器視窗，以防止他人讀取您的個人資料。
            </p>
          </li>

          <li>
            <p className="privacy-sub-title">H. 隱私權保護政策修訂</p>
            <p>
              藉由使用本平台或在線上提供您的資訊給我們，視為您接受我們在本隱私條款中所述之隱私權保護政策。我們會不定時修訂本隱私條款，以符合最新之隱私權保護規範。當我們修改本隱私條款時，我們會在本平台以及網頁上張貼告示，通知您相關事項。如果您對本隱私條款有任何疑問，歡迎隨時與我們聯絡或來信至：
              。
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PrivacyView
