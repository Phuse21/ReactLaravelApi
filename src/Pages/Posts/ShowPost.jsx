import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function ShowPost() {

    const { id } = useParams();

    const [post, setPosts] = useState(null);
    
    async function getPost() {

        const res = await fetch(`/api/v1/posts/${id}`
        );

        const data = await res.json();

        if(res.ok) {
            setPosts(data?.data);
            console.log(data?.data);
        }

    }

    useEffect(() => {
        getPost();
    }, []);


    return (
        <>
        <h1 className="title">Home</h1>

{post ?
<div key={post.id} 
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

</div>

</div>
: <p>No posts</p>}

    </>
    )
}