import { useState, useEffect } from "react";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import BaseLayOut from "../layout/BaseLayOut";
import { EmployeeService } from "../services/employees/index";

export default function DashBoardHome() {
  
  const [totalFuncionarios, setTotalFuncionario] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      EmployeeService.getAll().then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalFuncionario(result.data);
        }
      });
    }, 1000);
  }, []);

  return (
    <>
      <BaseLayOut titulo={"PáginaInicial"}>
        <Box display="flex" sx={{ m: 1 }}>
          <Grid container>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" align="center">
                      Total de Funcionário
                    </Typography>
                    <Box
                      padding={6}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {isLoading ? (
                        <Box>
                          <Skeleton width={100} height={100} />
                        </Box>
                      ) : (
                        <Typography variant="h1">
                          {totalFuncionarios.length}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </BaseLayOut>
    </>
  );
}
