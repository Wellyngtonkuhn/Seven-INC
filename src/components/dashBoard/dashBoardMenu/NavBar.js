import { AppBar, Box, Button, Toolbar } from "@mui/material";

export default function NavBar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{padding: '10px'}} color='inherit'  position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <img
              style={{ width: 175, height: 52 }}
              src="https://www.sevenprotecao.com.br/static/media/logo-seven-full.6a130ddc19bb8818cb36.webp"
            />

            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
