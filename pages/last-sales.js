import React, { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = () => {
    const [sales, setSales] = useState();
    // const [isLoading, setIsLoading] = useState(false);

    const { data, error } = useSWR(
        "https://page-prerendering-data-fetch-default-rtdb.firebaseio.com/sales.json"
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
    if (!data) return <p>Still Loading...</p>;

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

export default LastSalesPage;
