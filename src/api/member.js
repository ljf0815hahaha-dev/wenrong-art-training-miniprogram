import { get, put } from '@/utils/request'

export const getMemberUserInfo = () => get('/member/user/get')
export const updateMemberUser = (data) => put('/member/user/update', data)
