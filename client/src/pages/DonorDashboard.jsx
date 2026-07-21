import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import CreateDonation from "./donor/CreateDonation";
import MyDonations from "./donor/MyDonations";
import DashboardStats from "../components/DashboardStats";
import RecentActivity from "../components/RecentActivity";
import DonorProfile from "./donor/DonorProfile";
import Notifications from "./donor/Notifications";

function DonorDashboard() {

    const navigate = useNavigate();

    const [refreshStats, setRefreshStats] = useState(false);

    const [activeTab, setActiveTab] = useState("dashboard");

    useEffect(() => {

        const token = localStorage.getItem("token");

        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) {

            navigate("/login");

            return;

        }

        if (user.role !== "DONOR") {

            navigate("/login");

        }

    }, [navigate]);

    return (

        <div className="min-h-screen bg-[#FDF8F0] flex">

            <Sidebar

                activeTab={activeTab}

                setActiveTab={setActiveTab}

            />

            <main className="flex-1 p-8 overflow-y-auto">

                <Header />

                <div className="mt-8">
                    
                    {

                        activeTab === "dashboard" && (

                            <div className="space-y-6">

                                <div className="mt-6">

                                    <h2 className="text-3xl font-bold text-stone-800">

                                        My Dashboard

                                    </h2>

                                    <p className="text-stone-500 mt-2">

                                        Share surplus food with those in need and track the impact of every donation.

                                    </p>

                                </div>

                                <div className="mt-6">

                                    <DashboardStats

                                        refresh={refreshStats}

                                    />

                                </div>

                                <div>

                                    <RecentActivity />

                                </div>

                            </div>

                        )

                    }

                    {

                        activeTab === "create" && (

                            <CreateDonation />

                        )

                    }

                    {

                        activeTab === "donations" && (

                            <MyDonations />

                        )

                    }

                    {
                        activeTab === "notifications" && (

                            <Notifications/>

                        )
                    }

                    {

                        activeTab === "profile" && (

                            <DonorProfile />

                        )

                    }

                </div>

            </main>

        </div>

    );

}

export default DonorDashboard;