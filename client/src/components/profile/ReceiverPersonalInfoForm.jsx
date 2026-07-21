import { useEffect, useState } from "react";

import {

    MapPin,
    Save

} from "lucide-react";

function ReceiverPersonalInfoForm({

    user,

    onSave

}) {

    const [formData, setFormData] = useState({

        full_name: "",

        email: "",

        phone: "",

        org_name: "",

        address: "",

        latitude: "",

        longitude: ""

    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (user) {

            setFormData({

                full_name: user.full_name || "",

                email: user.email || "",

                phone: user.phone || "",

                org_name: user.org_name || "",

                address: user.address || "",

                latitude: user.latitude || "",

                longitude: user.longitude || ""

            });

        }

    }, [user]);

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value

        });

    };

    const captureLocation = () => {

        if (!navigator.geolocation) {

            alert("Geolocation is not supported.");

            return;

        }

        navigator.geolocation.getCurrentPosition(

            (position) => {

                setFormData((previous) => ({

                    ...previous,

                    latitude: position.coords.latitude,

                    longitude: position.coords.longitude

                }));

            },

            () => {

                alert("Unable to fetch your location.");

            }

        );

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setLoading(true);

        try {

            await onSave(formData);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-8">

            <h2 className="text-2xl font-bold text-stone-800 mb-8">

                Personal Information

            </h2>

            <form

                onSubmit={handleSubmit}

                className="space-y-6"

            >

                <div>

                    <label className="block mb-2 font-medium text-stone-700">

                        Full Name

                    </label>

                    <input

                        type="text"

                        name="full_name"

                        value={formData.full_name}

                        onChange={handleChange}

                        className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"

                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium text-stone-700">

                        Email

                    </label>

                    <input

                        type="email"

                        value={formData.email}

                        readOnly

                        className="w-full rounded-xl bg-stone-100 border border-stone-300 px-4 py-3 cursor-not-allowed"

                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium text-stone-700">

                        Phone

                    </label>

                    <input

                        type="text"

                        name="phone"

                        value={formData.phone}

                        onChange={handleChange}

                        className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"

                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium text-stone-700">

                        Organization

                    </label>

                    <input

                        type="text"

                        name="org_name"

                        value={formData.org_name}

                        onChange={handleChange}

                        className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"

                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium text-stone-700">

                        Address

                    </label>

                    <textarea

                        rows="4"

                        name="address"

                        value={formData.address}

                        onChange={handleChange}

                        className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"

                    />

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                    <div>

                        <label className="block mb-2 font-medium text-stone-700">

                            Latitude

                        </label>

                        <input

                            type="text"

                            name="latitude"

                            value={formData.latitude}

                            onChange={handleChange}

                            className="w-full rounded-xl border border-stone-300 px-4 py-3"

                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium text-stone-700">

                            Longitude

                        </label>

                        <input

                            type="text"

                            name="longitude"

                            value={formData.longitude}

                            onChange={handleChange}

                            className="w-full rounded-xl border border-stone-300 px-4 py-3"

                        />

                    </div>

                </div>

                <button

                    type="button"

                    onClick={captureLocation}

                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl transition"

                >

                    <MapPin size={18} />

                    Capture Current Location

                </button>

                <button

                    type="submit"

                    disabled={loading}

                    className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition disabled:opacity-60"

                >

                    <Save size={20} />

                    {

                        loading

                            ? "Saving..."

                            : "Save Changes"

                    }

                </button>

            </form>

        </div>

    );

}

export default ReceiverPersonalInfoForm;