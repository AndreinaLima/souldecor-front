import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import { Button, Card, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../context/userContext"; 
import '../styles/CartPage.css';
import { Link } from "react-router-dom";

function CartPage() {
  const { productsCart, addProductToCart, removeProductToCart } = useContext(CartContext);
  const { user } = useAuth(); 

  if (!user) {
    return <p className="mt-5 text-cart vh-100">Você precisa estar logado para ver o carrinho.</p>;
  }

  return (
    <main className="container">
      <header className="mb-4 text-center">
        <h2 className="mt-5">Carrinho de compras</h2>
      </header>

      <div className="text-center mb-4 mt-5">
        <Link to="/produtos" className="btn btn-primary">Voltar para Produtos</Link>
      </div>

      {productsCart.length === 0 ? (
        <section>
          <p className="mt-5">Seu carrinho está vazio.</p>
        </section>
      ) : (
        <section>
          <Row>
            {productsCart.map((product) => {
              const price = Number(product.price);

              return (
                <Col md={4} className="mb-4" key={product.id}>
                  <Card className="h-100 product-card">
                    <Card.Img
                      variant="top"
                      src={product.imageUrl}
                      alt={product.name}
                      className="product-card-img"
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title as="h3" className="card-title">{product.name}</Card.Title>
                      <Card.Text>
                        <strong>Descrição:</strong> {product.description}
                      </Card.Text>
                      <Card.Text>
                        <strong>Preço:</strong> R$ {price.toFixed(2)}
                      </Card.Text>
                      <Card.Text>
                        <strong>Categoria:</strong> {product.category}
                      </Card.Text>
                      <Card.Text>
                        <strong>Quantidade:</strong> {product.qtd}
                      </Card.Text>

                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        <Button
                          type="button"
                          variant=""
                          onClick={() => addProductToCart(product)}
                          className="btn-add me-2"
                        >
                          <FaPlus className="me-2" /> Adicionar
                        </Button>
                        <button
                          onClick={() => removeProductToCart(product.id)}
                          className="btn-remove"
                        >
                          Excluir
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </section>
      )}
    </main>
  );
}

export default CartPage;
