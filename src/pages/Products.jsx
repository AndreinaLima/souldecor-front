import { useEffect, useState } from "react"
import { Form, InputGroup, Alert, Pagination, Row, Col } from "react-bootstrap"
import { getAllProducts } from "../api/productApi"
import Loader from "../components/Loader"
import Cards from "../components/Cards"
import toast from "react-hot-toast"
import ModalProducts from "./ModalProducts"
import { FaTimesCircle } from "react-icons/fa"
import { BsSearch, BsCurrencyDollar, BsTag } from "react-icons/bs"
import { RiSecurePaymentLine } from "react-icons/ri"
import { TbTruckDelivery } from "react-icons/tb"
import { MdMarkEmailRead, MdOutlineShoppingCartCheckout } from "react-icons/md"
import "../styles/Products.css"
import { useAuth } from "../context/userContext"

function Products() {
  // Estado agrupado
  const [state, setState] = useState({
    produtos: [],
    filteredProducts: [],
    showModal: false,
    selectedProduct: null,
    modalAction: "", // "edit" ou "delete"
    filter: "", // Filtro de nome
    minPrice: "", // Preço mínimo
    maxPrice: "", // Preço máximo
    categoryFilter: "Categorias", // Filtro de categoria inicializado como "Categorias"
    noProducts: false, // Mensagem de produto não encontrado
    user: null, // Usuário
    currentPage: 1, // Página atual
  })
  const { user } = useAuth()

  const productsPerPage = 9 // Número de produtos por página

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      if (user) {
        try {
          setState((prevState) => ({ ...prevState, user }))
        } catch (error) {
          console.error("Erro ao parsear os dados do usuário:", error)
          setState((prevState) => ({ ...prevState, user: null }))
        }
      }
    } else {
      setState((prevState) => ({ ...prevState, user: null }))
    }

    carregarProdutos()
  }, [user])

  useEffect(() => {
    const results = state.produtos.filter((product) => {
      const matchesSeller =
        state.user?.role === "vendedor"
          ? product.sellerId === state.user.id
          : true

      const matchesName = product.name
        .toLowerCase()
        .includes(state.filter.toLowerCase())
      const matchesMinPrice =
        state.minPrice === "" || product.price >= parseFloat(state.minPrice)
      const matchesMaxPrice =
        state.maxPrice === "" || product.price <= parseFloat(state.maxPrice)
      const matchesCategory =
        state.categoryFilter === "Categorias" ||
        state.categoryFilter === "" ||
        product.category === state.categoryFilter

      return (
        matchesName &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesCategory &&
        matchesSeller
      )
    })
    setState((prevState) => ({
      ...prevState,
      filteredProducts: results,
      noProducts: results.length === 0,
      currentPage: 1, // Resetar para a primeira página ao aplicar filtros
    }))
  }, [
    state.produtos,
    state.filter,
    state.minPrice,
    state.maxPrice,
    state.categoryFilter,
    state.user,
  ])

  const carregarProdutos = () => {
    getAllProducts()
      .then((dados) => {
        setState((prevState) => ({ ...prevState, produtos: dados }))
      })
      .catch((error) => {
        toast.error("Erro ao carregar produtos.")
        console.error(error)
      })
  }

  const handleOpenModal = (product, action) => {
    setState((prevState) => ({
      ...prevState,
      selectedProduct: product,
      modalAction: action,
      showModal: true,
    }))
  }

  const handleCloseModal = () => {
    setState((prevState) => ({
      ...prevState,
      showModal: false,
      selectedProduct: null,
      modalAction: "",
    }))
  }

  const handleFilterChange = (e) => {
    setState((prevState) => ({ ...prevState, filter: e.target.value }))
  }

  const handleMinPriceChange = (e) => {
    setState((prevState) => ({ ...prevState, minPrice: e.target.value }))
  }

  const handleMaxPriceChange = (e) => {
    setState((prevState) => ({ ...prevState, maxPrice: e.target.value }))
  }

  const handleCategoryChange = (e) => {
    setState((prevState) => ({ ...prevState, categoryFilter: e.target.value }))
  }

  const handleClearFilters = () => {
    setState((prevState) => ({
      ...prevState,
      filter: "",
      minPrice: "",
      maxPrice: "",
      categoryFilter: "Categorias",
    }))
  }

  const indexOfLastProduct = state.currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = state.filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const totalPages = Math.ceil(state.filteredProducts.length / productsPerPage)

  const handlePageChange = (pageNumber) => {
    setState((prevState) => ({ ...prevState, currentPage: pageNumber }))
  }

  return (
    <main className="mt-4 container">
      <h1>Produtos</h1>
      <hr />

      <Form className="mb-3">
        <Row className="g-1 filter">
          <Col xs={6} sm={4} md={4} xl={3}>
            <InputGroup>
              <InputGroup.Text>
                <BsSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Filtrar por nome"
                value={state.filter}
                onChange={handleFilterChange}
              />
            </InputGroup>
          </Col>
          <Col xs={6} sm={4} md={4} xl={2}>
            <InputGroup>
              <InputGroup.Text>
                <BsCurrencyDollar />
              </InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Preço mínimo"
                value={state.minPrice}
                onChange={handleMinPriceChange}
                min="0"
              />
            </InputGroup>
          </Col>
          <Col xs={6} sm={4} md={4} xl={2}>
            <InputGroup>
              <InputGroup.Text>
                <BsCurrencyDollar />
              </InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Preço máximo"
                value={state.maxPrice}
                onChange={handleMaxPriceChange}
                min="0"
              />
            </InputGroup>
          </Col>
          <Col xs={6} sm={4} md={4} xl={3}>
            <InputGroup>
              <InputGroup.Text>
                <BsTag />
              </InputGroup.Text>
              <Form.Select
                value={state.categoryFilter}
                onChange={handleCategoryChange}
              >
                <option value="Categorias" disabled>
                  Categorias
                </option>
                <option value="">Todas as Categorias</option>
                <option value="Móveis">Móveis</option>
                <option value="Decoração">Decoração</option>
                <option value="Utensílios">Utensílios</option>
                <option value="Iluminação">Iluminação</option>
                <option value="Outros">Outros</option>
              </Form.Select>
            </InputGroup>
          </Col>
          <Col
            xs={12}
            sm={4}
            md={4}
            xl={2}
            className="d-flex align-items-center"
          >
            <InputGroup.Text
              onClick={handleClearFilters}
              style={{ cursor: "pointer" }}
            >
              <span style={{ marginRight: "5px" }}>Limpar Filtro</span>
              <FaTimesCircle />
            </InputGroup.Text>
          </Col>
        </Row>
      </Form>

      {state.noProducts && !state.filteredProducts.length ? (
        <Alert variant="info">Nenhum produto encontrado</Alert>
      ) : currentProducts.length > 0 ? (
        <div>
          <Cards
            produtos={currentProducts}
            handleOpenModal={handleOpenModal}
            user={state.user}
          />
          {state.selectedProduct && (
            <ModalProducts
              show={state.showModal}
              handleClose={handleCloseModal}
              product={state.selectedProduct}
              carregarProdutos={carregarProdutos}
              actionType={state.modalAction}
            />
          )}
          <Pagination className="pagination-black mt-4 d-flex justify-content-center">
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={state.currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(state.currentPage - 1)}
              disabled={state.currentPage === 1}
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === state.currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(state.currentPage + 1)}
              disabled={state.currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={state.currentPage === totalPages}
            />
          </Pagination>
        </div>
      ) : (
        <Loader />
      )}
      <Row className="d-flex justify-content-between my-5 border-top pt-5 flex-wrap">
        <Col xs={12} sm={6} md={3} className="d-flex gap-3 mb-3 mb-md-0">
          <RiSecurePaymentLine size={35} />
          <div>
            <strong>Compra Segura</strong>
            <p className="small">
              Ambiente seguro para <br /> pagamentos online
            </p>
          </div>
        </Col>
        <Col xs={12} sm={6} md={3} className="d-flex gap-3 mb-3 mb-md-0">
          <TbTruckDelivery size={35} />
          <div>
            <strong>Frete Grátis</strong>
            <p className="small">
              Envio rápido e acompanhado <br /> com código de rastreio
            </p>
          </div>
        </Col>
        <Col xs={12} sm={6} md={3} className="d-flex gap-3 mb-3 mb-md-0">
          <MdMarkEmailRead size={35} />
          <div>
            <strong>Suporte Profissional</strong>
            <p className="small">
              Equipe de suporte de extrema <br /> qualidade a semana toda
            </p>
          </div>
        </Col>
        <Col xs={12} sm={6} md={3} className="d-flex gap-3">
          <MdOutlineShoppingCartCheckout size={35} />
          <div>
            <strong>Satisfação ou Reembolso</strong>
            <p className="small">
              Caso haja algo, devolvemos seu <br /> dinheiro com velocidade
            </p>
          </div>
        </Col>
      </Row>
    </main>
  )
}

export default Products