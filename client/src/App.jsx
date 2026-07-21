import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import DonorDashboard from "./pages/DonorDashboard";
import ReceiverDashboard from "./pages/ReceiverDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route

                    path="/"

                    element={<Login />}

                />

                <Route

                    path="/login"

                    element={<Login />}

                />

                <Route

                    path="/signup"

                    element={<Signup />}

                />

                <Route

                    path="/donor"

                    element={

                        <ProtectedRoute role="DONOR">

                            <DonorDashboard />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/receiver"

                    element={

                        <ProtectedRoute role="RECEIVER">

                            <ReceiverDashboard />

                        </ProtectedRoute>

                    }

                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;