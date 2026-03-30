export function localStorageAvailable() {
  try {
    const key = '__some_random_key_you_are_not_going_to_use__'
    window.localStorage.setItem(key, key)
    window.localStorage.removeItem(key)
    return true
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false
  }
}

export function localStorageSetItem(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
    return true
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false
  }
}

export function localStorageSetObject<T>(key: string, value: T) {
  try {
    const jsonString = JSON.stringify(value)
    return localStorageSetItem(key, jsonString)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false
  }
}

export function localStorageRemoveItem(key: string) {
  try {
    localStorage.removeItem(key)
    return true
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false
  }
}

export function sessionStorageRemoveItem(key: string) {
  try {
    sessionStorage.removeItem(key)
    return true
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false
  }
}

export function localStorageGetItem(key: string, defaultValue = '') {
  const storageAvailable = localStorageAvailable()

  let value

  if (storageAvailable) {
    value = localStorage.getItem(key) || defaultValue
  }

  return value
}

export function sessionStorageAvailable() {
  try {
    const key = '__some_random_key_you_are_not_going_to_use__'
    window.sessionStorage.setItem(key, key)
    window.sessionStorage.removeItem(key)
    return true
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false
  }
}

export function sessionStorageGetItem(key: string, defaultValue = '') {
  const storageAvailable = sessionStorageAvailable()

  let value

  if (storageAvailable) {
    value = sessionStorage.getItem(key) || defaultValue
  }

  return value
}
