// import { useContext } from "react"
// import { AppContext } from "./Context/AppContext"

import { useContext, useEffect, useState } from "react";
import { AppContext } from "./Context/AppContext";

export default function Home() {

    const [posts, setPosts] = useState([]);

    const { token } = useContext(AppContext);

    async function getPost() {

        const res = await fetch('/api/v1/posts',{
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        );

        const data = await res.json();

        if(res.ok) {
            setPosts(data?.data);
            console.log(data);
        }

    }

    useEffect(() => {
        getPost();
    }, []);

    

    return (
        <>
            <h1 className="title">Home</h1>

    {posts.length > 0 ? posts.map(post => (<div key={post.id}>
    
    <div>
        <div>
            <h3>
                {post.title}
            </h3>
            <small>
                Created by {post?.user?.user?.name} on {""}
                {new Date(post.created_at).toLocaleDateString()}
            </small>
        </div>            
        <p>{post.body}</p>
    </div>
    
    
    </div>))
    : <p>No posts</p>}

        </>
    )
}