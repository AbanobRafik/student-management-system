import z from "zod";

export const StudentSchema = z.object({
  name: z
    .string()
    .regex(
      /^[A-Z][a-z]+(?:\s[A-Z][a-z]+){2}$/,
      "Name must have three words, each starting with a capital letter"
    ),
  code: z
    .number()
    .min(100000, "Code must be at least 6 digits")
    .max(999999, "Code must be at most 6 digits"),
  email: z.string().email("Invalid email"),
  grade: z.number().min(1, "Minimum grade is 1").max(6, "Maximum grade is 6"),
});
