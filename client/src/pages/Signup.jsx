import { useState } from "react";

import Card from "../components/Card";
import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";
import JourneyAnimation from "../components/JourneyAnimation";
import RoleCard from "../components/RoleCard";

import { signupUser } from "../services/authService";
import {Link, useNavigate } from "react-router-dom";



function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({

        full_name: "",

        email: "",

        phone: "",

        password: "",

        confirmPassword: "",

        role: "DONOR",

        organization_name: "",

        address: ""

    });

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value

        });

    };

    const handleRoleSelect = (role) => {

        setFormData({

            ...formData,

            role

        });

    };

    const handleSubmit = async (event) => {

    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {

        alert("Passwords do not match.");

        return;

    }

    try {

        const payload = {

            full_name: formData.full_name,

            email: formData.email,

            password: formData.password,

            phone: formData.phone,

            role: formData.role,

            organization_name:
                formData.role === "RECEIVER"
                    ? formData.organization_name
                    : null,

            address: formData.address

        };

        const response = await signupUser(payload);

        alert(response.message);

        navigate("/login");

    }

    catch (error) {

    if (error.response?.data?.errors) {

        const messages = error.response.data.errors
            .map(error => error.msg)
            .join("\n");

        alert(messages);

        return;

    }

    alert(

        error.response?.data?.message ||

        "Something went wrong."

    );

}

};

    return (

        <div className="min-h-screen flex bg-[#FDF8F0]">

            <div className="hidden lg:flex w-1/2 flex-col justify-start items-center px-16 pt-16">

                <Logo />

                <div className="mt-10 text-center max-w-md">

                    <h2 className="text-4xl font-bold text-stone-800">

                        Join FoodBridge

                    </h2>

                    <p className="mt-3 text-stone-600 leading-7">

                        Become a part of a community that helps reduce food
                        waste and feeds people in need.

                    </p>

                </div>

                <JourneyAnimation />

            </div>

            <div className="w-full lg:w-1/2 flex justify-center items-center p-6">

                <Card className="w-full max-w-2xl">

                    <div className="lg:hidden flex justify-center mb-6">

                        <Logo />

                    </div>

                    <h2 className="text-3xl font-bold text-center text-stone-800">

                        Create Account

                    </h2>

                    <p className="text-center text-stone-500 mt-2 mb-8">

                        Start sharing food and making a difference.

                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="grid md:grid-cols-2 gap-4">

                            <Input

                                label="Full Name"

                                name="full_name"

                                value={formData.full_name}

                                onChange={handleChange}

                                placeholder="John Doe"

                                required

                            />

                            <Input

                                label="Phone Number"

                                name="phone"

                                value={formData.phone}

                                onChange={handleChange}

                                placeholder="9876543210"

                                required

                            />

                        </div>

                        <Input

                            label="Email"

                            type="email"

                            name="email"

                            value={formData.email}

                            onChange={handleChange}

                            placeholder="john@example.com"

                            required

                        />

                        <div className="grid md:grid-cols-2 gap-4">

                            <Input

                                label="Password"

                                type="password"

                                name="password"

                                value={formData.password}

                                onChange={handleChange}

                                placeholder="Password"

                                required

                            />

                            <Input

                                label="Confirm Password"

                                type="password"

                                name="confirmPassword"

                                value={formData.confirmPassword}

                                onChange={handleChange}

                                placeholder="Confirm Password"

                                required

                            />

                        </div>

                        <div className="mb-6">

                            <label className="block mb-3 font-medium text-stone-700">

                                Select Role

                            </label>

                            <div className="grid grid-cols-2 gap-4">

                                <RoleCard

                                    icon="🍱"

                                    title="Donor"

                                    description="Share surplus food"

                                    selected={formData.role === "DONOR"}

                                    onClick={() => handleRoleSelect("DONOR")}

                                />

                                <RoleCard

                                    icon="❤️"

                                    title="Receiver"

                                    description="Receive donations"

                                    selected={formData.role === "RECEIVER"}

                                    onClick={() => handleRoleSelect("RECEIVER")}

                                />

                            </div>

                        </div>


                        {

                            formData.role === "RECEIVER" &&

                            <Input

                                label="Organization Name"

                                name="organization_name"

                                value={formData.organization_name}

                                onChange={handleChange}

                                placeholder="NGO / Organization"

                                required

                            />

                        }

                        <div className="mb-6">

                            <label className="block mb-2 font-medium text-stone-700">

                                Address

                            </label>

                            <textarea

                                name="address"

                                rows="3"

                                value={formData.address}

                                onChange={handleChange}

                                placeholder="Enter your complete address"

                                className="w-full rounded-xl border border-amber-200 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"

                                required

                            />

                        </div>

                        <Button type="submit">

                            Create Account

                        </Button>

                    </form>

                    <p className="text-center mt-6 text-stone-600">

                        Already have an account?{" "}

                        <Link

                            to="/login"

                            className="text-amber-600 font-semibold hover:underline"

                        >

                            Login

                        </Link>

                    </p>

                </Card>

            </div>

        </div>

    );

}

export default Signup;