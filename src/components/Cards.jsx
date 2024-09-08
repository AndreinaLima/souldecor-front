import { Link } from "react-router-dom";
import {
  Card,
  Col,
  Button,
  Row,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { MdOutlineDeleteSweep, MdEditNote } from "react-icons/md";
import "../styles/Card.css";
import { FaArrowDown } from "react-icons/fa";
import { formatCurrency } from "../utils/formatCurrency";

// Componente de Card de Produto
function ProductCard({ produto, handleOpenModal, user }) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props}
    </Tooltip>
  );

  return (
    <Col md={6} lg={4} className="mb-4">
      <Card className="product-card">
        <Card.Img
          variant="top"
          src={produto.imageUrl}
          alt={produto.name}
          className="product-card-img"
        />
        {produto.price > 200 && (
          <div className="position-absolute mt-1 mx-1 discount text-bg-success px-2 rounded-4">
            <FaArrowDown size={10} className="me-1" />
            20%
          </div>
        )}
        <Card.Body className="product-card-body">
          <hr />
          <Card.Title>{produto.name}</Card.Title>
          <OverlayTrigger
            placement="bottom"
            overlay={renderTooltip(produto.description)}
          >
            <Card.Text className="product-card-text truncate">
              {produto.description}
            </Card.Text>
          </OverlayTrigger>

          <div className="product-card-text d-flex gap-1 align-items-center fs-5">
            <strong>{formatCurrency(Number(produto.price).toFixed(2))}</strong>
            {produto.price > 200 && (
              <span className="fs-6 text-secondary text-decoration-line-through">
                {formatCurrency(Number(produto.price * 1.2).toFixed(2))}
              </span>
            )}
          </div>
          {produto.price > 100 ? (
            <div className="fs-6 mb-2">
              em até <strong>10x</strong> de{" "}
              <strong className="text-success">
                {formatCurrency((produto.price / 10).toFixed(2))}
              </strong>
            </div>
          ) : (
            <div className="fs-6 mb-2">
              em até <strong>2x</strong> de{" "}
              <strong className="text-success">
                {formatCurrency((produto.price / 2).toFixed(2))}
              </strong>
            </div>
          )}
          <div className="d-flex justify-content-between">
            <Link
              to={`/produtos/${produto.id}`}
              className="btn btn-details" 
            >
              Detalhes
            </Link>
            {user && (user.role === "admin" || user.role === "vendedor") && (
              <>
                <Button
                  onClick={() => handleOpenModal(produto, "edit")}
                  variant="outline-dark"
                >
                  <MdEditNote fontSize={20} />
                </Button>
                <Button
                  onClick={() => handleOpenModal(produto, "delete")}
                  variant="outline-danger"
                >
                  <MdOutlineDeleteSweep fontSize={20} />
                </Button>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

function Cards({ produtos = [], handleOpenModal, user }) {
  return (
    <section>
      <Row>
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <ProductCard
              key={produto.id}
              produto={produto}
              handleOpenModal={handleOpenModal}
              user={user} // Passando o usuário para o ProductCard
            />
          ))
        ) : (
          <p>Não há produtos disponíveis.</p>
        )}
      </Row>
    </section>
  );
}

export default Cards;
