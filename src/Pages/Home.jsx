
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {

    const [posts, setPosts] = useState([]);


    async function getPost() {

        const res = await fetch('/api/v1/posts'
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

    {posts.length > 0 ? posts.map(post => (<div key={post.id} 
    className="mx-10 mb-4 border border-gray-400 p-4 rounded-md">
    
    <div>
        <div className="flex justify-between items-start mb-2 border-b pb-2 border-gray-400">
            <h3 className="text-xl font-bold">
                {post.title}
            </h3>
            <small className="text-gray-500 text-xs">
                Created by {post?.user?.name} on {""}
                {new Date(post.created_at).toLocaleDateString()}
            </small>
        </div>            
        <p>{post.body}</p>
        <div className="mt-2 flex justify-end">
            <Link to={`/posts/${post.id}`} className="bg-blue-500 text-sm rounded-lg px-3 py-1 text-white">Read More</Link>
        </div>
    </div>
    
    
    </div>))
    : <p>No posts</p>}

        </>
    )
}