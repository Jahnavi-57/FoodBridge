import {

    PackageOpen,
    ClipboardList,
    CheckCircle,
    Gift

} from "lucide-react";

function ReceiverDashboardStats() {

    const cards = [

        {

            title:"Available",

            value:"--",

            icon:<PackageOpen size={30}/>

        },

        {

            title:"Requested",

            value:"--",

            icon:<ClipboardList size={30}/>

        },

        {

            title:"Accepted",

            value:"--",

            icon:<CheckCircle size={30}/>

        },

        {

            title:"Collected",

            value:"--",

            icon:<Gift size={30}/>

        }

    ];

    return(

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            {

                cards.map((card,index)=>(

                    <div

                        key={index}

                        className="bg-white rounded-2xl shadow p-6"

                    >

                        <div className="flex justify-between">

                            <div>

                                <p className="text-stone-500">

                                    {card.title}

                                </p>

                                <h2 className="text-3xl font-bold mt-2">

                                    {card.value}

                                </h2>

                            </div>

                            <div className="text-green-600">

                                {card.icon}

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default ReceiverDashboardStats;