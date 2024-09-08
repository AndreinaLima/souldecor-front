import { Spinner, Modal } from "react-bootstrap"

const LoadingOverlay = ({ show }) => {
  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      centered
      className="loading-overlay"
    >
      <Modal.Body className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status"></Spinner>{" "}
        <span>Carregando...</span>
      </Modal.Body>
    </Modal>
  )
}

export default LoadingOverlay
