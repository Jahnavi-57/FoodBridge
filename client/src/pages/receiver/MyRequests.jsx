import {

    useEffect,
    useState

} from "react";

import {

    PackageSearch

} from "lucide-react";

import {

    getMyRequests,
    markCollected

} from "../../services/requestService";

function MyRequests() {

    const [

        requests,
        setRequests

    ] = useState([]);

    const fetchRequests = async () => {

        try {

            const response = await getMyRequests();

            setRequests(

                response.requests

            );

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to fetch requests."

            );

        }

    };

    useEffect(() => {

        fetchRequests();

    }, []);

    const handleCollected = async (id) => {

        try {

            const response = await markCollected(id);

            alert(response.message);

            fetchRequests();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to update."

            );

        }

    };

    return (

        <div>

            <h2 className="text-3xl font-bold text-stone-800 mb-8">

                My Requests

            </h2>

            <div className="space-y-5">

                {

                    requests.length === 0 && (

                        <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-12 text-center">

                            <PackageSearch

                                size={50}

                                className="mx-auto text-stone-300"

                            />

                            <h3 className="mt-4 text-xl font-semibold text-stone-700">

                                No Requests Yet

                            </h3>

                            <p className="text-stone-500 mt-2">

                                You haven't requested any donations yet.

                                <br />

                                Browse nearby donations to get started.

                            </p>

                        </div>

                    )

                }

                {

                    requests.map(request => (

                        <div

                            key={request.id}

                            className="bg-white rounded-2xl shadow border border-stone-200 p-6"

                        >

                            <div className="flex justify-between items-start">

                                <div>

                                    <h3 className="text-xl font-bold text-stone-800">

                                        {request.food_name}

                                    </h3>

                                    <p className="text-stone-500 mt-2">

                                        {request.pickup_address}

                                    </p>

                                </div>

                                <span

                                    className={`

                                        px-3

                                        py-1

                                        rounded-full

                                        text-sm

                                        font-semibold

                                        ${

                                            request.status === "PENDING"

                                                ? "bg-yellow-100 text-yellow-700"

                                            : request.status === "ACCEPTED"

                                                ? "bg-green-100 text-green-700"

                                            : request.status === "REJECTED"

                                                ? "bg-red-100 text-red-700"

                                            : "bg-blue-100 text-blue-700"

                                        }

                                    `}

                                >

                                    {request.status}

                                </span>

                            </div>

                            {

                                request.status === "ACCEPTED" && (

                                    <button

                                        onClick={() =>

                                            handleCollected(

                                                request.id

                                            )

                                        }

                                        className="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition"

                                    >

                                        Mark as Collected

                                    </button>

                                )

                            }

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default MyRequests;