import { useState } from "react";
import { Button } from "../Button";

const Login = () => {
    const handleGoogleLogin = () => {
        console.log("Login button clicked");
        window.location.href = "http://localhost:3001/api/auth/google";
    };

    return (
        <div>
            <div className="relative flex flex-col items-center justify-center space-y-2">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Login</h2>
                <Button onClick={handleGoogleLogin}>Login with Google</Button>
            </div>
        </div>
    );
};

export default Login;