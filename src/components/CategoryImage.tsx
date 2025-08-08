import { Fuzzy_Bubbles } from 'next/font/google'

const fuzzy = Fuzzy_Bubbles({
  subsets: ["latin"],
  weight: ["700"], // choose weights as needed
})

const CategoryImage = ({ name }: { name: string }) => {
    return (
        <div className={`bg-accent1 h-48 sm:h-64 md:h-72 lg:h-80 flex justify-center items-center text-4xl  sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl rounded-3xl text-light-text ${fuzzy.className}`}>
            {name}
        </div>
    )
}

export default CategoryImage
