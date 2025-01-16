import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCourse from '../hooks/useCourse';

const Card = styled.div`
  /* Add your CSS styles here */
  background-color: #f7f7f7;
  padding: 20px 12%;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;

`;

const AddCourseButton = styled.button`
          background-color: #4CAF50;
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        `;


const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const ModalContent = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

const Home = () => {

    const { courses, getCourses } = useCourse();

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleModalBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setIsModalOpen(false);
        }
    };

    const Modal = () => {
        return (
            <ModalBackground onClick={handleModalBackgroundClick}>
                <ModalContent>
                    <h2>Add Learning Course</h2>
                    <input type="text" placeholder="Course Name" />
                    <input type="text" placeholder="Course Description" />
                    <button onClick={handleModal}>Add</button>
                </ModalContent>
            </ModalBackground>
        );
    };

    const handleCardClick = (courseName: string) => {
        navigate(`/dashboard/${courseName}`);
    };

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <>
            {
                courses.map((course: any) => (
                    <Card onClick={() => handleCardClick(course.name)}>
                        <h2>{course.name}</h2>
                        <p>{course.description}</p>
                    </Card>
                ))
            }

            {/* <AddCourseButton onClick={handleModal}>Add Learning Course</AddCourseButton> */}
            {/* {isModalOpen && <Modal />} */}
        </>
    )
}

export default Home;
