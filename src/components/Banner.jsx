import { Container, Row, Col, Carousel } from 'react-bootstrap';
import decor1 from '../assets/img/decor1.png';
import decor2 from '../assets/img/decor5.png';
import decor3 from '../assets/img/decor6.png'; 
import decor4 from '../assets/img/decor2.png'; 
import '../styles/Banner.css';

export default function Banner() {
  return (
    <section className="banner-section py-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <Carousel className="banner-carousel" controls={false} indicators={false} interval={3000} pause={false}>
              <Carousel.Item>
                <img
                  src={decor1}
                  alt="Decor 1"
                  className="d-block w-100"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src={decor2}
                  alt="Decor 2"
                  className="d-block w-100"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src={decor3}
                  alt="Decor 3"
                  className="d-block w-100"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src={decor4}
                  alt="Decor 4"
                  className="d-block w-100"
                />
              </Carousel.Item>
            </Carousel>
            <p className="display-4 mt-5">Seja bem-vindo(a) à nossa loja!</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
