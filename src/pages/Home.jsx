import Banner from "../components/Banner";
import Products from "../pages/Products"

function Home () {
  return (
    <>
      <Banner />
      <h1 className="text-center fw-bold">Souldecor - casa & decoração</h1>
      <Products />
    </>
  )
}

export default Home;