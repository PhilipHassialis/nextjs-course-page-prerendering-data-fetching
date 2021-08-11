import path from "path";
import fs from "fs/promises";
import Link from "next/link";

const HomePage = (props) => {
    const { products } = props;

    return (
        <div>
            <ul>
                {products.map((prod) => (
                    <li key={prod.id}>
                        <Link href={`${prod.id}`}>{prod.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    if (!data) {
        return {
            redirect: {
                destination: "/no-data",
            },
        };
    }

    if (data.products.length === 0) {
        return { notFound: true };
    }

    return {
        props: {
            products: data.products,
        },
        revalidate: 10, // how often the page regenetares in production
    };
}

export default HomePage;
