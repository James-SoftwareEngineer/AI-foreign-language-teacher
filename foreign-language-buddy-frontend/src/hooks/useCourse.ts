import { useContext, useState } from "react";
import serverProvider from "../service";
import { GlobalContext } from "../context";

const useCourse = () => {
    const { update, state } = useContext(GlobalContext);

    // const selectCourse = async (courseName: string) => {
    //     const result = await serverProvider.selectCourse(courseName);
    //     console.log(result);
    // }

    const getCourses = async () => {
        const result = await serverProvider.getCourses();
        update({ courses: result.data });
    }

    // const addCourse = async (course: any) => {
    //     const result = await serverProvider.addCourse(course);
    //     console.log(result);
    // }


    return {
        // selectCourse,
        getCourses,
        // addCourse,
        courses: state.courses
    }
}

export default useCourse;
