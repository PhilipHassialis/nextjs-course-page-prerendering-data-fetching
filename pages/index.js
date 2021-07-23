
const HomePage = (props) => {

  const { products } = props;

  return (
    <div >
      <ul>
        {products.map(prod => <li key={prod.id}>{prod.title}</li>)}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      products: [{ id: "prod1", title: "Product One" }]
    }
  };
}

export default HomePage;