import axios from "axios"

const baseUrl = import.meta.env.VITE_BASE_URL
const apiUrl = `${baseUrl}/api/profile` // URL corrigida para perfis

// Função utilitária para obter cabeçalhos de autenticação
const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  const headers = { Authorization: `Bearer ${token}` }
  return headers
}

// Função para criar um perfil
export const createProfile = async (profileData) => {
  try {
    const response = await axios.post(apiUrl, profileData, {
      headers: getAuthHeaders(),
    })
    return response.data
  } catch (error) {
    return error
  }
}

// Função para obter um perfil específico por ID
export const getProfileById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`, {
      headers: getAuthHeaders(),
    })
    return response.data
  } catch (error) {
    return error
  }
}

// Função para atualizar um perfil existente
export const updateProfile = async (id, profileData) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, profileData, {
      headers: getAuthHeaders(),
    })
    return response.data
  } catch (error) {
    return error
  }
}

// Função para deletar um perfil
export const deleteProfile = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`, {
      headers: getAuthHeaders(),
    })
  } catch (error) {
    return error
  }
}