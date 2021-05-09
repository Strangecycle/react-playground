import { Button, message, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { EditParams } from '../api/user'
import { editUserCreator, setAvatarCreatorSync } from '../store/actions/user'
import { UserState } from '../store/reducers/user'
import { RootState } from '../store/types'
import { getStorageItem, setStorageItem } from '../utils'
import { getToken } from '../utils/auth'

export default function Profile() {
  const state = useSelector(
    (state: RootState) => ({ user: state.user }),
    shallowEqual
  )
  const [editParams, setEditParams] = useState<EditParams>({
    username: state.user.username,
    phone: state.user.phone,
    email: state.user.email,
    sentence: state.user.sentence,
  })
  const dispatch = useDispatch()

  // 每次修改表单时，都会触发重新渲染，这里使用 useMemo 进行优化，缓存计算结果
  const ElAvatar = useMemo(() => {
    return state.user.avatar ? (
      <img
        className="rounded-full ring-2 ring-white"
        src={state.user.avatar}
        alt="avatar"
      />
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-18 h-18"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    )
  }, [state.user.avatar])

  const handleAvatarChange = ({ file: { response } }: UploadChangeParam) => {
    if (!response) {
      return
    }
    const { avatarUrl } = response.data
    const userInfo: UserState = getStorageItem('user')
    userInfo.avatar = avatarUrl
    setStorageItem('user', userInfo)
    dispatch(setAvatarCreatorSync(avatarUrl))
  }

  const handleChange = (e: any) => {
    setEditParams({ ...editParams, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    await dispatch(editUserCreator((state.user.id as number), editParams))
    await message.success('Success!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center justify-center shadow-2xl w-2/6 rounded-3xl py-14">
        <div className="text-3xl font-extrabold text-gray-900 mb-6">
          Edit your profile
        </div>
        <div>
          <ImgCrop rotate>
            <Upload
              name="file"
              className="rounded-full"
              maxCount={1}
              action="http://localhost:5000/user/avatar"
              headers={{
                Authorization: `Bearer ${getToken()}`,
              }}
              listType="picture-card"
              showUploadList={false}
              onChange={handleAvatarChange}
            >
              {ElAvatar}
            </Upload>
          </ImgCrop>
        </div>
        <div className="mt-6 w-2/3 flex flex-col items-center">
          <div className="flex items-center w-full">
            <span className="text-base text-gray-700 w-28">Username</span>
            <div className="bg-gray-200 w-full h-10 rounded px-3">
              <input
                name="username"
                className="bg-transparent w-full h-full text-gray-500 text-sm font-medium"
                type="phone"
                value={editParams.username || ''}
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-3 flex items-center w-full">
            <span className="text-base text-gray-700 w-28">Phone</span>
            <div className="bg-gray-200 w-full h-10 rounded px-3">
              <input
                name="phone"
                className="bg-transparent w-full h-full text-gray-500 text-sm font-medium"
                type="phone"
                value={editParams.phone || ''}
                placeholder="Phone"
                disabled
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-3 flex items-center w-full">
            <span className="text-base text-gray-700 w-28">Email</span>
            <div className="bg-gray-200 w-full h-10 rounded px-3">
              <input
                name="email"
                className="bg-transparent w-full h-full text-gray-500 text-sm font-medium"
                type="phone"
                value={editParams.email || ''}
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-3 flex items-center w-full">
            <span className="text-base text-gray-700 w-28">Sentence</span>
            <div className="bg-gray-200 w-full h-28 rounded px-3 py-3">
              <textarea
                name="sentence"
                className="bg-transparent w-full h-full text-gray-500 text-sm font-medium"
                value={editParams.sentence || ''}
                placeholder="Sentence"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <span className="mt-6 flex items-center justify-center px-8 py-3 border border-transparent text-sm font-medium rounded-3xl text-white md:py-2 md:text-lg md:px-6 bg-blue-400 hover:bg-blue-500 cursor-pointer" onClick={handleSave}>
          Save
        </span>
      </div>
    </div>
  )
}
