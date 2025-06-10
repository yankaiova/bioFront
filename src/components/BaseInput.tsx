import type { FC } from "react";

import { TextField } from "@mui/material";
import { Controller, type Control, type FieldPath } from "react-hook-form";

import type { FormValues } from "./AminoForm";

type BaseInputAminoProps = {
  control: Control<FormValues>;
  name: FieldPath<FormValues>;
  label: string;
};
export const BaseInputAmino: FC<BaseInputAminoProps> = ({
  control,
  name,
  label,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
