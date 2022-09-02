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

export default function MenuLateral({ children }) {
  const { isDrawerOpen, handleDrawer } = useDashBoardContext();

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
              <ListItemButton onClick={smDown ? handleDrawer : undefined}>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary="Página inicial" />
              </ListItemButton>
              <ListItemButton onClick={smDown ? handleDrawer : undefined}>
                <ListItemIcon>
                  <Icon>person</Icon>
                </ListItemIcon>
                <ListItemText primary="Novo Funcionário" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(35)}>
        {children}
      </Box>
    </>
  );
}
