import React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { customColors } from "./constants/colors";
import { CardMedia } from "@mui/material";

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
] as const;

export const Menu = () => {
  const navigate = useNavigate();
  return (
    <>
      <CardMedia
        component="img"
        image="https://i.postimg.cc/PrMJ5V2n/OKlogo.png"
        alt="Logo"
        sx={{
          height: 100,
          width: "100%",
          maxHeight: { xs: 240, md: 100 },
          maxWidth: { xs: "100%", md: "100%" },
        }}
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
              sx={{
                backgroundColor: customColors.itemMenuBackground,
                mb: 0.25,
              }}
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
