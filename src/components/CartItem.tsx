import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Trash, Minus, Plus } from 'lucide-react';

type CartItemProps = {
    item: {
        id: string;
        title: string;
        description: string;
        image: string;
        size: {
            label: string;
            price: number;
        };
        quantity: number;
    };
};

export default function CartItem({ item }: CartItemProps) {
    const { incrementQuantity, decrementQuantity, removeItem } = useCart();

    const truncatedDescription =
        item.description.length > 70
            ? item.description.slice(0, 70) + "..."
            : item.description;

    return (
        <div className="flex items-start gap-2 sm:gap-3 border rounded-lg p-2 sm:p-3 shadow-md">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded overflow-hidden">
                <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    sizes="56px"
                    className="object-cover"
                />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm sm:text-base truncate">{item.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                    {truncatedDescription}
                </p>
                <p className="text-xs sm:text-sm mt-1">Size: {item.size.label}</p>
                <div className="flex items-center gap-2 mt-1">
                    <button
                        onClick={() => decrementQuantity(item.id, item.size.label)}
                        className="p-1 rounded-sm bg-accent1 cursor-pointer hover:bg-accent-hover hover:text-light-text hover:scale-105 active:scale-105 focus-visible:scale-105 active:bg-accent-hover2 focus-visible:bg-accent-hover2 active:text-light-text focus-visible:text-light-text"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="text-sm min-w-[20px] text-center">{item.quantity}</span>
                    <button
                        onClick={() => incrementQuantity(item.id, item.size.label)}
                        className="p-1 rounded-sm bg-accent1 cursor-pointer hover:bg-accent-hover hover:text-light-text hover:scale-105 active:scale-105 focus-visible:scale-105 active:bg-accent-hover2 focus-visible:bg-accent-hover2 active:text-light-text focus-visible:text-light-text"
                    >
                        <Plus size={14} />
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
                <p className="text-xs sm:text-sm font-medium">
                    Rs. {(item.size.price * item.quantity).toFixed(2)}
                </p>
                <button
                    onClick={() => removeItem(item.id, item.size.label)}
                    className="mt-1 text-red-500 cursor-pointer hover:scale-105 active:scale-105 focus-visible:scale-105"
                >
                    <Trash size={14} />
                </button>
            </div>
        </div>
    );
}
