import { useEffect, useState } from "react";

import ProfileAvatar from "../../components/profile/ProfileAvatar";
import PersonalInfoForm from "../../components/profile/PersonalInfoForm";
import AccountInfoCard from "../../components/profile/AccountInfoCard";

import {

    getUserProfile,

    updateUserProfile

} from "../../services/userService";

function DonorProfile() {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {

        try {

            const response = await getUserProfile();

            setUser(response.user);

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to load profile."

            );

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchProfile();

    }, []);

    const handleSave = async (updatedData) => {

        try {

            const response = await updateUserProfile(updatedData);

            setUser(response.user);

            localStorage.setItem(

                "user",

                JSON.stringify(response.user)

            );

            alert(response.message);

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to update profile."

            );

        }

    };

    if (loading) {

        return (

            <div className="text-center py-20 text-lg">

                Loading profile...

            </div>

        );

    }

    return (

        <div>

            <div className="mb-8">

                <h2 className="text-3xl font-bold text-stone-800">

                    My Profile

                </h2>

                <p className="text-stone-500 mt-2">

                    View and update your account information.

                </p>

            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                <div className="space-y-8">

                    <ProfileAvatar

                        fullName={user.full_name}

                        role={user.role}

                    />

                    <AccountInfoCard

                        user={user}

                    />

                </div>

                <div className="lg:col-span-2">

                    <PersonalInfoForm

                        user={user}

                        onSave={handleSave}

                    />

                </div>

            </div>

        </div>

    );

}

export default DonorProfile;