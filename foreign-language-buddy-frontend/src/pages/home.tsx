import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCourse from '../hooks/useCourse';
import useLoading from '../hooks/useLoading';
import Loading from '../components/pageLoading';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 64px);
  background: linear-gradient(to bottom, #1a1b1e, #2d2e32);
  color: #ffffff;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
  padding: 32px 0;
  
  h1 {
    font-size: 3rem;
    color: #ffffff;
    margin-bottom: 16px;
    font-weight: 700;
    letter-spacing: -0.5px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  p {
    font-size: 1.3rem;
    color: #a0aec0;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
  padding: 0 16px;
`;

const Card = styled.div`
  background-color: #2d2e32;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #64ffda, #48bb78);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
    background-color: #34353a;

    &::before {
      opacity: 1;
    }
  }

  h2 {
    font-size: 1.8rem;
    color: #ffffff;
    margin-bottom: 16px;
    font-weight: 600;
  }

  p {
    color: #a0aec0;
    line-height: 1.6;
    font-size: 1.1rem;
  }
`;

const AddCourseButton = styled.button`
  background: linear-gradient(135deg, #64ffda, #48bb78);
  color: #1a1b1e;
  padding: 16px 32px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
  box-shadow: 0 4px 15px rgba(100, 255, 218, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(100, 255, 218, 0.4);
    background: linear-gradient(135deg, #48bb78, #38a169);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 999;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #2d2e32;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  width: 90%;
  max-width: 500px;
  animation: slideUp 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @keyframes slideUp {
    from {
      transform: translate(-50%, -40%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }

  h2 {
    margin-bottom: 32px;
    color: #ffffff;
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
  }

  input {
    width: 100%;
    padding: 14px;
    margin-bottom: 20px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    background-color: #34353a;
    color: #ffffff;

    &:focus {
      outline: none;
      border-color: #64ffda;
      box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.2);
    }

    &::placeholder {
      color: #718096;
    }
  }

  button {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #64ffda, #48bb78);
    color: #1a1b1e;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #48bb78, #38a169);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(100, 255, 218, 0.3);
    }

    &:active {
      transform: translateY(1px);
    }
  }
`;

const Home = () => {

    const { courses, getCourses } = useCourse();
    const { isLoading, isLodingTrue, isLodingFalse } = useLoading();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    
    const handleModalBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setIsModalOpen(false);
        }
    };

    const handleAddCourse = () => {
        // addCourse({ courseName, courseDescription });
        setIsModalOpen(false);
    }

    const initializeHome = async () => {
        isLodingTrue();
        await getCourses();
        isLodingFalse();
    }

    useEffect(() => {
        initializeHome();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    const Modal = () => {
        return (
            <ModalBackground onClick={handleModalBackgroundClick}>
                <ModalContent>
                    <h2>Add Learning Course</h2>
                    <input type="text" placeholder="Course Name" value={courseName} onChange={(c) => setCourseName(c.target.value)} />
                    <input type="text" placeholder="Course Description" value={courseDescription} onChange={(c) => setCourseDescription(c.target.value)} />
                    <button onClick={handleAddCourse}>Add</button>
                </ModalContent>
            </ModalBackground>
        );
    };

    const handleCardClick = (courseName: string) => {
        navigate(`/dashboard/${courseName}`);
    };

    return (
        <Container>
            <Header>
                <h1>Learning Courses</h1>
                <p>Select a course to begin your learning journey</p>
            </Header>
            
            <CardsGrid>
                {courses.map((course: any) => (
                    <Card key={course.name} onClick={() => handleCardClick(course.name)}>
                        <h2>{course.name}</h2>
                        <p>{course.description}</p>
                    </Card>
                ))}
            </CardsGrid>

            <AddCourseButton onClick={handleModal}>Add Learning Course</AddCourseButton>
            {isModalOpen && <Modal />}
        </Container>
    )
}

export default Home;
