// components/CartDrawer.tsx
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingCart } from 'lucide-react';
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem"; 
import { Button } from "./ui/button";

interface CartDrawerProps {
    whatsappNumber: string;
}

export default function CartDrawer({ whatsappNumber }: CartDrawerProps) {
    const { items, clearCart } = useCart();

    const subtotal = items.reduce(
        (total, item) => total + item.size.price * item.quantity,
        0
    )

    const formatMessage = () => {
        let message = `*New Order!*\n\n`;
        items.forEach((item, index) => {
            message += `*${index + 1}. ${item.title}*\n`;
            message += `• Variant: ${item.size.label}\n`;
            message += `• Qty: ${item.quantity}\n`;
            message += `• Price: Rs. ${item.size.price.toFixed(2)}\n\n`;
        });
        message += `*Subtotal:* Rs. ${subtotal.toFixed(2)}`;
        return encodeURIComponent(message);
    }

    const sanitizeNumber = (number: string) => {
        return number.startsWith("+") ? number.slice(1) : number;
    }

    const handleCheckout = () => {
        const message = formatMessage();
        const sanitizedNumber = sanitizeNumber(whatsappNumber);
        window.open(`https://wa.me/${sanitizedNumber}?text=${message}`, "_blank");
    }

    return (
        <Sheet>
            <SheetTrigger className="relative cursor-pointer">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full text-xs px-1 min-w-[16px] h-4 flex items-center justify-center">
                        {items.length}
                    </span>
                )}
            </SheetTrigger>

            <SheetContent className="w-full lg:min-w-[40vw] sm:w-[400px] md:w-[450px] p-3 sm:p-4 flex flex-col">
                <div className="flex-1 min-h-0 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <SheetTitle className="text-lg sm:text-xl font-bold">Your Cart</SheetTitle>
                    </div>

                    <div className="overflow-y-auto pr-1 space-y-3 sm:space-y-4 flex-1">
                        {items.length === 0 ? (
                            <div className="flex items-center justify-center h-32 text-gray-500">
                                Your cart is empty
                            </div>
                        ) : (
                            items.map((item) => (
                                <CartItem key={`${item.id}-${item.size.label}`} item={item} />
                            ))
                        )}
                    </div>
                </div>

                {items.length > 0 && (
                    <div className="border-t pt-3 sm:pt-4 space-y-2 text-sm mt-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>Rs. {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery Charges</span>
                            <span>Rs. 0.00</span>
                        </div>
                        <div className="flex justify-between font-semibold text-base">
                            <span>Grand total</span>
                            <span>Rs. {subtotal.toFixed(2)}</span>
                        </div>

                        <Button
                            onClick={clearCart}
                            variant="outline"
                            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition cursor-pointer text-sm hover:scale-105 active:scale-105 focus-visible:scale-105 active:bg-red-600 focus-visible:bg-red-600"
                        >
                            Clear Cart
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full bg-accent1 text-white py-2 rounded hover:bg-accent-hover transition cursor-pointer text-sm hover:scale-105 active:scale-105 focus-visible:scale-105 active:bg-accent-hover focus-visible:bg-accent-hover "
                            onClick={handleCheckout}
                        >
                            Checkout on Whatsapp
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
