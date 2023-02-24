import { useNavigate } from 'react-router-dom'
import "./GeneralStyle.css"
import circles from "../assets/circles.png";
import dog from "../assets/welcomeDog.png";

export const Home = () => {

  // navigation route
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/login`;
    navigate(path);
  }

  return (
    <div>
      <img className="logo" src={circles} alt="top left circles" />
      <div className="webpage">
        <h1 className='title'>Q'Dub</h1>
        <img className="dog" src={dog} alt="cute dog" />
        <div>
          <button className="button" onClick={() => routeChange()}>
            Start!
          </button>
        </div>
      </div>
    </div>

  );
}
export default Home;