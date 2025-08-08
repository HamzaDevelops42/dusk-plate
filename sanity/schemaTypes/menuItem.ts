export default {
    name: "menuItem",
    title: "Menu Item",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule: any) => Rule.required().min(2).max(100),
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            validation: (Rule : any) => Rule.required().min(10).max(500),
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "sizes",
            title: "Variants",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "label",
                            title: "Label",
                            type: "string",
                            validation: (Rule: any) => Rule.required().min(1).max(20),
                        },
                        {
                            name: "price",
                            title: "Price",
                            type: "number",
                            validation: (Rule: any) =>
                                Rule.required().min(0).error("Price must be a positive number"),
                        },
                    ],
                },
            ],
            validation: (Rule: any) => Rule.required().min(1).error("At least one size is required"),
        },
        {
            name: "subcategory",
            title: "Subcategory",
            type: "reference",
            to: [{ type: "subcategory" }],
            validation: (Rule: any) => Rule.required(),
        },
    ],
}
