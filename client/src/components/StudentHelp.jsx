import "./StudentView";
import "./GeneralStyle.css"
import circles from "../assets/circles.png";
import dog from "../assets/dog.png";

export const StudentHelp = () => {

  return (
    <div className="registration">
      <img className="logo" src={circles} alt="top left circles" />
      <span className="title">You're getting helped!</span>
      <span className="description">
        Your question:
        {/* add the their question */}
      </span>

      <img className="dog" src={dog} alt="cute dog" />
    </div>
  );
}
export default StudentHelp;