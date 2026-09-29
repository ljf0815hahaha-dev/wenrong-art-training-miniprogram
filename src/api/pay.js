import { get, post } from '@/utils/request'
import { getOpenid } from '@/utils/auth'

export const submitWechatPay = (payOrderId) => post('/pay/order/submit', {
  id: payOrderId,
  channelCode: 'wx_lite',
  channelExtras: { openid: getOpenid() },
  displayMode: 'app'
})

export const getPayOrder = (id) => get('/pay/order/get', { id, sync: true })

export const waitPaySuccess = async (id, attempts = 10) => {
  for (let index = 0; index < attempts; index += 1) {
    const order = await getPayOrder(id)
    if (order?.status === 10) return order
    if (order?.status === 20 || order?.status === 30) throw new Error('支付订单未成功')
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  throw new Error('支付结果确认超时，请到订单中心查看')
}
