import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { getSellerProducts, deleteProduct, updateProduct } from "../api/productApi";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import "../styles/ProdutosVendedor.css";
import { MdOutlineDeleteSweep, MdEditNote } from "react-icons/md";
import { formatCurrency } from "../utils/formatCurrency";


function ProdutosVendedor() {
  const { userId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const sellerProducts = await getSellerProducts(userId);
        setProducts(sellerProducts);
      } catch (error) {
        toast.error("Erro ao carregar produtos.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userId]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir este produto?");
    if (confirmDelete) {
      deleteProduct(productId)
        .then(() => {
          toast.success("Produto excluído com sucesso.");
          setProducts(products.filter(product => product.id !== productId));
        })
        .catch((error) => {
          toast.error("Erro ao excluir produto.");
          console.error(error);
        });
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const form = event.target;
    const updatedProduct = {
      ...selectedProduct,
      name: form.elements.name.value,
      price: form.elements.price.value,
      description: form.elements.description.value,
    };

    try {
      await updateProduct(updatedProduct.id, updatedProduct);
      setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
      toast.success("Produto atualizado com sucesso");
      setShowModal(false);
    } catch (error) {
      toast.error("Erro ao atualizar produto.");
      console.error(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="my-4">
      <h2>Produtos do Vendedor</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product.id}>
              <Card className="product-card">
                <Card.Img
                  variant="top"
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-card-img"
                />
                <Card.Body className="product-card-body">
                  <Card.Title className="card-title">{product.name}</Card.Title>
                  <Card.Text className="product-card-text">
                    {product.description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Preço:</strong> {formatCurrency(product.price)}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="outline-dark" className="btn-custom" onClick={() => handleEdit(product)}>
                      <MdEditNote fontSize={20} />
                    </Button>
                    <Button variant="outline-danger" className="btn-custom" onClick={() => handleDelete(product.id)}>
                      <MdOutlineDeleteSweep fontSize={20} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>Este vendedor ainda não tem produtos.</p>
          </Col>
        )}
      </Row>

      {/* Modal para Edição */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Form onSubmit={handleSave}>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={selectedProduct.name}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  defaultValue={selectedProduct.price}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  defaultValue={selectedProduct.description}
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  Salvar
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default ProdutosVendedor;
