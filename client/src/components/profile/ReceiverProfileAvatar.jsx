function ReceiverProfileAvatar({

    fullName,

    role

}) {

    const getInitials = (name) => {

        if (!name) {

            return "?";

        }

        return name
            .trim()
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

    };

    return (

        <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-8 flex flex-col items-center">

            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">

                {getInitials(fullName)}

            </div>

            <h2 className="mt-5 text-2xl font-bold text-stone-800">

                {fullName}

            </h2>

            <span className="mt-2 px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold tracking-wide">

                {role}

            </span>

        </div>

    );

}

export default ReceiverProfileAvatar;