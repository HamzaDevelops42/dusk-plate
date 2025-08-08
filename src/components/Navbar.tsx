import { useState, useEffect } from "react"
// import restaurantInfo from "@/data/constants"
import { Cookie } from 'next/font/google'
import CartDrawer from "./CartDrawer"

const cookie = Cookie({
    subsets: ["latin"],
    weight: ["400"],
})

type RestaurantInfo = {
    name: string;
    openingHour: number;
    closingHour: number;
    location: string;
    phone: string;
    days: string;
};

const Navbar = ({ restaurantInfo }: { restaurantInfo: RestaurantInfo | null }) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const now = new Date()
        const currentHour = now.getHours()
        setIsOpen(
            currentHour >=( restaurantInfo?.openingHour || 10) &&
            currentHour < (restaurantInfo?.closingHour || 22)
        )
    }, [restaurantInfo])

    function formatHour(hour: number): string {
        const suffix = hour >= 12 ? "PM" : "AM"
        const formatted = hour % 12 === 0 ? 12 : hour % 12
        return `${formatted}:00 ${suffix}`
    }

    return (
        <nav className="bg-surface text-white py-3 px-3 sm:px-6 flex items-center justify-between shadow-md">
            {/* Left: Status */}
            <div className="text-sm font-medium hidden lg:block">
                {isOpen ? (
                    <span className="text-green-400">Open Now</span>
                ) : (
                    <span className="text-red-400">Closed</span>
                )}

                <div className="text-xs font-light">
                    {`${formatHour(restaurantInfo?.openingHour || 10)} – ${formatHour(restaurantInfo?.closingHour || 22)}`}
                </div>
            </div>

            {/* Center: Brand */}
            <div className={`text-2xl sm:text-3xl lg:text-4xl tracking-wide ${cookie.className}`}>
                {restaurantInfo?.name}
            </div>

            {/* Right: Cart */}
            <CartDrawer whatsappNumber={restaurantInfo?.phone || "999999999"} />
        </nav>
    )
}

export default Navbar
