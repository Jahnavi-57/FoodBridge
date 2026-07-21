import { useEffect, useState , useMemo} from "react";

import DonationCard from "../../components/DonationCard";
import EditDonation from "./EditDonation";

import {
    getMyDonations,
    cancelDonation
} from "../../services/donationService";


function MyDonations() {


    const [donations, setDonations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedDonation, setSelectedDonation] = useState(null);

    const [sortBy, setSortBy] = useState("newest");


    const fetchDonations = async () => {

        try {

            const response = await getMyDonations();

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

        }

    };



    useEffect(() => {

        fetchDonations();

    }, []);




    const handleCancel = async (id) => {


        const confirmCancel = window.confirm(

            "Are you sure you want to cancel this donation?"

        );


        if (!confirmCancel) {

            return;

        }



        try {


            const response = await cancelDonation(id);


            alert(response.message);


            fetchDonations();


        }

        catch (error) {


            alert(

                error.response?.data?.message ||

                "Unable to cancel donation."

            );


        }


    };




    const handleEdit = (donation) => {


        setSelectedDonation(donation);


    };

    const sortedDonations = useMemo(() => {

        const sorted = [...donations];

        switch (sortBy) {

            case "oldest":

                sorted.sort(

                    (a, b) =>

                        new Date(a.created_at) -

                        new Date(b.created_at)

                );

                break;

            case "az":

                sorted.sort(

                    (a, b) =>

                        a.food_name.localeCompare(b.food_name)

                );

                break;

            case "za":

                sorted.sort(

                    (a, b) =>

                        b.food_name.localeCompare(a.food_name)

                );

                break;

            default:

                sorted.sort(

                    (a, b) =>

                        new Date(b.created_at) -

                        new Date(a.created_at)

                );

        }

        return sorted;

    }, [donations, sortBy]);



    if (loading) {


        return (

            <div className="text-center py-20">

                Loading donations...

            </div>

        );

    }




    if (donations.length === 0) {


        return (

            <div className="bg-white rounded-2xl shadow p-10 text-center">


                <h2 className="text-2xl font-bold text-stone-700">

                    No Donations Yet

                </h2>


                <p className="text-stone-500 mt-3">

                    Create your first donation to help someone today.

                </p>


            </div>

        );

    }




    return (


        <div>


            <div className="mb-8 flex justify-between items-center">

                <div>
                    <h2 className="text-3xl font-bold text-stone-800">

                    My Donations

                </h2>

                <p className="text-stone-500 mt-2">

                    Track and manage all your food donations.

                </p>
                </div>
                

                <div>

                    <label className="text-sm text-stone-600 mr-2">

                        Sort By

                    </label>

                    <select

                        value={sortBy}

                        onChange={(e) => setSortBy(e.target.value)}

                        className="border border-stone-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"

                    >

                        <option value="newest">

                            Newest First

                        </option>

                        <option value="oldest">

                            Oldest First

                        </option>

                        <option value="az">

                            Food Name (A-Z)

                        </option>

                        <option value="za">

                            Food Name (Z-A)

                        </option>

                    </select>

                </div>

            </div>




            <div className="grid lg:grid-cols-2 gap-6">


                {

                    sortedDonations.map((donation) => (


                        <DonationCard

                            key={donation.id}

                            donation={donation}

                            onEdit={handleEdit}

                            onCancel={handleCancel}

                        />


                    ))

                }


            </div>





            {

                selectedDonation && (


                    <EditDonation


                        donation={selectedDonation}


                        onClose={() =>

                            setSelectedDonation(null)

                        }


                        onUpdated={() => {


                            fetchDonations();


                        }}


                    />


                )

            }



        </div>


    );

}


export default MyDonations;