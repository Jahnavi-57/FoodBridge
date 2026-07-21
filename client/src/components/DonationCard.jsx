import { MapPin, Clock, Package, Pencil, Ban } from "lucide-react";


function DonationCard({

    donation,

    onEdit,

    onCancel

}) {


    const statusColors = {


        AVAILABLE: "bg-green-100 text-green-700",

        REQUESTED: "bg-yellow-100 text-yellow-700",

        ACCEPTED: "bg-purple-100 text-purple-700",

        COLLECTED: "bg-blue-100 text-blue-700",

        EXPIRED: "bg-gray-100 text-gray-700",

        CANCELLED: "bg-red-100 text-red-700"


    };



    return (


        <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-6 hover:shadow-lg transition">



            <div className="flex justify-between items-start">


                <div>


                    <h3 className="text-xl font-bold text-stone-800">

                        🍱 {donation.food_name}

                    </h3>


                    <p className="text-stone-500 mt-1">

                        {donation.description || "No description provided"}

                    </p>


                </div>





                <span

                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        
                        statusColors[donation.status]

                    }`}

                >

                    {donation.status}

                </span>


            </div>





            {/* Details */}


            <div className="grid md:grid-cols-2 gap-4 mt-6">



                <div className="flex items-center gap-2 text-stone-600">


                    <Package size={18} />


                    <span>

                        {donation.quantity} {donation.unit}

                    </span>


                </div>





                <div className="flex items-center gap-2 text-stone-600">


                    <Clock size={18} />


                    <span>

                        Expires:{" "}

                        {new Date(

                            donation.expiry_time

                        ).toLocaleString()}

                    </span>


                </div>





                <div className="md:col-span-2 flex items-start gap-2 text-stone-600">


                    <MapPin size={18} className="mt-1" />


                    <span>

                        {donation.pickup_address}

                    </span>


                </div>


            </div>





            {/* Footer Buttons */}



            {

                donation.status === "AVAILABLE" && (


                    <div className="flex gap-3 mt-6">



                        <button


                            onClick={() => onEdit(donation)}


                            className="flex-1 flex justify-center items-center gap-2 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium transition"


                        >


                            <Pencil size={18} />


                            Edit


                        </button>





                        <button


                            onClick={() => onCancel(donation.id)}


                            className="flex-1 flex justify-center items-center gap-2 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition"


                        >


                            <Ban size={18} />


                            Cancel


                        </button>



                    </div>


                )


            }



        </div>


    );


}


export default DonationCard;