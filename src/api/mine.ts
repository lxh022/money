import request from '@/utils/request'
import { showToast } from 'vant'

interface CallBack {
  (data: boolean): void
}
export default function () {
  /**
   * 退出登录
   * @param callBack boolean 是否正常退出
   */
  function quitLogin(callBack: CallBack) {
    callBack(true)
    request
      .post('')
      .then(result => {})
      .catch(error => {
        showToast(error)
      })
  }

  /**
   * 验证是否可以注销账号
   * @param callBack boolean
   */
  function verifyDeleteAccount(callBack: CallBack) {
    request
      .post<boolean>('')
      .then(result => {
        callBack(result.data)
      })
      .catch(error => {
        showToast(error)
        callBack(true)
      })
  }

  /**
   * 注销账号
   * @param callBack boolean 是否注销成功
   */
  function deleteAccount(callBack: CallBack) {
    request
      .post<boolean>('')
      .then(result => {
        callBack(result.data)
      })
      .catch(error => {
        showToast(error)
        callBack(true)
      })
  }

  /**
   * 更新用户手机号
   * @param mobile 手机号
   * @param code 验证码
   * @param callBack  boolean 是否更新成功
   */
  function updateUserPhone(mobile: string, code: string, callBack: CallBack) {
    request
      .post<boolean>('')
      .then(result => {
        callBack(result.data)
      })
      .catch(error => {
        showToast(error)
        callBack(true)
      })
  }

  return { quitLogin, verifyDeleteAccount, deleteAccount, updateUserPhone }
}
