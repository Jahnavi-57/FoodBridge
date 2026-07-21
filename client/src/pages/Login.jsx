import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Card from "../components/Card";
import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";
import JourneyAnimation from "../components/JourneyAnimation";

import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        email: "",

        password: ""

    });

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value

        });

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            const response = await loginUser({

                email: formData.email,

                password: formData.password

            });

            localStorage.setItem(

                "token",

                response.token

            );

            localStorage.setItem(

                "user",

                JSON.stringify(response.user)

            );

            alert(response.message);

            if (response.user.role === "DONOR") {

                navigate("/donor", {

                    replace: true

                });

            }

            else if (response.user.role === "RECEIVER") {

                navigate("/receiver", {

                    replace: true

                });

            }

            else {

                navigate("/", {

                    replace: true

                });

            }

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Login failed."

            );

        }

    };

    return (

        <div className="min-h-screen flex bg-[#FDF8F0]">

            {/* Left Section */}

            <div className="hidden lg:flex w-1/2 flex-col justify-start items-center px-16 pt-16">

                <Logo />

                <div className="mt-10 text-center max-w-md">

                    <h2 className="text-4xl font-bold text-stone-800">

                        Share More. Waste Less.

                    </h2>

                </div>

                <JourneyAnimation />

            </div>

            {/* Right Section */}

            <div className="w-full lg:w-1/2 flex justify-center items-center p-6">

                <Card className="w-full max-w-md">

                    <div className="lg:hidden flex justify-center mb-6">

                        <Logo />

                    </div>

                    <h2 className="text-3xl font-bold text-stone-800 text-center">

                        Welcome Back 👋

                    </h2>

                    <p className="text-center text-stone-500 mt-2 mb-8">

                        Login to continue your journey.

                    </p>

                    <form

                        onSubmit={handleSubmit}

                        className="space-y-5"

                    >

                        <Input

                            label="Email"

                            type="email"

                            name="email"

                            value={formData.email}

                            onChange={handleChange}

                            placeholder="Enter your email"

                            required

                        />

                        <Input

                            label="Password"

                            type="password"

                            name="password"

                            value={formData.password}

                            onChange={handleChange}

                            placeholder="Enter your password"

                            required

                        />

                        <Button type="submit">

                            Login

                        </Button>

                    </form>

                    <p className="text-center mt-6 text-stone-600">

                        Don't have an account?{" "}

                        <Link

                            to="/signup"

                            className="text-amber-600 font-semibold hover:underline"

                        >

                            Sign Up

                        </Link>

                    </p>

                </Card>

            </div>

        </div>

    );

}

export default Login;