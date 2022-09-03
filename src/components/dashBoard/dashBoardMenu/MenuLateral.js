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
  Collapse,
} from "@mui/material";
import { Box } from "@mui/system";

import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const ListItemLink = ({ open, to, icon, label, onClick }) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <Collapse
      in={open}
      timeout="auto"
      unmountOnExit
      selected={match}
      onClick={handleClick}
    >
      <List component="div" disablePadding>
        <ListItemButton selected={match} onClick={handleClick} sx={{ pl: 4 }}>
          <ListItemIcon>
            <Icon>{icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      </List>
    </Collapse>
  );
};

export default function MenuLateral({ children }) {
  const { isDrawerOpen, handleDrawer } = useDashBoardContext();
  const [drawerOptions] = useState([
    {
      icon: "add",
      label: "Novo Funcionário",
      to: "/dashboard/employee/new",
    },
    {
      icon: "list",
      label: "Funcionários",
      to: "/dashboard/employee/list",
    },
  ]);
  const [open, setOpen] = useState(true);

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleOpenMenuItem = () => {
    setOpen(!open);
  };

  const handleClick = (to) => {
    navigate(to);
    handleDrawer();
  };

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
              <ListItemButton onClick={() => handleClick("/dashboard")}>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary="Página Inicial" />
              </ListItemButton>

              <ListItemButton onClick={handleOpenMenuItem}>
                <ListItemIcon>
                  <Icon>person</Icon>
                </ListItemIcon>
                <ListItemText primary="Funcionários" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              {drawerOptions.map((item) => {
                return (
                  <ListItemLink
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    to={item.to}
                    open={open}
                    onClick={smDown ? handleDrawer : undefined}
                  />
                );
              })}

              <ListItemButton>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(33)}>
        {children}
      </Box>
    </>
  );
}
