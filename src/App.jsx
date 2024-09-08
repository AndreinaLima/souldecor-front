import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Cadastro from "./pages/Cadastro"
import Login from "./pages/Login"
import CadastroVendedor from "./pages/CadastroVendedor"
import CadastroCliente from "./pages/CadastroCliente"
import Products from "./pages/Products"
import AddProducts from "./pages/AddProducts"
import Administrator from "./pages/Administrator"
import ProfilePage from "./pages/ProfilePage"
import AlterarSenha from "./pages/AlterarSenha"
import AdmUser from "./pages/AdmUser"
import { AuthProvider } from "./context/userContext"
import ProductDetail from "./components/ProductDetail"
import PoliticaPrivacidade from "./components/PoliticaPrivacidade"
import CartPage from "./pages/CartPages"
import CartProvider from "./context/CartProvider"
import ProdutosVendedor from './pages/ProdutosVendedor'

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro/vendedor" element={<CadastroVendedor />} />
            <Route path="/cadastro/cliente" element={<CadastroCliente />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/produtos/vendedor/:userId" element={<ProdutosVendedor />} />
            <Route path="/produtos/novo" element={<AddProducts />} />
            <Route path="/produtos/:id" element={<ProductDetail />} />
            <Route path="/produtos/:userId" element={<ProdutosVendedor />} />
            <Route path="/admin" element={<Administrator />} />
            <Route path="/admUser" element={<AdmUser />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/alterar-senha" element={<AlterarSenha />} />
            <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/carrinho" element={<CartPage />} /> 
          </Routes>
          <Footer />
          <Toaster position="top-center" />
          </CartProvider>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  )
}

export default App;