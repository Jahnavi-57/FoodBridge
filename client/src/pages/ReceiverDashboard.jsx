import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import ReceiverSidebar from "../components/ReceiverSidebar";
import ReceiverHeader from "../components/ReceiverHeader";
import AvailableDonations from "./receiver/AvailableDonations";
import MyRequests from "./receiver/MyRequests";
import ReceiverProfile from "./receiver/ReceiverProfile";
import Notifications from "./receiver/Notifications";

function ReceiverDashboard() {

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("dashboard");

    const [locationMessage, setLocationMessage] = useState("");


    useEffect(() => {

        const token = localStorage.getItem("token");

        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) {

            navigate("/login");

            return;

        }

        if (user.role !== "RECEIVER") {

            navigate("/login");

        }

    }, [navigate]);


    useEffect(() => {

        getCurrentLocation();

    }, []);


    const getCurrentLocation = () => {

        if (!navigator.geolocation) {

            setLocationMessage(
                "Location is not supported by your browser."
            );

            return;

        }

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);

                try {

                    const token = localStorage.getItem("token");

                    await fetch(
                        "https://foodbridge-backend-npfa.onrender.com/api/receivers/location",
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                latitude,
                                longitude
                            })
                        }
                    );

                    setLocationMessage(
                        "Location updated successfully."
                    );

                }
                catch (error) {

                    console.error(
                        "Location update failed",
                        error
                    );

                }

            },

            (error) => {

                console.log(error);

                if (error.code === 1) {

                    setLocationMessage(
                        "Location permission denied. Using saved location."
                    );

                }
                else {

                    setLocationMessage(
                        "Unable to get current location."
                    );

                }

            }

        );

    };


    return (

        <div className="min-h-screen bg-[#FDF8F0] flex">

            <ReceiverSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <main className="flex-1 p-8 overflow-y-auto">

                <ReceiverHeader />

                {
                    locationMessage && (
                        <div className="mt-4 text-sm text-stone-600">
                            {locationMessage}
                        </div>
                    )
                }

                <div className="mt-8">

                    {
                        activeTab === "dashboard" && (

                            <div className="space-y-6">


                                <div>
                                    <AvailableDonations />
                                </div>

                            </div>

                        )
                    }

                    {
                        activeTab === "requests" && (
                            <MyRequests />
                        )
                    }

                    {
                        activeTab === "notifications" && (
                            <Notifications/>
                        )
                    }

                    {
                        activeTab === "profile" && (
                            <ReceiverProfile/>
                        )
                    }

                </div>

            </main>

        </div>

    );

}

export default ReceiverDashboard;