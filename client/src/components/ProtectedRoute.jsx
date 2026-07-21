import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

    const token = localStorage.getItem("token");

    const user = JSON.parse(

        localStorage.getItem("user")

    );

    if (!token) {

        return <Navigate to="/login" replace />;

    }

    if (!user) {

        return <Navigate to="/login" replace />;

    }

    if (user.role !== role) {

        if (user.role === "DONOR") {

            return <Navigate to="/donor" replace />;

        }

        if (user.role === "RECEIVER") {

            return <Navigate to="/receiver" replace />;

        }

        return <Navigate to="/login" replace />;

    }

    return children;

}

export default ProtectedRoute;