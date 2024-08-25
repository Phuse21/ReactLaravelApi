import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePost() {
    const {token,user} = useContext(AppContext);
    const {id} = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        body: '',
    });

    const [errors, setErrors] = useState({});

    async function getPost() {

        const res = await fetch(`/api/v1/posts/${id}`
        );

        const data = await res.json();

        if(res.ok) {

            if (data.data.user_id !== user?.id) {
                navigate('/');
            }
            setFormData({
                title: data.data.title,
                body: data.data.body,
            });
        }

    }

    async function handleUpdatePost(e) {

        e.preventDefault();

        const res = await fetch(`/api/v1/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            navigate('/');  
        }
        console.log('API Response:', data);

    }

    useEffect(() => {
        getPost();
    }, []);

    return (
        <div>
            <h1 className="title">Update Post</h1>

            <form onSubmit={handleUpdatePost} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text" placeholder="Title" value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                    {errors.title && <p className="text-red-500">{errors.title[0]}</p>}
                </div>
                <div>
                <textarea rows="6" placeholder="body" value={formData.body} 
                onChange={e => setFormData({...formData, body: e.target.value})}></textarea>
                {errors.body && <p className="text-red-500">{errors.body[0]}</p>}
                </div>
                <button className="primary-btn">Update</button>
            </form>
        </div>
    )
}