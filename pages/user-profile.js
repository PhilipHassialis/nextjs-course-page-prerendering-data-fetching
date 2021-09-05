import React from "react";

const UserProfilePage = (props) => {
    return <h1>{props.userName}</h1>;
};

export default UserProfilePage;

export async function getServerSideProps(context) {
    const { params, req, res } = context;

    // console.log(req); default node objects for request / response
    // console.log(res);

    return {
        props: {
            userName: "Philip",
        },
    };
}
