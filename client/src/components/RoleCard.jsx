import { CheckCircle2 } from "lucide-react";

function RoleCard({

    icon,

    title,

    description,

    selected,

    onClick

}) {

    return (

        <button
            type="button"
            onClick={onClick}
            className={`
                relative
                border-2
                rounded-2xl
                p-4
                transition-all
                duration-300
                text-left

                ${
                    selected
                        ? "border-amber-500 bg-amber-100 shadow-md"
                        : "border-stone-200 bg-white hover:border-amber-300"
                }
            `}
        >

            {selected && (

                <CheckCircle2
                    size={20}
                    className="absolute top-3 right-3 text-amber-600"
                />

            )}

            <div className="text-3xl">

                {icon}

            </div>

            <h3 className="mt-3 font-semibold text-stone-800">

                {title}

            </h3>

            <p className="text-sm text-stone-500 mt-1">

                {description}

            </p>

        </button>

    );

}

export default RoleCard;