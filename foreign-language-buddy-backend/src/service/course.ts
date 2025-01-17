import { courseDA } from "../data-access";

const courseService = {

    // async addCourse(courseName: string, courseDescription: string) {
    //     const course = await courseDA.create({ name: courseName, description: courseDescription });
    //     return course;
    // },

    async getCourses() {
        const courses = await courseDA.findAll();
        return courses;
    },

    async selectCourse(courseName: string) {
        const course = await courseDA.findOne({name: courseName});
        return course;
    }
}

export default courseService;
