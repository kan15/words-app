import React from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import {
  itemMenuBackgroundColor,
  menuBackgroundColor,
} from "./constants/colors";

export const drawerWidth = 240;

const menuItems = [
  {
    text: "Home",
    path: "/words-app",
    icon: <SubjectOutlinedIcon />,
  },
  {
    text: "Start learning",
    path: "/learning",
    icon: <SchoolOutlinedIcon />,
  },
];

export const Menu = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        component="img"
        sx={{
          height: 120,
          width: "100%",
          maxHeight: { xs: 240, md: 120 },
          maxWidth: { xs: "100%", md: "100%" },
        }}
        alt="Logo"
        src="https://i.postimg.cc/PrMJ5V2n/OKlogo.png"
      />
      <List>
        {menuItems.map((item) => {
          return (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
              }}
              sx={{ backgroundColor: itemMenuBackgroundColor, mb: 0.25 }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontWeight: 700,
                    fontSize: 20,
                  },
                }}
                primary={item.text}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
