import { courseDA } from "../data-access";

const migrate = async () => {
    await courseDA.deleteMany({});
    console.log("Migrating courses...");
    const courses = [
        {
            name: "General Grammar",
            description: "Improve your understanding of English grammar rules and concepts.",
        },
        {
            name: "Business English",
            description: "Enhance your business communication skills in English.",
        },
        {
            name: "Casual Conversation",
            description: "Practice everyday conversations in English.",
        },
        {
            name: "Academic Writing",
            description: "Develop your academic writing skills in English.",
        },

    ]
    for (const course of courses) {
        await courseDA.create(course);
    }
    console.log("Courses migrated successfully");
}

export default migrate;