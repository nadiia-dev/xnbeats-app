import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import ReviewForm from "../../components/ReviewForm";

const AddEdit = () => {
  const params = useParams();
  return (
    <DashboardLayout title="Review">
      <ReviewForm id={params.id} />
    </DashboardLayout>
  );
};

export default AddEdit;
