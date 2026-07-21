import { Hand } from "lucide-react";
function Header() {

    const user = JSON.parse(

        localStorage.getItem("user")

    );

    return (

        <div className="bg-white rounded-2xl shadow-sm p-6">

            <h2 className="text-3xl font-bold text-stone-800 flex items-center gap-2">
                Welcome, {user?.full_name}
                <Hand className="wave w-7 h-7 text-amber-500" />
            </h2>

            <p className="text-stone-500 mt-2">

                Thank you for helping reduce food waste.

            </p>

        </div>

    );

}

export default Header;