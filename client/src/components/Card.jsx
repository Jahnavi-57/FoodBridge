function Card({ children }) {

    return (

        <div
            className="
                bg-white
                rounded-3xl
                shadow-xl
                p-10
                w-full
                max-w-lg
            "
        >

            {children}

        </div>

    );

}

export default Card;