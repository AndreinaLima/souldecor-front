import { useState, useEffect } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { getProfileById, updateProfile } from "../api/profileApi"
import { getUser, updateUser } from "../api/userApi"
import toast from "react-hot-toast"
import { useAuth } from "../context/userContext"
import { Link, useNavigate } from "react-router-dom"

export default function ProfilePage() {
  const { sync,user } = useAuth()
  const navigate = useNavigate()

  const [isEdit, setIsEdit] = useState(false)
  const [profile, setProfile] = useState({
    id: "",
    bio: "",
    avatar_url: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  })
  const [userInfor, setUserInfor] = useState({
    id: "",
    name: "",
    email: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate("/login") // Redireciona para a página de login se o usuário não estiver autenticado
      return
    }
    fetchProfile()
    fetchUser()
  }, [])

  const fetchProfile = async () => {
    try {
      const data = await getProfileById(user?.id)
      if (data) {
        setProfile({
          id: data.id || "",
          bio: data.bio || "",
          avatar_url: data.avatar_url || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          postal_code: data.postal_code || "",
          country: data.country || "",
        })
      }
    } catch (error) {
      console.error("Erro ao carregar o perfil:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUser = async () => {
    try {
      const data = await getUser(user?.id)
      if (data) {
        setUserInfor({
          id: data.id || "",
          name: data.name || "",
          email: data.email || "",
        })
      }
    } catch (error) {
      console.error("Erro ao carregar o usuário:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value || "",
    }))
  }

  const handleChangeUser = (e) => {
    const { name, value } = e.target
    setUserInfor((prevUser) => ({
      ...prevUser,
      [name]: value || "",
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (profile.id) {
        setIsLoading(true)
        await updateProfile(profile.id, profile)
        await updateUser(userInfor.id, userInfor)
        sync()
        setIsEdit(false)
        toast.success("Perfil atualizado com sucesso!")
      }
      fetchProfile()
    } catch (error) {
      toast.error("Erro ao atualizar perfil")
    } finally {
      setIsSubmitting(false)
      setIsLoading(false)
    }
  }

  // if (isLoading) {
  //   return <Loader show={isLoading}/>
  // }

  return (
    <Container className="vh-100">
      <h1 className="mt-3">Meu Perfil</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userInfor.name || ""}
                onChange={handleChangeUser}
                disabled={!isEdit}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userInfor.email || ""}
                onChange={handleChangeUser}
                disabled={!isEdit}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bio"
                value={profile.bio || ""}
                onChange={handleChange}
                disabled={!isEdit}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formAvatarUrl">
              <Form.Label>URL do Avatar</Form.Label>
              <Form.Control
                type="text"
                name="avatar_url"
                value={profile.avatar_url || ""}
                onChange={handleChange}
                disabled={!isEdit}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formAddress">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={profile.address || ""}
                onChange={handleChange}
                disabled={!isEdit}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCity">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={profile.city || ""}
                onChange={handleChange}
                disabled={!isEdit}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="formState">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={profile.state || ""}
                onChange={handleChange}
                disabled={!isEdit}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formPostalCode">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                name="postal_code"
                value={profile.postal_code || ""}
                onChange={handleChange}
                disabled={!isEdit}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formCountry">
              <Form.Label>País</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={profile.country || ""}
                onChange={handleChange}
                disabled={!isEdit}
              />
            </Form.Group>
          </Col>
        </Row>
        {isEdit ? (
          <>
            <Button
              variant="dark"
              type="submit"
              className="me-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsEdit(false)}
            >
              Cancelar
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            type="button"
            onClick={() => setIsEdit(true)}
          >
            Editar
          </Button>
        )}
        <Link to="/alterar-senha" className="btn btn-danger mx-3 mt-3 mb-3">
          Alterar Senha
        </Link>
      </Form>
    </Container>
  )
}
