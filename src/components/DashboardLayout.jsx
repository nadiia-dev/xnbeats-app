import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../store/auth/selectors";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const DashboardLayout = ({ children, title }) => {
  const user = useSelector(selectUser);

  const DrawerList = (
    <Box sx={{ width: 239 }} role="presentation">
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/profile">
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          anchor="left"
          variant={"permanent"}
          open={true}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              zIndex: 0,
              width: 240,
              boxSizing: "border-box",
              height: "100%",
              backgroundColor: "light",
            },
          }}
        >
          {DrawerList}
        </Drawer>
      </Box>
      <Box
        component="div"
        className="col-md-10 col-lg-10"
        sx={{
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { sm: `${drawerWidth}px` },
        }}
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
          <h2>{title}</h2>
          <Button variant="outlined" className="mb-2 md-0 text-capitalize">
            Hello {user.name} {user.lastName}
          </Button>
        </div>
        <Toolbar />
        {children}
      </Box>
    </>
  );
};

export default DashboardLayout;
