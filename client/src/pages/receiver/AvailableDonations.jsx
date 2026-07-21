import { useEffect, useState } from "react";

import ReceiverDonationCard from "../../components/ReceiverDonationCard";

import {
    getAvailableDonations
} from "../../services/donationService";


function AvailableDonations() {


    const [donations, setDonations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);



    const fetchDonations = async () => {

        try {

            setRefreshing(true);


            const response = await getAvailableDonations();

            setDonations(response.donations);


        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to fetch donations."

            );

        }

        finally {

            setLoading(false);

            setRefreshing(false);

        }

    };



    useEffect(() => {

        fetchDonations();

    }, []);




    if (loading) {

        return (

            <div className="text-center py-16">

                Loading nearby donations...

            </div>

        );

    }



    return (

        <div>


            <div className="mb-8 flex justify-between items-start">


                <div>

                    <h2 className="text-3xl font-bold text-stone-800">

                        Nearby Donations

                    </h2>


                    <p className="text-stone-500 mt-2">

                        Discover food available around you.

                    </p>

                </div>



                <button

                    onClick={fetchDonations}

                    disabled={refreshing}

                    className="
                    bg-green-600
                    text-white
                    px-5
                    py-2.5
                    rounded-xl
                    font-medium
                    hover:bg-green-700
                    disabled:opacity-50
                    transition
                    flex
                    items-center
                    gap-2
                    "

                >

                    

                    {

                        refreshing

                        ? "Refreshing..."

                        : "Refresh"

                    }


                </button>


            </div>




            {

                donations.length === 0 ? (


                    <div className="bg-white rounded-2xl shadow p-10 text-center">


                        <h2 className="text-2xl font-bold text-stone-700">

                            No Nearby Donations

                        </h2>


                        <p className="text-stone-500 mt-3">

                            Check back later for new food donations.

                        </p>


                    </div>


                ) : (


                    <div className="grid lg:grid-cols-2 gap-6">


                        {

                            donations.map((donation) => (


                                <ReceiverDonationCard

                                    key={donation.id}

                                    donation={donation}

                                    refresh={fetchDonations}

                                />


                            ))

                        }


                    </div>


                )

            }



        </div>

    );

}


export default AvailableDonations;