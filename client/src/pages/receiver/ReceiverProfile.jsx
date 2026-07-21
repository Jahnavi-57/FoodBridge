import { useEffect, useState } from "react";

import ReceiverProfileAvatar from "../../components/profile/ReceiverProfileAvatar";
import ReceiverStatisticsCards from "../../components/profile/ReceiverStatisticsCards";
import ReceiverPersonalInfoForm from "../../components/profile/ReceiverPersonalInfoForm";
import ReceiverAccountInfoCard from "../../components/profile/ReceiverAccountInfoCard";

import {

    getReceiverProfile,
    updateReceiverProfile,
    getReceiverStatistics

} from "../../services/receiverService";



function ReceiverProfile() {

    const [user, setUser] = useState(null);

    const [statistics, setStatistics] = useState({

        requested: 0,

        accepted: 0,

        collected: 0,

        rejected: 0

    });

    const fetchProfile = async () => {

        try {

            const response = await getReceiverProfile();

            setUser(response.user);

        }

        catch {

            alert("Unable to load profile.");

        }

    };

    const fetchStatistics = async () => {

        try {

            const response = await getReceiverStatistics();

            setStatistics(response.statistics);

        }

        catch {

            console.log("Unable to load statistics.");

        }

    };

    useEffect(() => {

        fetchProfile();

        fetchStatistics();

    }, []);

    const handleSave = async (formData) => {

        try {

            await updateReceiverProfile(formData);

            alert("Profile updated successfully.");

            fetchProfile();

        }

        catch {

            alert("Unable to update profile.");

        }

    };

    if (!user) {

        return (

            <div className="text-center py-20">

                Loading...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold text-stone-800">

                    My Profile

                </h1>

                <p className="text-stone-500 mt-2">

                    Manage your account information and location.

                </p>

            </div>

            <ReceiverStatisticsCards

                statistics={statistics}

            />

            <div className="grid lg:grid-cols-3 gap-8">

                <div className="space-y-8">

                    <ReceiverProfileAvatar

                        fullName={user.full_name}

                        role={user.role}

                    />

                    <ReceiverAccountInfoCard

                        user={user}

                    />

                </div>

                <div className="lg:col-span-2">

                    <ReceiverPersonalInfoForm

                        user={user}

                        onSave={handleSave}

                    />

                </div>

            </div>

        </div>

    );

}

export default ReceiverProfile;