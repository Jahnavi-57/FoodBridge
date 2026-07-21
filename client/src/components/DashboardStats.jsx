import { useEffect, useState } from "react";

import {
    PackageCheck,
    CheckCircle,
    XCircle,
    Clock3
} from "lucide-react";

import {
    getDashboardStatistics
} from "../services/donationService";

function DashboardStats() {

    const [stats, setStats] = useState({

        active: 0,

        collected: 0,

        cancelled: 0,

        expired: 0

    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchStatistics();

    }, []);

    const fetchStatistics = async () => {

        try {

            const response = await getDashboardStatistics();

            console.log(response.statistics);

            setStats({

                active: Number(response.statistics.active) || 0,

                collected: Number(response.statistics.collected) || 0,

                cancelled: Number(response.statistics.cancelled) || 0,

                expired: Number(response.statistics.expired) || 0

            });

        }

        catch (error) {

            console.error(

                "Failed to fetch statistics",

                error

            );

        }

        finally {

            setLoading(false);

        }

    };

    const cards = [

        {

            title: "Active",

            value: stats.active,

            icon: <PackageCheck size={30} />,


        },

        {

            title: "Collected",

            value: stats.collected,

            icon: <CheckCircle size={30} />,


        },

        {

            title: "Cancelled",

            value: stats.cancelled,

            icon: <XCircle size={30} />,


        },

        {

            title: "Expired",

            value: stats.expired,

            icon: <Clock3 size={30} />,


        }

    ];

    if (loading) {

        return (

            <p className="text-stone-500">

                Loading statistics...

            </p>

        );

    }

    return (

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            {

                cards.map((card, index) => (

                    <div

                        key={index}

                        className="bg-white rounded-2xl shadow-md border border-stone-300 p-6 hover:shadow-lg transition"

                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-stone-500 text-base">

                                    {card.title}

                                </p>

                                <h2 className="text-3xl font-bold text-stone-800 mt-2">

                                    {card.value}

                                </h2>

                            </div>

                            <div className="text-amber-500">

                                {card.icon}

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default DashboardStats;