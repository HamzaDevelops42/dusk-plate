// Types based on your Sanity schemas and desired output

export type SanityMenuItem = {
    _id: string;
    title: string;
    description: string;
    image?: { asset?: { url?: string } }; // might be missing or malformed
    sizes: {
        label: string;
        price: number;
    }[];
    subcategory: {
        _id: string;
        name: string;
        category: {
            _id: string;
            name: string;
        };
    };
};

export type MenuCategory = {
    category: string;
    subcategories: {
        name: string;
        items: MenuItem[];
    }[];
};

export type MenuItem = {
    _id: string;
    title: string;
    description: string;
    image: string; // Required
    sizes: {
        label: string;
        price: number;
    }[];
};

// Fallback image URL (can be local or hosted)
const DEFAULT_IMAGE_URL = "/default-food.jpg";

// Transform function

export function transformMenuData(items: SanityMenuItem[]): MenuCategory[] {
    const map = new Map<string, Map<string, MenuItem[]>>();

    for (const item of items) {
        const categoryName = item.subcategory?.category?.name || "Uncategorized";
        const subcatName = item.subcategory?.name || "Other";

        if (!map.has(categoryName)) {
            map.set(categoryName, new Map());
        }

        const subcatMap = map.get(categoryName)!;

        if (!subcatMap.has(subcatName)) {
            subcatMap.set(subcatName, []);
        }

        subcatMap.get(subcatName)!.push({
            _id: item._id,
            title: item.title,
            description: item.description,
            image: item.image?.asset?.url ?? DEFAULT_IMAGE_URL,
            sizes: item.sizes,
        });
    }

    const result: MenuCategory[] = [];

    for (const [categoryName, subcategories] of map) {
        const formattedSubcats = Array.from(subcategories.entries()).map(
            ([subcatName, items]) => ({
                name: subcatName,
                items,
            })
        );

        result.push({
            category: categoryName,
            subcategories: formattedSubcats,
        });
    }

    return result;
}
