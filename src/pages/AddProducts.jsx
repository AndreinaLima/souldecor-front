import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { createProduct } from "../api/productApi"
import toast from "react-hot-toast"
import { IoMdAddCircleOutline } from "react-icons/io"
import { storage } from "../firebase/config" // Importa o storage configurado
import { ref, uploadBytes, getDownloadURL } from "firebase/storage" // Firebase Storage
import { IoBagAddOutline } from "react-icons/io5"
import "../styles/AddProducts.css"

function AddProducts() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState(null) // Estado para o arquivo de imagem
  const [sellerId, setsellerId] = useState("")
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]) // Armazena o arquivo de imagem selecionado
    }
  }

  const handleUpload = () => {
    if (!image) return

    // Cria uma referência para a imagem no Firebase Storage
    const imageRef = ref(storage, `images/${image.name}`)
    return uploadBytes(imageRef, image).then((snapshot) => {
      return getDownloadURL(snapshot.ref) // Retorna a URL da imagem
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const imageUrl = await handleUpload() // Faz o upload e obtém a URL

      const newProduct = {
        name,
        description,
        price,
        category,
        imageUrl, // Usa a URL da imagem para o produto
        sellerId,
      }

      await createProduct(newProduct)
      toast.success("Produto adicionado com sucesso!")
      navigate("/produtos")
    } catch (error) {
      toast.error("Erro ao adicionar produto.")
      console.error(error)
    }
  }

  return (
    <main className="mt-4 container d-flex justify-content-center vh-100 mb-3">
      <div className="w-sm-75 w-md-75 w-lg-50 p-4 bg-light rounded shadow">
        <h1 className="text-center d-flex align-items-center justify-content-center gap-2">
          <IoBagAddOutline />
          Adicionar Produto
        </h1>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formProductName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductDescription">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descrição do produto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductPrice">
            <Form.Label>Preço</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Preço do produto"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductCategory">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Escolha uma categoria...</option>
              <option value="Móveis">Móveis</option>
              <option value="Decoração">Decoração</option>
              <option value="Utensílios">Utensílios</option>
              <option value="Iluminação">Iluminação</option>
              <option value="Outros">Outros</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formProductImage">
            <Form.Label>Imagem do Produto</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} required />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button type="submit" className="mt-5 btn-add" size="lg">
              <IoMdAddCircleOutline /> Adicionar
            </Button>
          </div>
        </Form>
      </div>
    </main>
  )
}

export default AddProducts
