import { courseDA } from "../data-access";

const courseService = {

    // async createCourse(course: any) {
    //     const course = await DataAccess.create(course);
    //     return course;
    // }

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
