import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../styles/Footer.css"

export default function Footer() {
  const currentYear = new Date().getFullYear() // Obtém o ano atual

  return (
    <footer className="text-center py-3 border-top">
      <Container>
        <Row className="d-flex justify-content-center align-items-center small">
          <Col xs="auto">
            <p className="mb-0">
              Desenvolvido por <br />
              <a target="_blank" href="https://www.linkedin.com/in/alana-soares-silva/" className="text-decoration-none small">
                Alana
              </a>
              ,{" "}
              <a
                href="https://www.linkedin.com/in/andreinalima"
                className="text-decoration-none small" target="_blank"
              >
                Andreina
              </a>
              ,{" "}
              <a target="_blank" href="https://www.linkedin.com/in/leonardo-costa-dev97/" className="text-decoration-none small">
                Leonardo
              </a>
              ,{" "}
              <a target="_blank" href="https://www.linkedin.com/in/marceloreggiani/" className="text-decoration-none small">
                Marcelo
              </a>{" "}
              e{" "}
              <a target="_blank" href="https://www.linkedin.com/in/zirlane-fiuza/" className="text-decoration-none small">
                Zirlane
              </a>
            </p>
          </Col>
          <Row className="d-flex align-items-center justify-content-center mt-3">
            <Col>
              <p className="mb-0">
                <Link
                  to="/politica-privacidade"
                  className="text-decoration-none small"
                >
                  Política de Privacidade
                </Link>
              </p>
            </Col>
            <Col>
              <p className="mb-0 small">
                &copy; {currentYear} - Todos os direitos reservados.
              </p>
            </Col>
          </Row>
        </Row>
      </Container>
    </footer>
  )
}
