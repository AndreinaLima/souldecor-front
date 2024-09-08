import { Card, Button, Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaUserAlt, FaStore } from "react-icons/fa"

function Cadastro() {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="text-center w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
          <h1 className="mb-5">Cadastro</h1>
          <Row className="g-5">
            <Col className="w-100" md={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3">
                    <FaUserAlt size={50} className="text-primary" />
                  </div>
                  <Card.Title>Sou Cliente</Card.Title>
                  <Button
                    as={Link}
                    to="/cadastro/cliente"
                    variant="outline-dark"
                    className="w-100"
                  >
                    Cadastrar Cliente
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="w-100" md={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3">
                    <FaStore size={50} className="text-success" />
                  </div>
                  <Card.Title>Sou Vendedor</Card.Title>
                  <Button
                    as={Link}
                    to="/cadastro/vendedor"
                    variant="outline-dark"
                    className="w-100"
                  >
                    Cadastrar Vendedor
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Cadastro