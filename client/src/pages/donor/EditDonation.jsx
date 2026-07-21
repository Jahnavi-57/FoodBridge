import { useState } from "react";

import {
    updateDonation
} from "../../services/donationService";


function EditDonation({

    donation,

    onClose,

    onUpdated

}) {


    const [formData, setFormData] = useState({

        food_name: donation.food_name,

        description: donation.description || "",

        food_type: donation.food_type,

        quantity: donation.quantity,

        unit: donation.unit,

        prepared_at:
            donation.prepared_at.slice(0,16),

        expiry_time:
            donation.expiry_time.slice(0,16),

        pickup_address:
            donation.pickup_address,

        latitude:
            donation.latitude,

        longitude:
            donation.longitude,

        notification_radius_km:
            donation.notification_radius_km

    });



    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]:
                event.target.value

        });

    };



    const handleSubmit = async (event) => {

        event.preventDefault();



        if (

            new Date(formData.expiry_time)

            <=

            new Date(formData.prepared_at)

        ) {

            alert(
                "Expiry time must be after prepared time."
            );

            return;

        }



        try {


            const response = await updateDonation(

                donation.id,

                formData

            );



            alert(response.message);



            onUpdated();



            onClose();



        }

        catch(error) {


            console.error(error);



            alert(

                error.response?.data?.message ||

                "Unable to update donation."

            );


        }


    };




    return (


        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


            <div className="bg-white rounded-2xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto">


                <h2 className="text-2xl font-bold text-stone-800 mb-6">

                    Edit Donation

                </h2>



                <form

                    onSubmit={handleSubmit}

                    className="space-y-4"

                >



                    <input

                        name="food_name"

                        value={formData.food_name}

                        onChange={handleChange}

                        placeholder="Food Name"

                        className="w-full border rounded-xl p-3"

                    />



                    <textarea

                        name="description"

                        value={formData.description}

                        onChange={handleChange}

                        placeholder="Description"

                        className="w-full border rounded-xl p-3"

                    />




                    <select

                        name="food_type"

                        value={formData.food_type}

                        onChange={handleChange}

                        className="w-full border rounded-xl p-3"

                    >

                        <option value="VEG">

                            VEG

                        </option>


                        <option value="NON_VEG">

                            NON VEG

                        </option>


                        <option value="VEGAN">

                            VEGAN

                        </option>

                        <option value="JAIN">

                            JAIN

                        </option>

                        <option value="DAIRY PRODUCTS">

                            Dairy Products

                        </option>


                    </select>





                    <input

                        type="number"

                        name="quantity"

                        value={formData.quantity}

                        onChange={handleChange}

                        placeholder="Quantity"

                        className="w-full border rounded-xl p-3"

                    />





                    <select

                        name="unit"

                        value={formData.unit}

                        onChange={handleChange}

                        className="w-full border rounded-xl p-3"

                    >

                        <option value="PLATES">

                            Plates

                        </option>


                        <option value="KG">

                            Kg

                        </option>


                        <option value="PACKETS">

                            Packets

                        </option>

                        <option value="LITRES">

                            Litres

                        </option>


                    </select>






                    <div>

                        <label className="text-sm text-stone-600">

                            Prepared At

                        </label>


                        <input

                            type="datetime-local"

                            name="prepared_at"

                            value={formData.prepared_at}

                            onChange={handleChange}

                            className="w-full border rounded-xl p-3"

                        />

                    </div>





                    <div>

                        <label className="text-sm text-stone-600">

                            Expiry Time

                        </label>


                        <input

                            type="datetime-local"

                            name="expiry_time"

                            value={formData.expiry_time}

                            onChange={handleChange}

                            className="w-full border rounded-xl p-3"

                        />

                    </div>





                    <input

                        name="pickup_address"

                        value={formData.pickup_address}

                        onChange={handleChange}

                        placeholder="Pickup Address"

                        className="w-full border rounded-xl p-3"

                    />





                    <input

                        type="number"

                        name="notification_radius_km"

                        value={formData.notification_radius_km}

                        onChange={handleChange}

                        placeholder="Notification Radius"

                        className="w-full border rounded-xl p-3"

                    />





                    <button

                        type="submit"

                        className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold"

                    >

                        Save Changes

                    </button>



                </form>





                <button

                    onClick={onClose}

                    className="mt-4 w-full border py-3 rounded-xl rounded-xl"

                >

                    Cancel

                </button>



            </div>


        </div>


    );

}


export default EditDonation;