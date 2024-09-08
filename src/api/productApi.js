import axios from "axios"

// Função para obter o token do sessionStorage
const getAuthToken = () => sessionStorage.getItem("token")
const baseUrl = import.meta.env.VITE_BASE_URL

// GET
export async function getAllProducts() {
  try {
    const token = getAuthToken() // Obtém o token
    const response = await axios.get(`${baseUrl}/api/products`, {
      headers: {
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
      },
    })
    return response.data // Dados dos produtos
  } catch (error) {
    return error
  }
}

// GET Meus Produtos
export async function getSellerProducts(sellerId) {
  try {
    const token = getAuthToken(); // Obtém o token
    const response = await axios.get(`${baseUrl}/api/products/seller/${sellerId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
      },
    });
    return response.data; // Dados dos produtos do vendedor
  } catch (error) {
    return error
  }
}


// GET: Produtos por categoria
export async function getProductsByCategory(category) {
  try {
    const response = await axios.get(
      `${baseUrl}/api/products/category/${category}`
    );
    return response.data; // Dados dos produtos da categoria
  } catch (error) {
    return error
  }
}

// POST
export async function createProduct(data) {
  try {
    const token = getAuthToken() // Obtém o token
    const response = await axios.post(
      `${baseUrl}/api/products`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
        },
      }
    )
    return response.data // Dados do produto adicionado
  } catch (error) {
    return error
  }
}

// DELETE
export async function deleteProduct(id) {
  try {
    const token = getAuthToken() // Obtém o token
    const response = await axios.delete(
      `${baseUrl}/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
        },
      }
    )
    return response.data // Confirmação de deleção
  } catch (error) {
    return error
  }
}

// GET :ID
export async function getProductById(id) {
  try {
    const response = await axios.get(`${baseUrl}/api/products/${id}`)
    return response.data // Dados do produto
  } catch (error) {
    return error
  }
}

// PUT :ID
export async function updateProduct(id, data) {
  try {
    const token = getAuthToken() // Obtém o token
    const response = await axios.put(
      `${baseUrl}/api/products/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
        },
      }
    )
    return response.data // Dados do produto atualizado
  } catch (error) {
    return error
  }
}
