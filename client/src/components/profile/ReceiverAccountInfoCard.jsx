import {

    ShieldCheck,
    Bell,
    Calendar,
    UserRound

} from "lucide-react";

function ReceiverAccountInfoCard({

    user

}) {

    return (

        <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-8">

            <h3 className="text-xl font-bold text-stone-800 mb-6">

                Account Information

            </h3>

            <div className="space-y-6">

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">

                        <UserRound

                            size={20}

                            className="text-blue-600"

                        />

                        <span className="text-stone-600">

                            Role

                        </span>

                    </div>

                    <span className="font-semibold text-stone-800">

                        {user.role}

                    </span>

                </div>

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">

                        <ShieldCheck

                            size={20}

                            className="text-green-600"

                        />

                        <span className="text-stone-600">

                            Verification

                        </span>

                    </div>

                    {

                        user.is_verified ? (

                            <span className="font-semibold text-green-600">

                                Verified

                            </span>

                        ) : (

                            <span className="font-semibold text-red-500">

                                Not Verified

                            </span>

                        )

                    }

                </div>

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">

                        <Bell

                            size={20}

                            className="text-cyan-600"

                        />

                        <span className="text-stone-600">

                            Notifications

                        </span>

                    </div>

                    {

                        user.notification_enabled ? (

                            <span className="font-semibold text-green-600">

                                Enabled

                            </span>

                        ) : (

                            <span className="font-semibold text-red-500">

                                Disabled

                            </span>

                        )

                    }

                </div>

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">

                        <Calendar

                            size={20}

                            className="text-purple-600"

                        />

                        <span className="text-stone-600">

                            Member Since

                        </span>

                    </div>

                    <span className="font-semibold text-stone-800">

                        {

                            new Date(

                                user.created_at

                            ).toLocaleDateString(

                                undefined,

                                {

                                    day: "numeric",

                                    month: "short",

                                    year: "numeric"

                                }

                            )

                        }

                    </span>

                </div>

            </div>

        </div>

    );

}

export default ReceiverAccountInfoCard;