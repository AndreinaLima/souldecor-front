import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { updatePassword } from "../api/userApi";

function AlterarSenha() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.novaSenha !== data.confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      const response = await updatePassword(data.senhaAntiga, data.novaSenha);
      if (response.status === 200) {
        toast.success("Senha alterada com sucesso!");
        navigate("/perfil");
      } else if (response.status === 401) {
        toast.error("Senha atual incorreta.");
      } else if (response.status === 404) {
        toast.error("Usuário não encontrado.");
      }
    } catch (error) {
      toast.error("Erro ao alterar a senha.");
      console.error(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <h1 className="text-center mb-4">Alterar Senha</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formSenhaAntiga" className="mb-3">
              <Form.Label>Senha Antiga</Form.Label>
              <Form.Control
                type="password"
                {...register("senhaAntiga", {
                  required: "A senha antiga é obrigatória",
                })}
                className={errors.senhaAntiga ? "is-invalid" : ""}
              />
              {errors.senhaAntiga && (
                <small className="invalid-feedback">
                  {errors.senhaAntiga.message}
                </small>
              )}
            </Form.Group>
            <Form.Group controlId="formNovaSenha" className="mb-3">
              <Form.Label>Nova Senha</Form.Label>
              <Form.Control
                type="password"
                {...register("novaSenha", {
                  required: "A nova senha é obrigatória",
                  minLength: { value: 6, message: "Mínimo de 6 caracteres" },
                })}
                className={errors.novaSenha ? "is-invalid" : ""}
              />
              {errors.novaSenha && (
                <small className="invalid-feedback">
                  {errors.novaSenha.message}
                </small>
              )}
            </Form.Group>
            <Form.Group controlId="formConfirmarSenha" className="mb-3">
              <Form.Label>Confirmar Nova Senha</Form.Label>
              <Form.Control
                type="password"
                {...register("confirmarSenha", {
                  required: "A confirmação da senha é obrigatória",
                })}
                className={errors.confirmarSenha ? "is-invalid" : ""}
              />
              {errors.confirmarSenha && (
                <small className="invalid-feedback">
                  {errors.confirmarSenha.message}
                </small>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Alterar Senha
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AlterarSenha;
