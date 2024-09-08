import { createContext, useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { isAuthenticated } from "../utils/localStorage"

// Definindo o tipo do usuário
const AuthContext = createContext({
  user: null,
  syncronize: false,
  sync: () => {},
  logged: () => {},
  logout: () => {},
})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(isAuthenticated())
  const [syncronize, setSyncronize] = useState(false)

  useEffect(() => {
    const authUser = isAuthenticated()
    if (authUser) {
      setUser(authUser)
    }
  }, [])

  const logged = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  // Função para deslogar o usuário
  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
  }

  const sync = () => {
    setSyncronize(!syncronize)
  }

  return (
    <AuthContext.Provider value={{ user, logged, logout, sync, syncronize }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para acessar o contexto
const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { AuthProvider, useAuth }