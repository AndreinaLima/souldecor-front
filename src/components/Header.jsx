import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import {
  FaClipboardList,
  FaShoppingCart,
  FaUser,
  FaUserCircle,
} from "react-icons/fa"
import { getUser, tokenIsValid } from "../api/userApi"
import { getProfileById } from "../api/profileApi"
import { useAuth } from "../context/userContext"
import { MdLogout } from "react-icons/md"
import { IoMdAddCircleOutline } from "react-icons/io"
import { CartContext } from "../context/CartProvider"
import "../styles/Header.css"

export default function Header() {
  const [userInfor, setUserInfor] = useState(null)
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()
  const { user, syncronize, logout } = useAuth()
  const { productsCart } = useContext(CartContext) // Use o CartContext

  useEffect(() => {
    // Função para verificar o token e atualizar o estado
    const verifyToken = async () => {
      try {
        const data = await tokenIsValid()
        console.log(data.message)
        if (data.message === "Token expirado") {
          logout()
        }
      } catch (error) {
        console.error("Erro ao verificar o token:", error)
      }
    }

    verifyToken() // Chama a função para verificar o token
  }, []) // O array vaz

  useEffect(() => {
    async function getUserById() {
      if (user !== null) {
        await getUser(user?.id)
          .then((data) => {
            setUserInfor(data)
          })
          .catch((error) => {
            console.error("Erro ao obter perfil:", error)
          })
      } else {
        return
      }
    }
    getUserById()
  }, [user, syncronize])

  useEffect(() => {
    async function getProfile() {
      if (user !== null) {
        await getProfileById(user?.id)
          .then((data) => {
            setProfile(data)
          })
          .catch((error) => {
            console.error("Erro ao obter perfil:", error)
          })
      } else {
        return
      }
    }
    getProfile()
  }, [user, syncronize])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const totalProducts =
    productsCart?.reduce((total, product) => total + product.qtd, 0) || 0

  return (
    <header>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src="/logo.png" alt="logo" className="img-fluid" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {!user ? (
                <>
                  <Nav.Link as={Link} to="/produtos">
                    Catálogo
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/cadastro">
                    Cadastro
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={Link}
                    to="/carrinho"
                    className="cart-icon-container"
                  >
                    <FaShoppingCart size={25} />
                    {totalProducts > 0 && (
                      <span className="cart-badge">{totalProducts}</span>
                    )}
                  </Nav.Link>
                  <NavDropdown title="Produtos" id="produtos-dropdown">
                    <NavDropdown.Item
                      as={Link}
                      to="/produtos"
                      className="custom-dropdown-item d-flex align-items-center"
                    >
                      <FaClipboardList className="me-2" /> Meus Produtos
                    </NavDropdown.Item>
                    {user &&
                      (user.role === "admin" || user.role === "vendedor") && (
                        <NavDropdown.Item
                          as={Link}
                          to="/produtos/novo"
                          className="custom-dropdown-item d-flex align-items-center"
                        >
                          <IoMdAddCircleOutline className="me-2" /> Novo Produto
                        </NavDropdown.Item>
                      )}
                  </NavDropdown>
                  {user && user.role === "admin" && (
                    <Nav.Link as={Link} to="/admin">
                      Administração
                    </Nav.Link>
                  )}
                  {user && (
                    <Nav>
                      <>
                        {profile?.avatar_url ? (
                          <img
                            width={40}
                            style={{ borderRadius: "50%" }}
                            src={profile?.avatar_url}
                            alt="Avatar do usuário"
                            className="img-fluid"
                          />
                        ) : (
                          <FaUserCircle size={40} />
                        )}
                        <NavDropdown
                          title={userInfor?.name}
                          id="user-nav-dropdown"
                        >
                          <NavDropdown.Item as={Link} to="/perfil">
                            <FaUser size={18} className="me-2" />
                            Ver Perfil
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item
                            className="text-danger d-flex align-items-center btn btn-link"
                            onClick={handleLogout}
                          >
                            <MdLogout size={18} className="me-2" />
                            Sair
                          </NavDropdown.Item>
                        </NavDropdown>
                      </>
                    </Nav>
                  )}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}