import { Link } from "react-router";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const EditSchema = z.object({
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
  email: z.string().email(),
  grade: z.number().min(1).max(6),
});

const Edit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-fuchsia-200/40 blur-3xl" />
      </div>

      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-lg rounded-2xl bg-white/80 backdrop-blur-xl ring-1 ring-gray-200 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5">
          <div className="p-8">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-800">
              Edit Student
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Update the details for the student.
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register("name")}
                label="Full Name"
                type="text"
                id="name"
                name="name"
                placeholder="e.g., John Doe"
                error={errors.name?.message}
              />
              <Input
                {...register("code", { valueAsNumber: true })}
                label="Student Code"
                type="text"
                id="code"
                name="code"
                placeholder="e.g., 210001"
                error={errors.code?.message}
              />
              <Input
                {...register("email")}
                label="Email Address"
                type="email"
                id="email"
                name="email"
                placeholder="e.g., john.doe@example.com"
                error={errors.email?.message}
              />
              <Input
                {...register("grade", { valueAsNumber: true })}
                label="Grade"
                type="number"
                id="grade"
                name="grade"
                placeholder="e.g., 4"
                min="1"
                max="6"
                error={errors.grade?.message}
              />

              <div className="flex justify-end gap-3 pt-2">
                <Link to="/">
                  <Button
                    type="button"
                    variant="outline"
                    className="px-6 py-2 rounded-xl transition active:scale-95"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow-md transition active:scale-95"
                >
                  Edit Student
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
