import React from "react"
import { Container, Row, Col, Card, Tabs, Tab, Button } from "react-bootstrap"
import {
  FaInfoCircle,
  FaLock,
  FaShieldAlt,
  FaUserShield,
  FaExclamationTriangle,
  FaRegAddressCard,
  FaRegClock,
  FaHome,
  FaShoppingCart,
  FaStore,
} from "react-icons/fa"
import "../styles/Privacy.css"

export default function PoliticaPrivacidade() {
  return (
    <Container className="mt-5">
      <Row>
        <Col lg={12} xl={10} className="mx-auto mb-5">
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Card.Title as="h1" className="mb-4 text-center text-dark">
                Política de Privacidade
              </Card.Title>

              <Tabs
                defaultActiveKey="informacoes"
                id="politica-privacidade-tabs"
                className="mb-4 custom-tabs nav-pills nav-justified"
                fill
              >
                <Tab eventKey="informacoes" title="Coleta e Uso de Informações">
                  <div className="my-4">
                    <h5>
                      <FaInfoCircle /> Coleta de Informações
                    </h5>
                    <p>
                      Coletamos informações que você nos fornece diretamente,
                      como quando você cria uma conta, faz uma compra ou nos
                      contata. Também podemos coletar informações
                      automaticamente, como seu endereço IP, tipo de navegador,
                      e dados de navegação.
                    </p>
                    <h5>
                      <FaInfoCircle /> Uso das Informações
                    </h5>
                    <p>
                      Utilizamos suas informações para fornecer e melhorar
                      nossos serviços, processar suas transações, enviar
                      comunicações e personalizar sua experiência no site.
                    </p>
                  </div>
                </Tab>

                <Tab
                  eventKey="compartilhamento"
                  title="Compartilhamento e Segurança"
                >
                  <div className="my-4">
                    <h5>
                      <FaShieldAlt /> Compartilhamento de Informações
                    </h5>
                    <p>
                      Não compartilhamos suas informações pessoais com
                      terceiros, exceto conforme necessário para fornecer nossos
                      serviços ou conforme exigido por lei.
                    </p>
                    <h5>
                      <FaLock /> Segurança
                    </h5>
                    <p>
                      Tomamos medidas razoáveis para proteger suas informações
                      pessoais contra perda, roubo e uso indevido. No entanto,
                      nenhuma transmissão de dados pela Internet pode ser
                      garantida como 100% segura.
                    </p>
                  </div>
                </Tab>

                <Tab eventKey="politicas" title="Políticas da Loja">
                  <div className="my-4">
                    <h5>
                      <FaStore /> Sobre a Nossa Loja
                    </h5>
                    <p>
                      Nossa loja é especializada em produtos de casa e
                      decoração, oferecendo uma ampla gama de itens para
                      transformar seu lar. Aqui, clientes podem explorar e
                      comprar produtos variados, desde móveis e acessórios até
                      itens de decoração exclusivos. Além disso, nossa
                      plataforma permite que vendedores se cadastrem e ofereçam
                      seus produtos, criando um espaço vibrante e diversificado
                      para todos os amantes de decoração e design de interiores.
                    </p>
                    <h5>
                      <FaUserShield /> Qualidade e Segurança
                    </h5>
                    <p>
                      Trabalhamos constantemente para garantir que todos os
                      produtos vendidos na nossa plataforma atendam aos nossos
                      rigorosos padrões de qualidade e segurança. Realizamos
                      verificações regulares e garantimos que cada item listado
                      seja cuidadosamente avaliado.
                    </p>
                    <h5>
                      <FaExclamationTriangle /> Produtos Inadequados
                    </h5>
                    <p>
                      Produtos que não atendem às nossas políticas de qualidade
                      e segurança não são permitidos em nossa plataforma. Nosso
                      administrador tem autoridade para editar ou remover
                      produtos que não estejam em conformidade com nossas
                      diretrizes.
                    </p>
                    <h5>
                      <FaRegAddressCard /> Informações de Contato
                    </h5>
                    <p>
                      Para dúvidas ou questões sobre nossa política de
                      privacidade ou qualquer outro assunto relacionado à loja,
                      entre em contato conosco pelo e-mail:{" "}
                      <a href="mailto:suporte@loja.com">suporte@loja.com</a>.
                    </p>
                    <h5>
                      <FaRegClock /> Horário de Atendimento
                    </h5>
                    <p>
                      Nosso horário de atendimento é de segunda a sexta-feira,
                      das 9h às 18h.
                    </p>
                  </div>
                </Tab>

                <Tab eventKey="alteracoes" title="Alterações à Política">
                  <div className="my-4">
                    <h5>
                      <FaExclamationTriangle /> Alterações a Esta Política
                    </h5>
                    <p>
                      Podemos atualizar esta política de privacidade de tempos
                      em tempos. Recomendamos que você revise esta política
                      periodicamente para se manter informado sobre como estamos
                      protegendo suas informações.
                    </p>
                  </div>
                </Tab>
              </Tabs>

              <div className="text-center mt-4">
                <Button variant="outline-success" href="#top">
                  Voltar ao Topo
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
