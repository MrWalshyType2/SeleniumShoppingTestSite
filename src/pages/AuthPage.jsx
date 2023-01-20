import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ cb, login, register, to }) {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleUsernameChange = event => setUsername(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);

    const handleFormSubmit = event => {
        event.preventDefault();
        if (!cb({ username, password })) setError("Invalid user details, please try again...");
        else navigate(to);
    }

    return (
        <>
            <header className="header">
                <h1 className="title">
                    {login && !register && "Login to your Fake Gadgets Store account"}
                    {register && !login && "Register a new Fake Gadgets Store account"}
                    {!register && !login && "Submit your Fake Gadgets Store account details"}
                </h1>
                <p>Welcome to Fake Gadgets Direct, the worlds leading fake supplier of electronic gadgets!</p>
            </header>
            <main className="w-80 w-sm-90 mx-auto">
                <form onSubmit={handleFormSubmit} className="mt-16">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <div className="btn-form-group">
                        <button className="btn bg-primary fg-light" type="submit">
                            {login && !register && "Login"}
                            {register && !login && "Register"}
                            {!register && !login && "Submit"}
                        </button>
                    </div>
                </form>
                {error && <p className="fg-danger">{error}</p>}
            </main>
        </>
    )
}