import { Phone, MapPin } from 'lucide-react';
import Link from "next/link";
import { Cookie } from 'next/font/google';

const cookie = Cookie({
    subsets: ["latin"],
    weight: ["400"],
});

type RestaurantInfo = {
    name: string;
    openingHour: number;
    closingHour: number;
    location: string;
    phone: string;
    days: string;
};

const Footer = ({ restaurantInfo }: { restaurantInfo: RestaurantInfo | null }) => {
    return (
        <footer className="shadow-md lg:rounded-t-2xl md:rounded-t-2xl alg:mx-12 xl:mx-36 bg-surface text-light-text rounded-t-xl  px-4 sm:px-8 lg:px-20 py-4 sm:py-6 min-h-[15vh]">
            <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6 h-full">

                {/* Restaurant Name */}
                <div className={`text-2xl sm:text-3xl lg:text-4xl text-center lg:text-left text-accent-hover tracking-wide ${cookie.className}`}>
                    {restaurantInfo?.name}
                </div>

                {/* Contact Info */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-1/2 text-center lg:text-left">
                    <div className="space-y-1 sm:space-y-2 w-full">
                        <div className="flex items-center justify-center lg:justify-start">
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            <Link href={`tel:${restaurantInfo?.phone}`} className="hover:underline text-sm sm:text-base">
                                {restaurantInfo?.phone}
                            </Link>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 hidden sm:block" />
                            <span className="text-sm sm:text-base">{restaurantInfo?.location}</span>
                        </div>
                    </div>
                </div>

                {/* Timings */}
                <div className="text-center lg:text-right flex justify-center items-center flex-col">
                    <div className="text-sm sm:text-base">{restaurantInfo?.days}</div>
                    <div className="text-xs sm:text-sm">{`${restaurantInfo?.openingHour}:00 ${(restaurantInfo?.openingHour || 10) < 12 ? 'AM' : 'PM'} – ${(restaurantInfo?.closingHour || 22) > 12 ? (restaurantInfo?.closingHour || 22) - 12 : (restaurantInfo?.closingHour || 22)}:00 ${(restaurantInfo?.closingHour || 22) < 12 ? 'AM' : 'PM'}`}</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
