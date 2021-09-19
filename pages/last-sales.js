import React, { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
    const [sales, setSales] = useState(props.sales);
    // const [isLoading, setIsLoading] = useState(false);

    const fetcher = (url) => fetch(url).then((r) => r.json());

    const { data, error } = useSWR(
        "https://page-prerendering-data-fetch-default-rtdb.firebaseio.com/sales.json",
        fetcher
    );

    useEffect(() => {
        if (data) {
            console.log(data);
            const transformedSales = [];
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }
            setSales(transformedSales);
        }
    }, [data]);

    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch(
    //         "https://page-prerendering-data-fetch-default-rtdb.firebaseio.com/sales.json"
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             const transformedSales = [];
    //             for (const key in data) {
    //                 transformedSales.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume,
    //                 });
    //             }
    //             setSales(transformedSales);
    //             setIsLoading(false);
    //         });
    // }, []);

    console.log(data);

    if (error) return <p>Failed to load</p>;
    if (!data && !sales) return <p>Loading...</p>;

    // if (isLoading) return <p>Loading...</p>;
    if (!sales) return <p>No data yet...</p>;

    return (
        <ul>
            {sales &&
                sales.map((sale) => (
                    <li key={sale.id}>
                        {sale.username} - {sale.volume}
                    </li>
                ))}
        </ul>
    );
};

export async function getStaticProps(ctx) {
    const response = await fetch(
        "https://page-prerendering-data-fetch-default-rtdb.firebaseio.com/sales.json"
    );
    const data = await response.json();
    const transformedSales = [];
    for (const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
        });
    }
    return { props: { sales: transformedSales }, revalidate: 600 };
}

export default LastSalesPage;
