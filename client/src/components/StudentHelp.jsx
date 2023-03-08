import "./GeneralStyle.css"
import circles from "../assets/circles.png";
import dog from "../assets/questionDog.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, useToast } from '@chakra-ui/react'

export const StudentHelp = ({ currQuestion, selectedCourse, isTa, netId }) => {
  
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/login`;
    navigate(path);
  }
  const toast = useToast();
  // TODO: make API call before loading
  useEffect(() => {
    // Define a function that makes the API call and updates the data state
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/student/${selectedCourse}/${netId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      try {
        if(response.ok){
          const responseData = await response.json();
          console.log(responseData);
          if(responseData.helped){
            toast({
              title: 'Thanks for Q\'dubbin',
              description: "Login again to queue up!",
              status: 'info',
              duration: 10000,
              isClosable: true,
            });
            routeChange();
          }
        }
      } catch (error) {
        console.error(error);
      }


      // INTERVAL GET HELPED STATUS
        // WHEN HELPED (student is in dequeue map)
          // AWAIT REMOVE API -> backend gets message
          // REROUTE

    };
    // check if head of queue and reroute to student-help
    // Call the function immediately and then schedule it to be called every 10 seconds
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 500);

    // Return a cleanup function that clears the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <img className="logo" src={circles} alt="top left circles" />
        <div className="webpage">
        <h1 className="title" style={{ marginBottom: '5%' }}>Your Turn!</h1>
        <img className="dog" src={dog} alt="cute dog" />
        <Box mt='5%' borderColor='RGBA(0, 0, 0, 0.16)'
              borderRadius='15px'
              borderWidth='2px'
              w='40%' minH='8rem'
              p='3rem'
              textAlign="center"
          >
            <p className="description">
              {currQuestion}
            </p>
          </Box>
      </div>
    </div>
  );
}
export default StudentHelp;