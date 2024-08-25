import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function ShowPost() {
    const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPosts] = useState(null);

  const { user, token } = useContext(AppContext);

  async function getPost() {
    const res = await fetch(`/api/v1/posts/${id}`);

    const data = await res.json();

    if (res.ok) {
      setPosts(data?.data);
      console.log(data?.data);
    }
  }

  async function handleDeletePost(e) {
    e.preventDefault();

    if(user?.id === post?.user_id) {
        const res = await fetch(`/api/v1/posts/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if(res.ok) {
            navigate('/');
        }
        console.log("API Response:", data);
        
    }

  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <h1 className="title">Post</h1>

      {post ? (
        <div
          key={post.id}
          className="mx-10 mb-4 border border-gray-400 p-4 rounded-md"
        >
          <div>
            <div className="flex justify-between items-start mb-2 border-b pb-2 border-gray-400">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <small className="text-gray-500 text-xs">
                Created by {post?.user?.name} on {""}
                {new Date(post.created_at).toLocaleDateString()}
              </small>
            </div>
            <p>{post.body}</p>
            {user?.id === post.user_id && (
              <div className="flex justify-end">
                <div className="flex gap-2">
                  <Link
                    to={`/posts/updatePost/${post.id}`}
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                  >
                    Update
                  </Link>
                  <form onSubmit={handleDeletePost}>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="title">Post Not Found!</p>
      )}
    </>
  );
}
