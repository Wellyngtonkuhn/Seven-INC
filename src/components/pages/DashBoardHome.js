import { useState, useEffect } from "react";

import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
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
          console.log(result.data);
        }
      });
    }, 1000);
  }, []);

  return (
    <>
      <BaseLayOut titulo={"PáginaInicial"}>
        <Box sx={{ m: 1 }}>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <Card>
              {isLoading ? (
                <>
                  <Skeleton sx={{ m: 1 }} width={150} height={50} />
                  <Skeleton sx={{ m: 1 }} width={150} height={50} />
                </>
              ) : (
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Funcionários
                  </Typography>
                  <Typography variant="p" component="p">
                    {`Total ${totalFuncionarios.length}`}
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Box>
        </Box>
      </BaseLayOut>
    </>
  );
}
