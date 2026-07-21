import { useEffect, useState } from "react";

import {
    Clock,
    Package
} from "lucide-react";

import {
    getRecentActivity
} from "../services/donationService";


function RecentActivity(){

    const [activities,setActivities] = useState([]);


    useEffect(()=>{

        fetchActivity();

    },[]);



    const fetchActivity = async()=>{

        try{

            const response =
                await getRecentActivity();


            setActivities(
                response.activities
            );

        }

        catch(error){

            console.error(
                "Failed to fetch activity",
                error
            );

        }

    };


    return(

        <div className="bg-white rounded-2xl shadow-md p-8">


            <h3 className="text-xl font-semibold text-stone-800 mb-6">

                Recent Activity

            </h3>


            {

                activities.length === 0 ?

                (

                    <p className="text-stone-500">

                        No recent activity yet.

                    </p>

                )

                :

                (

                    <div className="space-y-5">


                    {

                        activities.map((activity)=>(


                            <div

                                key={activity.id}

                                className="flex items-center gap-4 border-b pb-4"

                            >


                                <div className="bg-amber-100 p-3 rounded-xl">

                                    <Package size={22}/>

                                </div>


                                <div className="flex-1">


                                    <h4 className="font-semibold text-stone-800">

                                        {activity.food_name}

                                    </h4>


                                    <p className="text-stone-500 text-sm">

                                        Status: {activity.status}

                                    </p>


                                </div>


                                <div className="text-sm text-stone-400 flex items-center gap-1">

                                    <Clock size={15}/>

                                    {

                                        new Date(

                                            activity.updated_at

                                        ).toLocaleDateString()

                                    }

                                </div>


                            </div>


                        ))

                    }


                    </div>

                )

            }


        </div>

    );

}


export default RecentActivity;