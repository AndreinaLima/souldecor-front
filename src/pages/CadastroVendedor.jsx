import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { registerSeller } from "../api/userApi" // Atualize o caminho conforme a estrutura do seu projeto
import Logo from "/logo.png" // Exemplo de logo
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"

function CadastroVendedor() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await registerSeller({ ...data, role: "vendedor" })
      toast.success("Vendedor registrado com sucesso!")
      navigate("/login")
    } catch (error) {
      console.error("Error registering user:", error)
      toast.error("Erro ao registrar vendedor")
    }
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
    >
      <Row className="w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
          <div className="text-center mb-4">
            <img src={Logo} alt="Logo" style={{ width: "150px" }} className="img-fluid mt-5" />
          </div>
          <h1 className="text-center mb-4">Cadastro de Vendedor</h1>
          <Form className="form-section w-100" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu nome"
                {...register("name", { required: "Nome é obrigatório" })}
                isInvalid={!!errors.name}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email"
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email inválido",
                  },
                })}
                isInvalid={!!errors.email}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                {...register("password", {
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "Senha deve ter pelo menos 6 caracteres",
                  },
                })}
                isInvalid={!!errors.password}
              />
              {errors.password && (
                <Form.Control.Feedback type="invalid">
                  {errors.password.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Button variant="outline-dark" type="submit" className="w-100">
              Cadastrar
            </Button>
            <div className="text-center mt-3">
              <Link className="text-decoration-none text-black" to="/login">
                Já tem uma conta? Faça login
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default CadastroVendedor
