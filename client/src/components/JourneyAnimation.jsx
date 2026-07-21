import { useEffect, useState } from "react";
import {
    Package,
    Truck,
    Building2,
    HeartHandshake,
    Sparkles
} from "lucide-react";

const journeySteps = [
    {
        icon: Package,
        title: "Donation Posted",
        description: "A donor shares surplus food."
    },
    {
        icon: Truck,
        title: "Collector Assigned",
        description: "A nearby verified receiver is notified."
    },
    {
        icon: Building2,
        title: "NGO Receives",
        description: "The food safely reaches the organization."
    },
    {
        icon: HeartHandshake,
        title: "Meal Delivered",
        description: "The donation reaches people who need it."
    }
];

function JourneyAnimation() {

    const [step, setStep] = useState(0);
    const [showThankYou, setShowThankYou] = useState(false);

    useEffect(() => {

        if (showThankYou) {

            const timeout = setTimeout(() => {

                setShowThankYou(false);
                setStep(0);

            }, 2500);

            return () => clearTimeout(timeout);

        }

        const interval = setInterval(() => {

            setStep(previous => {

                if (previous === journeySteps.length - 1) {

                    clearInterval(interval);

                    setTimeout(() => {

                        setShowThankYou(true);

                    }, 800);

                    return previous;

                }

                return previous + 1;

            });

        }, 1800);

        return () => clearInterval(interval);

    }, [showThankYou]);

    if (showThankYou) {

        return (

            <div
                className="
                    mt-12
                    bg-white
                    rounded-3xl
                    shadow-xl
                    p-8
                    text-center
                    animate-[fadeIn_0.6s_ease-out]
                "
            >

                <div className="relative inline-flex">

                    <div
                        className="
                            bg-amber-100
                            rounded-full
                            p-6
                        "
                    >

                        <HeartHandshake
                            size={52}
                            className="text-amber-500"
                        />

                    </div>

                    <Sparkles
                        size={22}
                        className="
                            absolute
                            -right-2
                            -top-2
                            text-yellow-500
                        "
                    />

                </div>

                <h2
                    className="
                        text-3xl
                        font-bold
                        text-stone-800
                        mt-6
                    "
                >

                    One Donation

                </h2>

                <h3
                    className="
                        text-2xl
                        font-semibold
                        text-amber-500
                        mt-2
                    "
                >

                    Countless Smiles

                </h3>

                <p
                    className="
                        mt-5
                        text-stone-600
                        leading-7
                    "
                >

                    Every meal shared is a step toward a kinder
                    community. Thank you for making a difference.

                </p>

            </div>

        );

    }

    return (

        <div className="mt-10">

            {

                journeySteps.map((item, index) => {

                    const Icon = item.icon;

                    const completed = index <= step;
                    const current = index === step;

                    return (

                        <div key={index}>

                            <div className="flex items-start gap-5">

                                <div
                                    className={`
                                        relative
                                        h-14
                                        w-14
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center
                                        transition-all
                                        duration-500

                                        ${
                                            completed
                                                ? "bg-amber-400 text-white scale-105 shadow-lg"
                                                : "bg-white text-stone-400"
                                        }
                                    `}
                                >

                                    <Icon size={24} />

                                    {

                                        current && (

                                            <span
                                                className="
                                                    absolute
                                                    -right-1
                                                    -top-1
                                                    h-3
                                                    w-3
                                                    rounded-full
                                                    bg-amber-500
                                                    animate-ping
                                                "
                                            />

                                        )

                                    }

                                </div>

                                <div className="flex-1">

                                    <h3
                                        className={`
                                            font-semibold
                                            text-lg

                                            ${
                                                completed
                                                    ? "text-stone-800"
                                                    : "text-stone-500"
                                            }
                                        `}
                                    >

                                        {item.title}

                                    </h3>

                                    <p
                                        className="
                                            text-sm
                                            text-stone-500
                                            mt-1
                                        "
                                    >

                                        {item.description}

                                    </p>

                                </div>

                            </div>

                            {

                                index !== journeySteps.length - 1 &&

                                <div
                                    className="
                                        ml-7
                                        flex
                                        justify-center
                                    "
                                >

                                    <div
                                        className={`
                                            w-1
                                            h-10
                                            rounded-full
                                            transition-all
                                            duration-500

                                            ${
                                                completed
                                                    ? "bg-amber-400"
                                                    : "bg-stone-300"
                                            }
                                        `}
                                    />

                                </div>

                            }

                        </div>

                    );

                })

            }

        </div>

    );

}

export default JourneyAnimation;