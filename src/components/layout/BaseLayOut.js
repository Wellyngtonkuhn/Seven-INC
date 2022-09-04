import { useDashBoardContext } from "../../context/DashboardContext";
import NavBar from "../dashBoard/dashBoardMenu/NavBar";

import {
  useTheme,
  Typography,
  IconButton,
  Icon,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import { Box } from "@mui/system";

export default function BaseLayOut({ children, titulo }) {
  const { handleDrawer } = useDashBoardContext();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box height="100%">
        <Box
          width={'100%'}
          display="flex"
          flexDirection="column"
          gap={1}
          padding={2}
          height={theme.spacing(12)
          }
        >
          {mobile && (
            <Box display="flex" justifyContent='space-between' alignItems='center'>
              <Avatar
                variant="square"
                sx={{ height: theme.spacing(6), width: theme.spacing(31) }}
                src="https://www.sevenprotecao.com.br/static/media/logo-seven-full.6a130ddc19bb8818cb36.webp"
              />
              <IconButton onClick={handleDrawer}>
                <Icon sx={{ fontSize: 60 }}>menu</Icon>
              </IconButton>
            </Box>
          )}

          <Typography align='center' sx={{ p: mobile && 1 }} variant="h5">
            {titulo}
          </Typography>
        </Box>
        <Box>
          <NavBar />
        </Box>
        <Box sx={{ m: 1, mt: mobile && 7 }}>{children}</Box>
      </Box>
    </>
  );
}
