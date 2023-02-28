import "./GeneralStyle.css"
import circles from "../assets/circles.png";
import dog from "../assets/questionDog.png";

export const StudentHelp = () => {

  // TODO: make API call before loading
  return (
    <div>
      <img className="logo" src={circles} alt="top left circles" />
        <div className="webpage">
        <h1 className="title">Your Turn!</h1>
        <img className="dog" src={dog} alt="cute dog" />
        <p className="description">
          {/* add the their question */}
        </p>
      </div>
    </div>
  );
}
export default StudentHelp;