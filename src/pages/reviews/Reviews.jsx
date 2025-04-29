import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

const Reviews = () => {
  return (
    <DashboardLayout title="Reviews">
      <Link to="/dashboard/reviews/add">Profile</Link>
    </DashboardLayout>
  );
};

export default Reviews;
