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

  const handleDelete = () => {};

  const columns = [
    { field: "id", headerName: "ID", minWidth: 100 },
    { field: "title", headerName: "Title", minWidth: 250 },
    { field: "rating", headerName: "Rating", minWidth: 90 },
    {
      field: "owner",
      headerName: "Owner",
      minWidth: 230,
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
      renderCell: (params) => {
        return (
          <div>
            <Link
              to={`/dashboard/reviews/edit/${params.row.reviewId}`}
              className="btn text-primary"
            >
              EDIT
            </Link>
            <Button
              variant="text"
              color="error"
              size="small"
              onClick={() => handleDelete(params.row.reviewId)}
            >
              DELETE
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = reviews.map((review, index) => {
    return {
      id: index + 1,
      reviewId: review.id,
      title: review.title,
      rating: review.rating,
      owner: review.ownerData.name,
      status: review.public,
    };
  });

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <DashboardLayout title="Reviews">
      <Link
        to="/dashboard/reviews/add"
        className="btn btn-outline-primary mb-4"
      >
        Add new Review
      </Link>
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
