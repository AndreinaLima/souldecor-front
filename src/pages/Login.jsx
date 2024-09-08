import { Button, Container, Row, Col, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { login } from "../api/userApi"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import Logo from "/logo.png" // Exemplo de logo
import "../styles/Login.css"
import { useAuth } from "../context/userContext"
import { useEffect } from "react"

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  const { logged, user } = useAuth()

  useEffect(() => {
    if (user) {
      // Verifica se o usuário é administrador e redireciona
      if (user.role === "admin") {
        navigate("/admin")
      } else {
        navigate("/")
      }
    }
  }, [user, navigate])

  const onSubmit = async (data) => {
    try {
      const response = await login(data)
      console.log(response)
      if (response) {
        logged(response)
        toast.success("Login realizado com sucesso!")
      }

      // Verifica o papel do usuário após o login
      if (response.role === "admin") {
        navigate("/admin")
      } else {
        navigate("/")
      }
    } catch (error) {
      toast.error(error)
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
            <img
              src={Logo}
              alt="React Bootstrap Logo"
              className="img-fluid mt-5"
              style={{ width: "150px" }}
            />
          </div>
          <h3 className="text-center mb-4">Seja bem vindo(a)!</h3>
          <p className="text-center">
            Use seu e-mail e senha para ter acesso à sua conta.
          </p>
          <Form
            className="form-section w-100"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-3">
              <label htmlFor="email"></label>
              <input
                type="email"
                id="email"
                placeholder="E-mail"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email", { required: "O email é obrigatório" })}
              />
              {errors.email && (
                <small className="invalid-feedback">
                  {errors.email.message}
                </small>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="senha"></label>
              <input
                type="password"
                id="senha"
                placeholder="Senha"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                {...register("password", {
                  required: "A senha é obrigatória",
                  minLength: { value: 6, message: "Mínimo de 6 caracteres" },
                })}
              />
              {errors.password && (
                <small className="invalid-feedback">
                  {errors.password.message}
                </small>
              )}
            </div>
            <Button variant="outline-dark" className="w-100 mb-3" type="submit">
              Entrar
            </Button>
            <div className="text-center">
              <p>Não tem uma conta?</p>
              <Link className="btn btn-outline-dark w-100" to="/cadastro">
                Cadastre-se
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login