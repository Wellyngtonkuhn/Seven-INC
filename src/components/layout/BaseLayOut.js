import { useDashBoardContext } from "../context/DashboardContext";

import {
  useTheme,
  Typography,
  IconButton,
  Icon,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";

export default function BaseLayOut({ children, titulo }) {

  const { handleDrawer } = useDashBoardContext();

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <>
      <Box height="100%" display="flex" flexDirection="column" gap={1}>
        <Box
          display="flex"
          gap={1}
          alignItems="center"
          padding={5}
          height={theme.spacing(12)}
        >
          {smDown && (
            <IconButton onClick={handleDrawer}>
              <Icon>menu</Icon>
            </IconButton>
          )}

          <Typography variant="h5">{titulo}</Typography>
        </Box>
        <Box>Barra de Ferramentas</Box>
        <Box>{children}</Box>
      </Box>
    </>
  );
}
