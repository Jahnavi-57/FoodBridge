import {

    ClipboardList,
    CheckCircle2,
    HandHeart,
    XCircle

} from "lucide-react";

function ReceiverStatisticsCards({

    statistics

}) {

    const cards = [

        {

            title: "Requested",

            value: statistics?.requested || 0,

            icon: <ClipboardList size={28} />,

            color: "bg-blue-100 text-blue-700"

        },

        {

            title: "Accepted",

            value: statistics?.accepted || 0,

            icon: <CheckCircle2 size={28} />,

            color: "bg-green-100 text-green-700"

        },

        {

            title: "Collected",

            value: statistics?.collected || 0,

            icon: <HandHeart size={28} />,

            color: "bg-purple-100 text-purple-700"

        },

        {

            title: "Rejected",

            value: statistics?.rejected || 0,

            icon: <XCircle size={28} />,

            color: "bg-red-100 text-red-700"

        }

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {

                cards.map((card) => (

                    <div

                        key={card.title}

                        className="bg-white rounded-2xl shadow-md border border-stone-200 p-6"

                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-sm text-stone-500">

                                    {card.title}

                                </p>

                                <h2 className="text-3xl font-bold text-stone-800 mt-2">

                                    {card.value}

                                </h2>

                            </div>

                            <div

                                className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.color}`}

                            >

                                {card.icon}

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default ReceiverStatisticsCards;