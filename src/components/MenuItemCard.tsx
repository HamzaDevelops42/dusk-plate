"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Minus, Plus } from 'lucide-react'
import { DialogTitle } from "@radix-ui/react-dialog"

interface SizeOption {
    label: string
    price: number
}

interface MenuItem {
    _id: string
    title: string
    description: string
    image: string
    sizes: SizeOption[]
}

interface MenuItemCardProps {
    item: MenuItem
    onAddToCart?: (item: MenuItem, size: SizeOption, quantity: number) => void
    className?: string
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
    item,
    onAddToCart,
    className = "",
}) => {
    const [selectedSize, setSelectedSize] = useState<SizeOption>(item.sizes[0])
    const [quantity, setQuantity] = useState(1)

    const total = (selectedSize?.price || 0) * quantity

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={`flex w-full sm:w-80 ${className} cursor-pointer`}>
                    <div className="w-full p-2 sm:p-4">
                        <div className="flex flex-col justify-between p-4 sm:p-6 bg-white rounded-xl shadow-md transition hover:shadow-lg h-full border border-border">
                            <div className="mb-4">
                                <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.title}
                                    width={400}
                                    height={250}
                                    loading="lazy"
                                    className="object-cover object-center w-full h-[35vh] sm:h-48 rounded-lg"
                                />
                            </div>
                            <div className="mb-3">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                                    {item.title}
                                </h2>
                                {item.description && (
                                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                        {item.description.length > 70
                                            ? `${item.description.slice(0, 70)}...`
                                            : item.description}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center justify-between pt-4">
                                <span className="text-base sm:text-lg font-bold text-gray-900">
                                    {selectedSize?.price
                                        ? `Rs ${selectedSize.price.toFixed(2)}`
                                        : "—"}
                                </span>
                                <Button className="text-xs sm:text-sm font-medium text-white bg-accent1 hover:bg-accent-hover py-3 sm:py-4 hover:scale-105 hover:scale-105 active:scale-105 focus-visible:scale-105 active:bg-accent-hover focus-visible:bg-accent-hover">
                                    View
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent className="max-w-4xl min-w-[90vw] sm:w-[90vw] min-h-[90vh] sm:max-h-[90vh] overflow-y-auto rounded-xl p-0 text-dark-text">
                <DialogTitle className="sr-only">{item.title}</DialogTitle>
                <div className="flex flex-col lg:flex-row h-full">
                    <div className="relative w-full lg:w-1/2 h-[30vh] sm:h-[40vh] lg:h-full">
                        <Image 
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            layout="fill"
                            loading="lazy"
                            className="object-cover object-center rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none"
                        />
                        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3 sm:p-4 w-full rounded-bl-xl">
                            <h2 className="text-xl sm:text-2xl font-bold">{item.title}</h2>
                            {item.description && (
                                <p className="text-xs sm:text-sm mt-1">{item.description}</p>
                            )}
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 w-full lg:w-1/2 flex flex-col justify-between">
                        <div className="mb-6">
                            <span className="font-semibold text-black block mb-2">Variants</span>
                            <div className="flex flex-col gap-2">
                                {item.sizes.map((size) => (
                                    <Button
                                        key={size.label}
                                        variant="outline"
                                        className={`justify-between w-full cursor-pointer text-sm  ${selectedSize.label === size.label
                                            && "bg-surface text-light-text hover:bg-surface hover:text-light-text"
                                            }`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        <span>{size.label}</span>
                                        <span>Rs. {size.price.toFixed(2)}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="bg-accent1 cursor-pointer hover:bg-accent-hover hover:text-light-text hover:scale-105 active:scale-105 focus-visible:scale-105 active:bg-accent-hover focus-visible:bg-accent-hover"
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="font-medium w-6 text-center">{quantity}</span>
                                <Button
                                    variant="outline"
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="bg-accent1 cursor-pointer hover:bg-accent-hover hover:text-light-text hover:scale-105 active:scale-105 focus-visible:scale-105 active:bg-accent-hover focus-visible:bg-accent-hover"
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <Button
                                className="bg-accent1 hover:bg-accent-hover text-white cursor-pointer text-sm sm:text-md py-4 sm:py-6 w-full sm:w-auto hover:scale-105 active:scale-105 focus-visible:scale-105 active:bg-accent-hover focus-visible:bg-accent-hover"
                                onClick={() => onAddToCart?.(item, selectedSize, quantity)}
                            >
                                Add To Cart – Rs. {total.toFixed(2)}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MenuItemCard
