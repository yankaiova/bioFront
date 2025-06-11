import * as yup from "yup";
const VALID_REG_EXP = /^[ARNDCEQGHILKMFPSTWYV-]+$/i;

export const schema: yup.ObjectSchema<
  { seq1: string; seq2: string },
  yup.AnyObject,
  { seq1: undefined; seq2: undefined }
> = yup.object({
  seq1: yup
    .string()
    .required("Обязательное поле")
    .matches(
      VALID_REG_EXP,
      "Допустимые только символы аминокислот: латинские буквы ARNDCEQGHILKMFPSTWYV и -",
    )
    .test(
      "len",
      "Последовательности должны быть одинаковой длины",
      function (value) {
        const parent = this.parent as { seq2?: string };
        return value.length === parent.seq2?.length;
      },
    ),
  seq2: yup
    .string()
    .required("Обязательное поле")
    .matches(
      VALID_REG_EXP,
      "Допустимые только символы аминокислот: латинские буквы ARNDCEQGHILKMFPSTWYV и -",
    )
    .test(
      "len",
      "Последовательности должны быть одинаковой длины",
      function (value) {
        const parent = this.parent as { seq1?: string };
        return value.length === parent.seq1?.length;
      },
    ),
});
