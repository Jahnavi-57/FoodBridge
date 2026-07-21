import { useEffect, useState } from "react";

import {

    Bell,

    CheckCheck

} from "lucide-react";

import {

    getNotifications,

    markNotificationAsRead,

    markAllNotificationsAsRead

} from "../../services/notificationService";


import {

    approveRequest,

    rejectRequest

} from "../../services/requestService";



function Notifications() {


    const [notifications, setNotifications] = useState([]);



    const fetchNotifications = async () => {

    try {

        const response = await getNotifications();

        const twelveHoursAgo = Date.now() - (12 * 60 * 60 * 1000);

        const recentNotifications = response.notifications.filter(
            (notification) =>
                new Date(notification.created_at).getTime() >= twelveHoursAgo
        );

        setNotifications(recentNotifications);

    }

    catch {

        alert("Unable to fetch notifications.");

    }

};



    useEffect(() => {

        fetchNotifications();

    }, []);




    const handleRead = async (id) => {

        await markNotificationAsRead(id);

        fetchNotifications();

    };




    const handleReadAll = async () => {

        await markAllNotificationsAsRead();

        fetchNotifications();

    };




    const handleApprove = async (requestId) => {

        try {

            const response = await approveRequest(requestId);

            alert(response.message);

            fetchNotifications();

        }

        catch(error) {

            alert(

                error.response?.data?.message ||

                "Unable to approve request."

            );

        }

    };




    const handleReject = async (requestId) => {

        try {

            const response = await rejectRequest(requestId);

            alert(response.message);

            fetchNotifications();

        }

        catch(error) {

            alert(

                error.response?.data?.message ||

                "Unable to reject request."

            );

        }

    };




    return (

        <div>


            <div className="flex justify-between items-center mb-8">


                <div>

                    <h2 className="text-3xl font-bold text-stone-800">

                        Notifications

                    </h2>


                    <p className="text-stone-500 mt-2">

                        Stay updated with your donations.

                    </p>

                </div>



                <button

                    onClick={handleReadAll}
                    disabled={notifications.length === 0}
                    className="
                    flex
                    items-center
                    gap-2
                    bg-amber-500
                    text-white
                    px-4
                    py-2
                    rounded-xl
                    hover:bg-amber-600
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    "

                >

                    <CheckCheck size={18}/>

                    Mark All Read

                </button>


            </div>




            <div className="space-y-4">

                {

                    notifications.length === 0 && (

                        <div className="bg-white rounded-2xl shadow p-12 text-center">

                            <Bell

                                size={50}

                                className="mx-auto text-stone-300"

                            />

                            <h3 className="mt-4 text-xl font-semibold text-stone-700">

                                No Notifications

                            </h3>

                            <p className="text-stone-500 mt-2">

                                You're all caught up!

                            </p>

                        </div>

                    )

                }
                {

                    notifications.map(notification => (


                        <div

                            key={notification.id}

                            onClick={() => handleRead(notification.id)}

                            className={`

                                rounded-2xl

                                p-5

                                shadow

                                transition

                                ${notification.is_read

                                    ? "bg-white"

                                    : "bg-amber-50 border border-amber-300"}

                            `}

                        >


                            <div className="flex items-start gap-4">


                                <Bell

                                    className={`

                                            mt-1

                                            ${
                                                notification.type === "REQUEST_RECEIVED"

                                                    ? "text-amber-500"

                                                : notification.type === "REQUEST_ACCEPTED"

                                                    ? "text-blue-600"

                                                : notification.type === "REQUEST_REJECTED"

                                                    ? "text-red-600"

                                                : notification.type === "DONATION_COLLECTED"

                                                    ? "text-green-600"

                                                : "text-stone-500"

                                            }

                                        `}

                                />



                                <div className="flex-1">

                                    <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-lg">
                                                {notification.title}
                                            </h3>

                                            <p className="text-xs text-stone-400 whitespace-nowrap ml-4">
                                                {new Date(notification.created_at).toLocaleString(undefined, {
                                                    dateStyle: "medium",
                                                    timeStyle: "short",
                                                })}
                                            </p>
                                        </div>
                                    

                                    <p className="text-stone-600 mt-1">

                                        {notification.message}

                                    </p>
                                    

                                    
                                        {notification.food_name && (

                                            <div className="mt-3 rounded-xl bg-stone-50 border border-stone-200 p-3">

                                                <p className="font-semibold text-stone-800">

                                                    🍱 {notification.food_name}

                                                </p>

                                                <p className="text-sm text-stone-600 mt-1">

                                                    Quantity:

                                                    {" "}

                                                    {notification.quantity}

                                                    {" "}

                                                    {notification.unit}

                                                </p>

                                                {

                                                    notification.description && (

                                                        <p className="text-sm text-stone-500 mt-1">

                                                            {notification.description}

                                                        </p>

                                                    )

                                                }


                                            </div>

                                        )}

                                        <div className="flex gap-2 flex-wrap mt-4">

                                                {

                                                    notification.request_status && (

                                                        <span className={`

                                                            px-3

                                                            py-1

                                                            rounded-full

                                                            text-xs

                                                            font-semibold

                                                            ${
                                                                notification.request_status === "PENDING"

                                                                    ? "bg-yellow-100 text-yellow-700"

                                                                : notification.request_status === "ACCEPTED"

                                                                    ? "bg-green-100 text-green-700"

                                                                : notification.request_status === "REJECTED"

                                                                    ? "bg-red-100 text-red-700"

                                                                : "bg-blue-100 text-blue-700"
                                                            }

                                                        `}>

                                                            Request:

                                                            {" "}

                                                            {notification.request_status}

                                                        </span>

                                                    )

                                                }

                                                {
                                                        notification.donation_status && (

                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                                    notification.donation_status === "COLLECTED"
                                                                        ? "bg-green-100 text-green-700"
                                                                        : "bg-stone-100 text-stone-700"
                                                                }`}
                                                            >

                                                                Donation:{" "}

                                                                {notification.donation_status}

                                                            </span>

                                                        )
                                                    }

                                            </div>


                                    {

                                        notification.type === "REQUEST_RECEIVED"
                                        &&
                                        notification.request_status === "PENDING"
                                        &&
                                        notification.donation_status === "AVAILABLE"

                                        &&

                                        (

                                            <div className="flex gap-4 mt-5">


                                                <button

                                                    onClick={(e) => {

                                                        e.stopPropagation();

                                                        handleApprove(

                                                            notification.request_id

                                                        );

                                                    }}

                                                    className="
                                                    bg-green-600
                                                    hover:bg-green-700
                                                    text-white
                                                    px-5
                                                    py-2
                                                    rounded-xl
                                                    font-semibold
                                                    "

                                                >

                                                    Accept

                                                </button>



                                                <button

                                                    onClick={(e) => {

                                                        e.stopPropagation();

                                                        handleReject(

                                                            notification.request_id

                                                        );

                                                    }}

                                                    className="
                                                    bg-red-500
                                                    hover:bg-red-600
                                                    text-white
                                                    px-5
                                                    py-2
                                                    rounded-xl
                                                    font-semibold
                                                    "

                                                >

                                                    Reject

                                                </button>


                                            </div>

                                        )

                                    }


                                </div>


                            </div>


                        </div>


                    ))

                }


            </div>


        </div>

    );

}


export default Notifications;