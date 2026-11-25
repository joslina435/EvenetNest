import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useDispatch } from "react-redux";
import { loginSuccess } from "./AuthSlice";


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem('eventnestuser'));
        console.log(storedUser);
        if (!storedUser) {
            console.log('No user found')
        }
        if (email === storedUser?.email && password === storedUser?.password) {
            console.log('User loggedin successfully');
            dispatch(loginSuccess(storedUser))
            navigate('/dashboard')
        }
        else {
            console.log('Invalid email or password')
        }
    }

    return (
        <>
            <h1>Event Nest</h1>
            <p>Plan your event</p>

            <p>Please Login Here</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>

                <button type="submit">Submit</button>
            </form>
            <p>Dont have an account ? Please <Link to="/register">Register</Link></p>


        </>
    )



}

export default Login