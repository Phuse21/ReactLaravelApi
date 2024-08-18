import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Login() {

    const {setToken } = useContext(AppContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
       email : '',
       password : '',

    });

    const [errors, setError] = useState({});

   async function handleLogin(e) {
        e.preventDefault();

        const res = await fetch("/api/v1/login", {
            method: "POST",
            body: JSON.stringify(formData)});

            const data = await res.json();

            console.log("API Response:", data); 

            if (data.errors) {
                setError(data.errors);
            } else {
                const token = data.token || data.data?.token; // Safely accessing the token
                console.log("Received token:", token); // Specifically log the token
        
                // Check if token is valid before storing it
                if (token) {
                    localStorage.setItem("token", token);
                    console.log("Token set in localStorage:", localStorage.getItem("token")); // Log after setting token
                    setToken(token);
                 navigate("/");
                } else {
                    console.error("Received undefined or null token");
                }
            }

    }


    return (
        <>
            <h1 className="title">Login</h1>
            <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">
            <div>
                <input type="text" placeholder="Email" value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})} />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
                <input type="password" placeholder="Password" value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <button className="primary-btn">Login</button>

            </form>
        </>
    )
}