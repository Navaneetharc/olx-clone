import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../components/Firebase/Firebase";

interface ProtectedRouteProps{
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const [user, loading] = useAuthState(auth);

    if(loading){
        return <div className="p-10 text-center">Loading session</div>
    }

    if(!user){
        return <Navigate to="/" replace/>
    }

    return children;
}

export default ProtectedRoute;