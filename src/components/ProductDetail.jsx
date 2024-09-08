import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Carousel, Col, Row, Spinner } from "react-bootstrap";
import { getProductById, getProductsByCategory } from "../api/productApi";
import { FaShoppingCart } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import "../styles/ProductDetail.css";
import { CartContext } from "../context/CartProvider";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addProductToCart } = useContext(CartContext);

  const fetchProduct = async () => {
    try {
      const productData = await getProductById(id);
      setProduto(productData);
      const relatedProductsData = await getProductsByCategory(
        productData.category
      );
      const filteredProducts = relatedProductsData.filter(
        (p) => p.id !== productData.id
      );
      setRelatedProducts(filteredProducts);
    } catch (error) {
      console.error("Erro ao obter o produto:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0); // Rolando a página para o topo ao carregar o produto
  }, [id]);

  const handleBackToList = () => {
    navigate("/produtos");
  };

  const handleProductClick = (productId) => {
    navigate(`/produtos/${productId}`);
    window.scrollTo(0, 0); // Rolando a página para o topo após a navegação
  };

  const handleAddToCart = () => {
    addProductToCart(produto);
    navigate("/carrinho");
  };

  const Loading = () => (
    <div className="mt-4">
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
    </div>
  );

  const ShowProduct = () => (
    <>
      <Row className="mt-5">
        <Col lg={6}>
          <img
            src={produto.imageUrl}
            alt={produto.name}
            className="img-fluid"
          />
        </Col>
        <Col xs={12} sm={10} md={6} lg={4}>
          <h4 className="text-uppercase mt-3">{produto.category}</h4>
          <h1 className="display-5">{produto.name}</h1>
          <h3>R$ {produto.price}</h3>
          <p>{produto.description}</p>

          {/* botoes separados com gap */}
          <div className="gap-2 d-flex">
            <Button
              onClick={handleAddToCart}
              className="d-flex align-items-center justify-content-center custom-btn"
            >
              <FaShoppingCart className="me-2" /> Adicionar
            </Button>
            <Button
              className="ms-3 d-flex align-items-center justify-content-center custom-btn"
              onClick={handleBackToList}
            >
              <RiArrowGoBackFill className="me-2"/> Produtos
            </Button>
          </div>
        </Col>
      </Row>

      {/* Carrossel de produtos relacionados */}
      <h3 className="mt-5">Produtos Relacionados</h3>
      {relatedProducts.length > 0 ? (
        <Carousel
          className="mt-5 mb-3"
          pause="hover"
          interval={6000}
          prevIcon={
            <span aria-hidden="true" className="carousel-control-prev-icon" />
          }
          nextIcon={
            <span aria-hidden="true" className="carousel-control-next-icon" />
          }
        >
          {relatedProducts.map((produto) => (
            <Carousel.Item key={produto.id}>
              <img
                src={produto.imageUrl}
                alt={produto.name}
                className="d-block w-100"
              />
              <Carousel.Caption>
                <h5>{produto.name}</h5>
                <p>R$ {produto.price}</p>
                <Button
                  onClick={() => handleProductClick(produto.id)}
                  variant="outline-light"
                >
                  Ver produto
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>Nenhum produto relacionado encontrado.</p>
      )}
    </>
  )

  return (
    <div>
      <div className="container">{loading ? <Loading /> : <ShowProduct />}</div>
    </div>
  );
};

export default ProductDetail;