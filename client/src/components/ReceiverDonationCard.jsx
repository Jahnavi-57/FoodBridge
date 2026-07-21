import {

    Clock,
    MapPin,
    Package

} from "lucide-react";

import {

    requestDonation, markCollected

} from "../services/requestService";


function ReceiverDonationCard({

    donation,

    refresh

}) {


    const handleRequest = async () => {

        try {

            const response = await requestDonation(

                donation.id

            );


            alert(response.message);


            refresh();


        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to request donation."

            );

        }

    };

    const handleCollected = async () => {

        try {

            const response = await markCollected(

                donation.request_id

            );

            alert(response.message);

            refresh();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to mark donation as collected."

            );

        }

    };

    const requestStatus = donation.request_status;



    return (

        <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-6">


            <div className="flex justify-between">


                <h2 className="text-2xl font-bold text-stone-800">

                    {donation.food_name}

                </h2>



                <span

                    className={`

                        px-3

                        py-1

                        rounded-full

                        text-sm

                        font-semibold

                        ${donation.food_type === "VEG"

                            ? "bg-green-100 text-green-700"

                            : "bg-red-100 text-red-700"}

                    `}

                >

                    {donation.food_type}

                </span>


            </div>




            <p className="text-stone-500 mt-3">

                {donation.description}

            </p>





            <div className="space-y-2 mt-5 text-sm text-stone-600">


                <div className="flex items-center gap-2">


                    <Package size={16} />


                    {donation.quantity} {donation.unit}


                </div>




                <div className="flex items-center gap-2">


                    <Clock size={16} />


                    Expires:

                    {" "}

                    {

                        new Date(

                            donation.expiry_time

                        ).toLocaleString()

                    }


                </div>





                <div className="flex items-center gap-2">


                    <MapPin size={16} />


                    {donation.pickup_address}


                </div>



            </div>





            {/* Request Status Handling */}


            {

                !requestStatus && (


                    <button

                        onClick={handleRequest}

                        className="

                        mt-6

                        w-full

                        bg-green-600

                        hover:bg-green-700

                        text-white

                        rounded-xl

                        py-3

                        font-semibold

                        transition

                        "

                    >

                        Request Food


                    </button>


                )

            }






            {

                requestStatus === "PENDING" && (


                    <div

                        className="

                        mt-6

                        w-full

                        bg-yellow-100

                        text-yellow-700

                        rounded-xl

                        py-3

                        text-center

                        font-semibold

                        "

                    >

                        ✓ Request Sent

                        <br />

                        <span className="text-sm font-normal">

                            Waiting for donor approval

                        </span>


                    </div>


                )

            }







            {

                requestStatus === "ACCEPTED" && (


                    <button

                        onClick={handleCollected}

                        className="

                        mt-6

                        w-full

                        bg-blue-600

                        hover:bg-blue-700

                        text-white

                        rounded-xl

                        py-3

                        font-semibold

                        transition

                        "

                    >

                        ✅ Mark as Collected

                    </button>

                )

            }







            {

                requestStatus === "COMPLETED" && (


                    <div

                        className="

                        mt-6

                        w-full

                        bg-green-100

                        text-green-700

                        rounded-xl

                        py-3

                        text-center

                        font-semibold

                        "

                    >

                        🎉 Food Collected Successfully


                    </div>


                )

            }




        </div>

    );

}


export default ReceiverDonationCard;