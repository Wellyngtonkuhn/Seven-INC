import { useState } from "react";

import { useDashBoardContext } from "../../context/DashboardContext";

import {
  Drawer,
  Avatar,
  useTheme,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  Icon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";

import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

const ListItemLink = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default function MenuLateral({ children }) {
  const { isDrawerOpen, handleDrawer } = useDashBoardContext();
  const [drawerOptions] = useState([
    {
      icon: "home",
      label: "Página inicial",
      to: "/dashboard",
    },
    {
      icon: "person",
      label: "Novo Funcionário",
      to: "/dashboard/employee/new",
    },
    {
      icon: "list",
      label: "Funcionários",
      to: "/dashboard/employee/list",
    },
  ]);

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={handleDrawer}
      >
        <Box
          width={theme.spacing(33)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width={"100%"}
            height={theme.spacing(10)}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar
              variant="square"
              sx={{ height: theme.spacing(6), width: theme.spacing(31) }}
              src="https://www.sevenprotecao.com.br/static/media/logo-seven-full.6a130ddc19bb8818cb36.webp"
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((item) => {
                return (
                  <ListItemLink
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    to={item.to}
                    onClick={smDown ? handleDrawer : undefined}
                  />
                );
              })}
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 1 : theme.spacing(35)}>
        {children}
      </Box>
    </>
  );
}
