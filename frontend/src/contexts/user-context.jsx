import React, { useState, useCallback, useContext } from "react"
import {
  getItemFromStorage,
  setItemToStorage,
  removeItemFromStorage,
  KEYS,
  STORAGE,
} from "lib/client-storage"

export const UserContext = React.createContext({})

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => getItemFromStorage(STORAGE.sessionStorage, KEYS.user))

  const updateUser = useCallback((newUser) => {
    if (newUser) {
      setUser(newUser)
      setItemToStorage(STORAGE.sessionStorage, KEYS.user, newUser)
    } else {
      setUser(null)
      removeItemFromStorage(STORAGE.sessionStorage, KEYS.user)
    }
  }, [])

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>
}

export const UserContextConsumer = UserContext.Consumer

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUserContext must be used within UserContextProvider")
  }
  return context || {}
}
