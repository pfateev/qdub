import "./GeneralStyle.css"
import circles from "../assets/circles.png";
import dog from "../assets/questionDog.png";
import { Box } from '@chakra-ui/react'

export const StudentHelp = ({ currQuestion }) => {

  // TODO: make API call before loading
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