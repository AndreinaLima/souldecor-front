import { useState, useEffect } from "react"
import {
  Table,
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap"
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  registerClient,
  registerSeller,
  registerAdmin,
} from "../api/userApi"
import toast from "react-hot-toast"
import { MdOutlineDeleteSweep, MdEditNote } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import "../styles/AdmUser.css"
import { useAuth } from "../context/userContext"

const AdmUser = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "cliente",
    password: "",
  })
  const navigate = useNavigate()

  const { user } = useAuth()
  console.log(user)
  useEffect(() => {
    if (user) {
      // Verifica se o usuário não é admin
      if (user?.role !== "admin") {
        toast.error(
          "Acesso negado. Somente administradores podem acessar esta página."
        )
        navigate("/") // Redireciona para a página inicial
      }
    } else {
      navigate("/login") // Redireciona para a página de login se não estiver autenticado
    }
  }, [navigate])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const handleDelete = async (id) => {
    const deletar = window.confirm("Tem certeza que deseja excluir?")
    if (!deletar) return
    try {
      await deleteUser(id)
      fetchUsers()
      toast.success("Usuário excluído com sucesso!")
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  const handleEdit = async (id) => {
    try {
      const user = await getUser(id)
      setSelectedUser(user)
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        password: "",
      })
      setShowModal(true)
    } catch (error) {
      console.error("Error fetching user:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, formData)
        toast.success("Usuário atualizado com sucesso!")
      } else {
        if (formData.role === "cliente") {
          await registerClient(formData)
        } else if (formData.role === "vendedor") {
          await registerSeller(formData)
        } else if (formData.role === "admin") {
          await registerAdmin(formData)
        }

        toast.success("Usuário adicionado com sucesso!")
      }

      setShowModal(false)
      fetchUsers()
    } catch (error) {
      console.error("Erro ao salvar usuário:", error)
      toast.error("Erro ao salvar usuário")
    }
  }

  const handleAddUser = () => {
    setSelectedUser(null)
    setFormData({
      name: "",
      email: "",
      role: "cliente",
      password: "",
    })
    setShowModal(true)
  }

  return (
    <Container>
      <Row className="mt-4 mb-2">
        <Col>
          <h1>Administração de Usuários</h1>
          <Button
            variant="primary"
            onClick={handleAddUser}
            style={{
              backgroundColor: "#A4AF97",
              color: "#fff",
              border: "none",
            }}
          >
            Adicionar Usuário
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  variant="outline-dark"
                  className="me-2"
                  onClick={() => handleEdit(user.id)}
                >
                  <MdEditNote />
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  <MdOutlineDeleteSweep />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedUser ? "Editar Usuário" : "Adicionar Usuário"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>Função</Form.Label>
              <Form.Select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                required
              >
                <option value="cliente">Cliente</option>
                <option value="vendedor">Vendedor</option>
                <option value="admin">Administrador</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Senha"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Form.Group>
            <Button
              style={{
                backgroundColor: "#A4AF97",
                color: "#fff",
                border: "none",
              }}
              type="submit"
            >
              {selectedUser ? "Atualizar" : "Adicionar"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default AdmUser