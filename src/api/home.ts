import Request from '@/utils/request'

export function homeData(data: any) {
  return Request.post('/loan/userQuotaStatus', data)
}
