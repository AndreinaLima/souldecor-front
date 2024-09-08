export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  return value !== null ? JSON.parse(value) : null
}

//verifica se tem um usuario no localStorage, se tiver retorna o user
export const isAuthenticated = () => {
  const user = getLocalStorage("user")
  return user !== null ? user : null
}