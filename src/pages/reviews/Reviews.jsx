import { DataGrid } from "@mui/x-data-grid";
import DashboardLayout from "../../components/DashboardLayout";
import { Button, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectReviews } from "../../store/reviews/selectors";
import { useEffect } from "react";
import { getReviews } from "../../store/reviews/actions";
import { Link } from "react-router-dom";

const Reviews = () => {
  const reviews = useSelector(selectReviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 190 },
    { field: "title", headerName: "Title", minWidth: 200 },
    { field: "rating", headerName: "Rating", minWidth: 90 },
    {
      field: "owner",
      headerName: "Owner",
      minWidth: 200,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 90,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
    },
  ];

  const actions = (
    <div>
      <Button variant="contained" color="primary" size="small">
        Edit
      </Button>
      <Button variant="outlined" color="secondary" size="small">
        Delete
      </Button>
    </div>
  );

  const rows = reviews.map((review) => {
    return {
      id: review.id,
      title: review.title,
      rating: review.rating,
      owner: review.ownerData.name,
      status: review.public,
      actions,
    };
  });

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <DashboardLayout title="Reviews">
      <Link to="/dashboard/reviews/add">Add new Review</Link>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </DashboardLayout>
  );
};

export default Reviews;
