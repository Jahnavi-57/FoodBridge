import {

    LayoutDashboard,
    ClipboardList,
    Bell,
    User,
    LogOut

} from "lucide-react";
import { useNavigate } from "react-router-dom";
function ReceiverSidebar({

    activeTab,

    setActiveTab,

    onLogout

}) {
    const navigate = useNavigate();

const handleLogout = () => {

    const confirmLogout = window.confirm(

        "Are you sure you want to logout?"

    );

    if (!confirmLogout) {

        return;

    }

    localStorage.clear();

    navigate("/login");

};

    const menuItems = [

        {

            id: "dashboard",

            label: "Available Donations",

            icon: <LayoutDashboard size={20} />

        },

        {

            id: "requests",

            label: "My Requests",

            icon: <ClipboardList size={20} />

        },

        {

            id: "notifications",

            label: "Notifications",

            icon: <Bell size={20} />

        },

        {

            id: "profile",

            label: "Profile",

            icon: <User size={20} />

        }

    ];

    return (

        <aside className="w-72 bg-white border-r border-stone-200 flex flex-col">

            <div className="p-8 border-b">

                <h1 className="text-3xl font-bold text-green-600">

                    🍽️FoodBridge

                </h1>

                <p className="text-sm text-stone-500 mt-2">

                    Receiver Portal

                </p>

            </div>

            <nav className="flex-1 px-4 py-6">

                {

                    menuItems.map(item => (

                        <button

                            key={item.id}

                            onClick={() => setActiveTab(item.id)}

                            className={`

                                w-full

                                flex

                                items-center

                                gap-3

                                px-4

                                py-3

                                rounded-xl

                                mb-2

                                transition

                                ${

                                    activeTab === item.id

                                        ? "bg-green-100 text-green-700"

                                        : "hover:bg-green-50 text-stone-700"

                                }

                            `}

                        >

                            {item.icon}

                            {item.label}

                        </button>

                    ))

                }

            </nav>

            <div className="p-4 border-t">

                <button

                        onClick={handleLogout}

                        className="

                            w-full

                            flex

                            items-center

                            gap-3

                            px-4

                            py-3

                            rounded-xl

                            text-red-500

                            hover:bg-red-50

                            transition

                        "

                    >

                        <LogOut size={20} />

                        Logout

                    </button>

            </div>

        </aside>

    );

}

export default ReceiverSidebar;