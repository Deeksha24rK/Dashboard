import Single from "../../components/single/Single";
import { singleUser } from "../../data";

const User = () => {
  // Fetch data and send it to single component
  return (
    <div className="user">
      <Single {...singleUser} />
    </div>
  );
};

export default User;
