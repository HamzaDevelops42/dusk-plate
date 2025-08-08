import { defineType } from "sanity"

export default defineType({
    name: "subcategory",
    title: "Subcategory",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Subcategory Name",
            type: "string",
            validation: (Rule) => Rule.required().min(2).max(50),
        },
        {
            name: "category",
            title: "Parent Category",
            type: "reference",
            to: [{ type: "category" }],
            validation: (Rule) => Rule.required(),
        },
    ],
})
