// schemas/restaurantInfo.ts
const restaurantInfo = {
    name: "restaurantInfo",
    title: "Restaurant Info",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Restaurant Name",
            type: "string",
            initialValue: "DuskPlate",
        },
        {
            name: "openingHour",
            title: "Opening Hour (24h)",
            type: "number",
            validation: (Rule: any) => Rule.min(1).max(24),
        },
        {
            name: "closingHour",
            title: "Closing Hour (24h)",
            type: "number",
            validation: (Rule: any) => Rule.min(0).max(24),
        },
        {
            name: "location",
            title: "Location",
            type: "string",
        },
        {
            name: "phone",
            title: "Phone Number",
            type: "string",
        },
        {
            name: "days",
            title: "Days Open",
            type: "string",
            initialValue: "Monday - Sunday",
        },
    ],
    __experimental_actions: ['update', 'publish'], // Only allow editing
};

export default restaurantInfo;
