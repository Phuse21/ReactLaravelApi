// import { useContext } from "react"
// import { AppContext } from "./Context/AppContext"

import { useContext, useEffect } from "react";
import { AppContext } from "./Context/AppContext";

export default function Home() {

    const { token } = useContext(AppContext);

    async function getPost() {

        const res = await fetch('/api/v1/posts',{
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        );

        const data = await res.json();

        console.log(data);
    }

    useEffect(() => {
        getPost();
    }, []);

    

    return (
        <>
            <h1 className="title">Home</h1>

        </>
    )
}