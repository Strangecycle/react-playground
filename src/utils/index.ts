export const setStorageItem = (key: string, val: any) => {
  localStorage.setItem(key, JSON.stringify(val))
}

export const getStorageItem = (key: string) => {
  const val: string | null = localStorage.getItem(key)
  return val ? JSON.parse(val) : null
}

export const removeStorageItem = (key: string) => {
  localStorage.removeItem(key)
}
