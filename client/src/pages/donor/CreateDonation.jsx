import { useState } from "react";
import { MapPin, Loader2, LocateFixed } from "lucide-react";
import { createDonation } from "../../services/donationService";

function CreateDonation() {

    const [loading, setLoading] = useState(false);

    const [locationLoading, setLocationLoading] = useState(false);

    const [locationCaptured, setLocationCaptured] = useState(false);

    const [formData, setFormData] = useState({

        food_name: "",

        description: "",

        food_type: "VEG",

        quantity: "",

        unit: "PLATES",

        prepared_at: "",

        expiry_time: "",

        pickup_address: "",

        latitude: "",

        longitude: "",

        notification_radius_km: 5

    });

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value

        });

    };

    const getCurrentLocation = () => {

        if (!navigator.geolocation) {

            alert("Geolocation is not supported by your browser.");

            return;

        }

        setLocationLoading(true);

        navigator.geolocation.getCurrentPosition(

            (position) => {

                setFormData((previous) => ({

                    ...previous,

                    latitude: position.coords.latitude,

                    longitude: position.coords.longitude

                }));

                setLocationCaptured(true);

                setLocationLoading(false);

            },

            () => {

                alert("Unable to fetch your location.");

                setLocationLoading(false);

            }

        );

    };

    const handleSubmit = async (event) => {
    event.preventDefault();

    if (!locationCaptured) {
        alert("Please capture your current location.");
        return;
    }

    if (new Date(formData.expiry_time) <= new Date(formData.prepared_at)) {
        alert("Expiry time must be after prepared time.");
        return;
    }

    try {
        setLoading(true);

        const payload = {
            ...formData,
            prepared_at: new Date(formData.prepared_at).toISOString(),
            expiry_time: new Date(formData.expiry_time).toISOString(),
        };

        const response = await createDonation(payload);

        alert(response.message);

        setFormData({
            food_name: "",
            description: "",
            food_type: "VEG",
            quantity: "",
            unit: "PLATES",
            prepared_at: "",
            expiry_time: "",
            pickup_address: "",
            latitude: "",
            longitude: "",
            notification_radius_km: 5
        });

        setLocationCaptured(false);
    }
    catch (error) {
        console.log(error.response?.data);

        if (error.response?.data?.errors) {
            const messages = error.response.data.errors
                .map(error => `• ${error.msg}`)
                .join("\n");

            alert(messages);
        }
        else {
            alert(
                error.response?.data?.message ||
                "Unable to create donation."
            );
        }
    }
    finally {
        setLoading(false);
    }
};

    return (

        <div className="max-w-5xl mx-auto">

            <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8">

                <h1 className="text-3xl font-bold text-stone-800">

                    🍱 Create New Donation

                </h1>

                <p className="mt-2 text-stone-500">

                    Fill in the details below to share surplus food with nearby NGOs.

                </p>

                <form
                    className="mt-10 space-y-8"
                    onSubmit={handleSubmit}
                >

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <label className="font-medium text-stone-700">

                                Food Name

                            </label>

                            <input

                                type="text"

                                name="food_name"

                                value={formData.food_name}

                                onChange={handleChange}

                                placeholder="Vegetable Biryani"

                                className="w-full mt-2 rounded-xl border border-amber-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"

                                required

                            />

                        </div>

                        <div>

                            <label className="font-medium text-stone-700">

                                Food Type

                            </label>

                            <select

                                name="food_type"

                                value={formData.food_type}

                                onChange={handleChange}

                                className="w-full mt-2 rounded-xl border border-amber-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"

                            >

                                <option value="VEG">

                                    Vegetarian

                                </option>

                                <option value="NON_VEG">

                                    Non-Vegetarian

                                </option>

                                <option value="VEGAN">

                                    Vegan

                                </option>

                                <option value="JAIN">

                                    Jain

                                </option>

                                <option value="DAIRY PRODUCTS">

                                    Dairy Products

                                </option>

                            </select>

                        </div>

                    </div>

                    <div>

                        <label className="font-medium text-stone-700">

                            Description

                        </label>

                        <textarea

                            rows="4"

                            name="description"

                            value={formData.description}

                            onChange={handleChange}

                            placeholder="Describe the food..."

                            className="w-full mt-2 rounded-xl border border-amber-200 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"

                        />

                    </div>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <label className="font-medium text-stone-700">

                                Quantity

                            </label>

                            <input

                                type="number"

                                min="1"

                                name="quantity"

                                value={formData.quantity}

                                onChange={handleChange}

                                className="w-full mt-2 rounded-xl border border-amber-200 px-4 py-3"

                                required

                            />

                        </div>

                        <div>

                            <label className="font-medium text-stone-700">

                                Unit

                            </label>

                            <select

                                name="unit"

                                value={formData.unit}

                                onChange={handleChange}

                                className="w-full mt-2 rounded-xl border border-amber-200 px-4 py-3"

                            >

                                <option value="PLATES">Plates</option>

                                <option value="KG">Kilograms</option>

                                <option value="PACKETS">Packets</option>

                                <option value="LITRES">Litres</option>

                            </select>

                        </div>

                    </div>
                                        <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <label className="font-medium text-stone-700">

                                Prepared Time

                            </label>

                            <input

                                type="datetime-local"

                                name="prepared_at"

                                value={formData.prepared_at}

                                onChange={handleChange}

                                className="w-full mt-2 rounded-xl border border-amber-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"

                                required

                            />

                        </div>

                        <div>

                            <label className="font-medium text-stone-700">

                                Expiry Time

                            </label>

                            <input

                                type="datetime-local"

                                name="expiry_time"

                                value={formData.expiry_time}

                                onChange={handleChange}

                                className="w-full mt-2 rounded-xl border border-amber-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"

                                required

                            />

                        </div>

                    </div>

                    <div>

                        <label className="font-medium text-stone-700">

                            Pickup Address

                        </label>

                        <textarea

                            rows="3"

                            name="pickup_address"

                            value={formData.pickup_address}

                            onChange={handleChange}

                            placeholder="Enter the pickup location"

                            className="w-full mt-2 rounded-xl border border-amber-200 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"

                            required

                        />

                    </div>

                    <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">

                        <div className="flex items-center justify-between flex-wrap gap-4">

                            <div>

                                <h3 className="font-semibold text-stone-800">

                                    Pickup Location

                                </h3>

                                <p className="text-sm text-stone-500 mt-1">

                                    We'll automatically notify nearby receivers based on your current location.

                                </p>

                            </div>

                            <button

                                type="button"

                                onClick={getCurrentLocation}

                                disabled={locationLoading}

                                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl transition"

                            >

                                {

                                    locationLoading

                                        ? <Loader2 className="animate-spin" size={18} />

                                        : <LocateFixed size={18} />

                                }

                                {

                                    locationLoading

                                        ? "Fetching..."

                                        : "Use My Current Location"

                                }

                            </button>

                        </div>

                        {

                            locationCaptured && (

                                <div className="mt-5 flex items-center gap-2 text-green-700 font-medium">

                                    <MapPin size={18} />

                                    Location captured successfully

                                </div>

                            )

                        }

                    </div>

                    <div>

                        <label className="font-medium text-stone-700">

                            Notification Radius

                        </label>

                        <select

                            name="notification_radius_km"

                            value={formData.notification_radius_km}

                            onChange={handleChange}

                            className="w-full mt-2 rounded-xl border border-amber-200 px-4 py-3"

                        >

                            <option value={2}>2 km</option>

                            <option value={5}>5 km</option>

                            <option value={10}>10 km</option>

                            <option value={20}>20 km</option>

                        </select>

                    </div>

                    <div className="pt-4">

                        <button

                            type="submit"

                            disabled={loading}

                            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl text-lg font-semibold transition disabled:opacity-60 flex justify-center items-center gap-3"

                        >

                            {

                                loading && (

                                    <Loader2

                                        size={20}

                                        className="animate-spin"

                                    />

                                )

                            }

                            {

                                loading

                                    ? "Posting Donation..."

                                    : "Post Donation"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default CreateDonation;