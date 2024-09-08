import { useState, useEffect } from "react"
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap"
import { Line } from "react-chartjs-2"
import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { getUsers } from "../api/userApi"
import { getAllProducts, getSellerProducts } from "../api/productApi"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useAuth } from "../context/userContext"

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels
)

function Administrator() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    recentProducts: [],
    newUsers: [],
    salesStats: { totalSales: 0, totalOrders: 0, salesByMonth: [] },
    pendingProducts: 0,
    activeCustomers: 0,
    recentReviews: [],
    recentOrders: [],
    activeSellers: [],
    topSellingProducts: [],
  })

  const [categoryCounts, setCategoryCounts] = useState({})
  const [productsByUser, setProductsByUser] = useState({})
  const [users, setUsers] = useState([])
  const [showRecentUsers, setShowRecentUsers] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      if (user) {
        try {
          if (user?.role !== "admin") {
            toast.error(
              "Acesso negado. Somente administradores podem acessar esta página."
            )
            navigate("/")
          }
        } catch (error) {
          return
        }
      }
    } else {
      navigate("/login")
    }
  }, [navigate])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await getUsers()
        const products = await getAllProducts()

        // Ordenar os produtos por data de criação (do mais recente para o mais antigo)
        products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

        // Ordenar usuários por data de cadastro
        fetchedUsers.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )

        const userIds = fetchedUsers
          .filter((user) => user.role === "vendedor")
          .map((user) => user.id)

        // Obter produtos dos vendedores em paralelo
        const sellerProductsPromises = userIds.map((id) =>
          getSellerProducts(id)
        )
        const sellerProductsResults = await Promise.all(sellerProductsPromises)

        const userProductCounts = {}
        sellerProductsResults.forEach((sellerProducts, index) => {
          userProductCounts[userIds[index]] = sellerProducts.length
        })

        setStats((prevStats) => ({
          ...prevStats,
          totalUsers: fetchedUsers.length,
          totalProducts: products.length,
          recentProducts: products.slice(0, 5),
          newUsers: fetchedUsers.slice(0, 5),
        }))

        setCategoryCounts(
          products.reduce((acc, product) => {
            acc[product.category] = (acc[product.category] || 0) + 1
            return acc
          }, {})
        )

        setProductsByUser(userProductCounts)
        setUsers(fetchedUsers)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const salesData = {
    labels: stats.salesStats.salesByMonth.map((data) => data.month),
    datasets: [
      {
        label: "Sales",
        data: stats.salesStats.salesByMonth.map((data) => data.total),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }

  const pieData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Contagem de Produtos por Categoria",
        data: Object.values(categoryCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`
          },
        },
      },
      datalabels: {
        color: "#000",
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex]
          return `${label}: ${value}`
        },
        anchor: "center",
        align: "center",
        font: {
          weight: "bold",
          size: 12,
        },
        padding: 2,
      },
    },
  }

  const handleToggleRecentUsers = () => {
    setShowRecentUsers(!showRecentUsers)
  }

  const userIdToName = users.reduce((acc, user) => {
    acc[user.id] = user.name
    return acc
  }, {})

  const displayedUsers = showRecentUsers
    ? Object.entries(productsByUser)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5) // Ordena e mostra os 5 primeiros
    : Object.entries(productsByUser).sort((a, b) => b[1] - a[1]) // Ordena todos

  if (!user) {
    return null
  }

  if (user.role !== "admin") {
    return <p>Você não tem permissão para acessar esta página.</p>
  }

  return (
    <Container>
      <h1 className="my-4">Dashboard do Administrador</h1>
      <h3 className="my-4">
        Administração de usuários:{" "}
        <Button
          style={{ backgroundColor: "#A4AF97", color: "#fff", border: "none" }}
          as={Link}
          to="/admUser"
          className="custom-button"
        >
          Usuários
        </Button>
        {/* <Button style={{ backgroundColor: "#A4AF97", color: "#fff" }} as={Link} to="/admUser">
          Usuários
        </Button> */}
        {/* <Button style={{ backgroundColor: "#A4AF97", color: "#fff" }} as={Link} to="/admUser">
          Usuários
        </Button> */}
      </h3>

      <Row className="mb-4">
        <Col xs={12} sm={6} md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total de Usuários</Card.Title>
              <Card.Text className="text-center">{stats.totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total de Produtos</Card.Title>
              <Card.Text className="text-center">
                {stats.totalProducts}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Produtos Pendentes</Card.Title>
              <Card.Text className="text-center">
                {stats.pendingProducts}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Produtos Recentes</Card.Title>
              <ListGroup variant="flush">
                {stats.recentProducts.map((product, index) => (
                  <ListGroup.Item key={index}>
                    {product.name} - {product.category}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Novos Usuários</Card.Title>
              <ListGroup variant="flush">
                {stats.newUsers.map((user, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex flex-column flex-sm-row justify-content-between w-100">
                      <div className="col-4">{user.name}</div>
                      <div className="col-5">{user.email}</div>
                      <div className="col-3">
                        {user.role === "admin"
                          ? "Administrador"
                          : user.role === "vendedor"
                          ? "Vendedor"
                          : "Cliente"}
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Distribuição de Produtos por Categoria</Card.Title>
              <div style={{ position: "relative", height: "300px" }}>
                <Pie data={pieData} options={pieOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Produtos por Vendedor</Card.Title>
              <Button
                className="mt-2"
                onClick={handleToggleRecentUsers}
                style={{
                  backgroundColor: "#A4AF97",
                  color: "#fff",
                  border: "none",
                }}
              >
                {showRecentUsers ? "Mostrar Todos" : "Mostrar Recentes"}
              </Button>
              <ListGroup variant="flush">
                {displayedUsers.map(([userId, productCount]) => (
                  <ListGroup.Item
                    key={userId}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {userIdToName[userId]} - {productCount} produtos
                    </span>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="primary"
                        size="sm"
                        as={Link}
                        to={`/produtos/vendedor/${userId}`}
                        className="px-2 py-1"
                        style={{
                          backgroundColor: "#A4AF97",
                          color: "#fff",
                          border: "none",
                        }}
                      >
                        Ver Produtos
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={12} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Estatísticas de Vendas</Card.Title>
              <Card.Text>
                Total de Vendas: ${stats.salesStats.totalSales}
              </Card.Text>
              <Card.Text>
                Total de Pedidos: {stats.salesStats.totalOrders}
              </Card.Text>
              <Line data={salesData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Administrator