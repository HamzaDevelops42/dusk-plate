import { defineType } from "sanity"

export default defineType({
    name: "category",
    title: "Category",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Category Name",
            type: "string",
            validation: (Rule) => Rule.required().min(2).max(50),
        },
    ],
})
