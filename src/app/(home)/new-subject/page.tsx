import { Subject } from "@/types/Subject";
import { Box, Typography } from "@mui/material";
import React from "react";

export default function NewSubject() {
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm<Subject>({
  //   resolver: zodResolver(ZUserSchema),
  //   defaultValues: {
  //     name: !id ? "" : userInfos?.name,
  //     email: !id ? "" : userInfos?.email,
  //     password: !id ? "" : userInfos?.password,
  //   },
  // });
  return (
    <Box>
      <Typography variant="h4" className="mb-3">
        Nova Disciplina
      </Typography>
      <Box>Teste</Box>
    </Box>
  );
}
