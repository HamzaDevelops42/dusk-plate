"use client"

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import CategoryImage from "@/components/CategoryImage";
import MenuItemCard from "@/components/MenuItemCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import Footer from "@/components/Footer";
import { client } from "@/lib/sanity.client";
import { MenuCategory, transformMenuData } from "@/lib/transformMenuData";
import LoadingWrapper from "@/components/Loader";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const navbarRef = useRef<HTMLDivElement>(null);

  // Fetch Data
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  type RestaurantInfo = {
    name: string;
    openingHour: number;
    closingHour: number;
    location: string;
    phone: string;
    days: string;
  };

  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo | null>(null);

  // ✅ Fetch and set menu data

  // ✅ Fetch menu + info together
  useEffect(() => {
    async function fetchData() {
      try {
        const menuQuery = `
          *[_type == "menuItem"] {
            _id,
            title,
            description,
            image {
              asset -> {
                url
              }
            },
            sizes,
            subcategory-> {
              name,
              category-> {
                name
              }
            }
          }
        `;

        const infoQuery = `*[_type == "restaurantInfo"][0]`;

        const [menuItems, info] = await Promise.all([
          client.fetch(menuQuery),
          client.fetch(infoQuery),
        ]);

        const transformedMenu = transformMenuData(menuItems);
        setMenu(transformedMenu);
        setRestaurantInfo(info);
        // console.log(info)
      } catch (error) {
        console.error("❌ Failed to fetch data:", error);
        setError("Failed to load menu or info. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Track section refs
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    if (menu.length === 0) return; // Don't observe if no data
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -40% 0px",
        threshold: 0.1,
      }
    );

    const currentSections = Object.values(sectionRefs.current);
    currentSections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      currentSections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [menu]); // <-- add `menu` as dependency


  const scrollToCategory = (subcategoryName: string) => {
    const navbarHeight = navbarRef.current?.offsetHeight || 0;

    for (const category of menu) {
      if (category.subcategories.length && category.subcategories[0].name === subcategoryName) {
        const categoryElement = document.getElementById(category.category);
        if (categoryElement) {
          const top = categoryElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({ top, behavior: "smooth" });
          return;
        }
      }
    }

    const subcategoryElement = document.getElementById(subcategoryName);
    if (subcategoryElement) {
      const top = subcategoryElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const { addItem } = useCart();

  type Size = {
    label: string;
    price: number;
  };


  type item = {
    _id: string;
    title: string;
    description: string;
    image: string;
    sizes: Size[];
  }

  type selectedSize = {
    label: string
    price: number
  }

  const handleAddToCart = (menuItem: item, selectedSize: selectedSize, quantity: number) => {
    const cartItem = {
      id: menuItem._id,
      title: menuItem.title,
      description: menuItem.description,
      image: menuItem.image,
      size: selectedSize,
      quantity: quantity,
    };

    addItem(cartItem);
  };

  if (loading) {
    return <LoadingWrapper />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="sticky top-0 z-50" ref={navbarRef}>
          <Navbar restaurantInfo={restaurantInfo} />

          <div className="relative overflow-x-auto no-scrollbar px-2 bg-white border-b shadow">
            <div className="flex justify-center">
              <div className="flex gap-2 sm:gap-3 py-4 sm:py-6 mx-auto w-full max-w-max">
                {menu.map((category, index) => (
                  <div key={index} className="flex gap-2 sm:gap-3">
                    {category.subcategories.map((subcategory, i) => (
                      <Button
                        key={i}
                        onClick={() => scrollToCategory(subcategory.name)}
                        className={`text-xs sm:text-sm font-medium py-3 sm:py-5 px-3 sm:px-4 rounded-full transition hover:scale-105 active:scale-105 focus-visible:scale-105 cursor-pointer ${activeCategory === subcategory.name
                          ? "bg-accent-hover2 text-white"
                          : "bg-accent1 text-white hover:bg-accent-hover2 active:bg-accent-hover2 focus-visible:bg-accent-hover2"
                          }`}
                      >
                        {subcategory.name}
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        <Separator />

        <>
          {menu.map((category, index) => (
            <div
              className="mx-3 sm:mx-6 lg:mx-12 my-6 sm:my-8 lg:my-12 scroll-mt-24"
              key={index}
              id={category.category}
              ref={(el) => {
                if (el) sectionRefs.current[category.category] = el;
              }}
            >
              <CategoryImage name={category.category} />
              {category.subcategories.map((subcategory, index) => (
                <div
                  key={index}
                  id={subcategory.name}
                  className="scroll-mt-24"
                  ref={(el) => {
                    if (el) sectionRefs.current[subcategory.name] = el;
                  }}
                >
                  <h2 className="text-dark-text text-xl sm:text-2xl lg:text-3xl py-3 font-bold">
                    {subcategory.name}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 mx-2 sm:mx-6 my-2">
                    {subcategory.items.map((item, index) => (
                      <MenuItemCard
                        key={index}
                        onAddToCart={(item, selectedSize, quantity) =>
                          handleAddToCart(item, selectedSize, quantity)
                        }
                        item={item}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </>

        <div className="mt-auto">
          <Footer restaurantInfo={restaurantInfo} />
        </div>
      </div>
    </>
  );
}
