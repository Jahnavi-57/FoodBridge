function Button({

    children,

    onClick,

    type = "button"

}) {

    return (

        <button

            type={type}

            onClick={onClick}

            className="
                w-full
                bg-amber-400
                hover:bg-amber-500
                text-white
                font-semibold
                py-3
                rounded-xl
                transition
                duration-300
            "

        >

            {children}

        </button>

    );

}

export default Button;