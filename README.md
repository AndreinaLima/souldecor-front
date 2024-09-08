
# Documentação da Aplicação de E-commerce

Aplicação fullstack utilizando React e Node com foco em E-commerce

## Introdução

Esta aplicação é uma plataforma de e-commerce desenvolvida com as seguintes tecnologias:

- **Frontend:** React
- **Backend:** Node.js, Express
- **Banco de Dados:** MySQL Server, Firebase
- **Autenticação:** JWT (JSON Web Tokens)
- **ORM:** Sequelize

## Tecnologias Utilizadas
- **React**: Biblioteca JavaScript para construir interfaces de usuário.
    - [Documentação Oficial](https://reactjs.org/docs/getting-started.html)
- **Bootstrap**: Framework CSS para desenvolvimento responsivo e design web.
    - [Documentação Oficial](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- **CSS**: Linguagem de estilo para estilizar a aplicação.
    - [Documentação Oficial](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
    - [Documentação Oficial](https://nodejs.org/en/docs/)
- **Express**: Framework para Node.js que facilita o desenvolvimento de servidores.
    - [Documentação Oficial](https://expressjs.com/en/starter/installing.html)
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
    - [Documentação Oficial](https://dev.mysql.com/doc/)
- **Firebase**: Plataforma para backend, incluindo autenticação e armazenamento de arquivos.
    - [Documentação Oficial](https://firebase.google.com/docs)
- **JWT (JSON Web Token)**: Padrão aberto para autenticação e troca de informações seguras.
    - [Documentação Oficial](https://jwt.io/introduction/)

## Funcionalidades
### Registro e Login de Usuários

- **Registro**: Permite que novos usuários se registrem na aplicação.
- **Login**: Permite que os usuários façam login utilizando JWT para autenticação.

### Gestão de Produtos

- **CRUD de Produtos**: Adiciona, edita, visualiza e exclui produtos.
- **Categorias e Filtros**: Filtros por nome, preço mínimo, preço máximo e categoria.

### Administração

- **Administração de Usuários**: Adição, edição e exclusão de clientes, vendedores e produtos.
- **Dashboard de Administração**: Exibe gráficos e informações utilizando a biblioteca de gráficos.

### Autenticação

- **Autenticação com JWT**: Protege rotas e valida a identidade dos usuários.

## Estrutura do Projeto
### Frontend

- **React**: Utilizado para construir a interface de usuário.
- **Bootstrap** e **CSS**: Utilizados para estilização e layout.

### Backend

- **Node.js** e **Express**: Servem como servidor e API para a aplicação.
- **JWT**: Gerenciamento de autenticação e segurança.

### Banco de Dados

- **MySQL**: Armazena dados de usuários, produtos e outras informações da aplicação.

### Armazenamento de Arquivos

- **Firebase**: Armazena imagens. No Firebase Storage é utilizado para fazer o upload de uma imagem do produto, armazená-la na nuvem e recuperar a URL dessa imagem para ser associada ao produto no banco de dados Mysql.


## Instalação e Configuração

### Frontend
1. Clone o repositório:

```bash
  git clone <URL_DO_REPOSITORIO>
```

2. Navegue até a pasta do frontend:

```bash
  cd <PASTA_DO_FRONTEND>
```

3. Instale as dependências:

```bash
  npm install
```

4. Inicie o servidor de desenvolvimento 

```bash
  npm start
```

### Backend
1. Clone o repositório:

```bash
  git clone <URL_DO_REPOSITORIO>
```

2. Navegue até a pasta do frontend:

```bash
  cd <PASTA_DO_FRONTEND>
```

3. Instale as dependências:

```bash
  npm install
```

4. Configure o banco de dados no arquivo de configuração .env

5. Inicie o servidor 

```bash
  npm start
```
## Contribuição

Para contribuir com o projeto, por favor siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para a sua feature ou correção.
3. Faça suas alterações e teste.
4. Envie um pull request com uma descrição clara das mudanças.

Se você deseja contribuir para o projeto, por favor, siga as diretrizes de contribuição descritas no arquivo `README.md` no repositório.

## Links Úteis

- [Documentação do React](https://reactjs.org/docs/getting-started.html)
- [Documentação do Node.js](https://nodejs.org/en/docs/)
- [Documentação do Express](https://expressjs.com/)
- [Documentação do MySQL](https://dev.mysql.com/doc/)
- [Documentação do Firebase](https://firebase.google.com/docs)
- [Documentação do JWT](https://jwt.io/introduction/)
- [Documentação do Sequelize](https://sequelize.org/docs/v6/)
