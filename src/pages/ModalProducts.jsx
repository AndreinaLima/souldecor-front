import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { deleteProduct, updateProduct } from "../api/productApi";
import toast from "react-hot-toast";
import "../styles/ModalProducts.css";

function ModalProducts({ show, handleClose, product, carregarProdutos, actionType }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setCategory(product.category || "");
      setImageUrl(product.imageUrl || "");
    }
  }, [product]);

  const handleDelete = () => {
    deleteProduct(product.id)
      .then(() => {
        toast.success("Produto excluído com sucesso.");
        carregarProdutos();
        handleClose();
      })
      .catch((error) => {
        toast.error("Erro ao excluir produto.");
        console.error(error);
      });
  };

  const handleUpdate = () => {
    updateProduct(product.id, { name, description, price, category, imageUrl })
      .then(() => {
        toast.success("Produto atualizado com sucesso.");
        carregarProdutos();
        handleClose();
      })
      .catch((error) => {
        toast.error("Erro ao atualizar produto.");
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (actionType === "edit") {
      handleUpdate();
    } else if (actionType === "delete") {
      handleDelete();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{actionType === "edit" ? "Editar Produto" : "Excluir Produto"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {actionType === "edit" ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProductName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do produto"
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição do produto"
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Preço do produto"
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
              <Form.Label>URL da Imagem</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL da imagem do produto"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        ) : (
          <p>Tem certeza de que deseja excluir o produto "{product.name}"?</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Fechar
        </Button>
        {actionType === "edit" ? (
          <Button className="button-update" onClick={handleSubmit}>
            Atualizar
          </Button>
        ) : (
          <Button variant="danger" onClick={handleSubmit}>
            Excluir
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
export default ModalProducts;
