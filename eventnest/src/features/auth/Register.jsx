import { useState } from 'react'
import { Link } from 'react-router'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const user = { id: crypto.randomUUID, name, email, password };

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log({
            name,
            email,
            password
        });

        localStorage.setItem('eventnestuser', JSON.stringify(user));
        console.log('User registered successfully')
    }

    return (
        <div>
            <h1>Event Nest</h1>
            <p>Plan your event</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <button type="submit">Register</button>
            </form>

            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    )
}

export default Register