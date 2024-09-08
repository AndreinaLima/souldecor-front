import axios from "axios"
import { jwtDecode } from "jwt-decode"

// URL base para todas as requisições relacionadas a usuários
const baseUrl = import.meta.env.VITE_BASE_URL
const apiUrl = `${baseUrl}/api/users`

// Função utilitária para obter cabeçalhos de autenticação
const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  if (!token) {
    console.error("Token não encontrado no localStorage")
    return {} // Retorna um objeto vazio se o token não estiver presente
  }
  return { headers: { Authorization: `Bearer ${token}` } }
}

function getToken() {
  const token = localStorage.getItem("token")
  return token
}

export async function tokenIsValid() {
  try {
    const response = await axios.get(
      `${baseUrl}/api/auth/check-token`,
      getAuthHeaders()
    )
    console.log("Resposta da API:", response.data)
    return response.data // Retorna a resposta para possível uso futuro
  } catch (error) {
    // Melhore o tratamento de erros
    if (error.response) {
      // Resposta do servidor com status code diferente de 2xx

      return error.response.data
    } else if (error.request) {
      // Solicitação feita, mas sem resposta
      console.error("Erro na solicitação:", error.request)
    } else {
      // Erro na configuração da solicitação
      console.error("Erro:", error.message)
    }
    throw error // Lança o erro novamente para tratamento adicional, se necessário
  }
}

// Função de login - permanece a mesma
export async function login(credentials) {
  try {
    const response = await axios.post(`${baseUrl}/api/auth/login`, credentials)
    const { token } = response.data
    localStorage.setItem("token", token)
    const userInfor = jwtDecode(token)
    const user = { id: userInfor.id, role: userInfor.role }
    console.log(user)
    localStorage.setItem("user", JSON.stringify(user))

    return user
  } catch (error) {
    throw error.response.data.message
  }
}

export async function registerClient(clientData) {
  try {
    const response = await axios.post(
      `${baseUrl}/api/auth/register/client`, // URL corrigida
      clientData
    )
    return response.data
  } catch (error) {
    return
  }
}

export async function registerSeller(sellerData) {
  try {
    const response = await axios.post(
      `${baseUrl}/api/auth/register/seller`, // URL corrigida
      sellerData
    )
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}

export const registerAdmin = async (adminData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/auth/register/admin`,
      adminData
    )
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}

// Funções de gerenciamento de usuários
export async function getUsers() {
  try {
    const response = await axios.get(`${baseUrl}/api/users`, getAuthHeaders())
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}

// Exemplo de uso da constante apiUrl e getAuthHeaders
export async function getUser(id) {
  try {
    const response = await axios.get(`${apiUrl}/${id}`, getAuthHeaders())
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}

export async function updateUser(id, userData) {
  try {
    const response = await axios.put(
      `${baseUrl}/api/users/${id}`,
      userData,
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}

export async function deleteUser(id) {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/users/${id}`,
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}

export async function updatePassword(oldPassword, newPassword) {
  try {
    const response = await axios.post(
      `${baseUrl}/api/users/change-password`, // URL atualizada para corresponder à rota do backend
      { oldPassword, newPassword },
      getAuthHeaders()
    )
    return response
  } catch (error) {
    throw error.response.data.message
  }
}