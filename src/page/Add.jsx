import { Link, useNavigate } from "react-router";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// ✅ Zod validation schema
const StudentSchema = z.object({
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

const Add = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(StudentSchema),
  });

  const onSubmit = async (data) => {
    const studentData = {
      ...data,
      code: Number(data.code),
      grade: Number(data.grade),
    };

    try {
      const response = await axios.post(
        "https://student-management-rho.vercel.app/api/student", // ✅ confirm correct route
        studentData
      );

      if (response.status === 200) {
        toast.success("Student added successfully!", {
          position: "top-center",
        });
        reset();
        navigate("/"); // redirect to home
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add student", {
        position: "top-right",
        style: { background: "#333", color: "#fff" },
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 overflow-hidden">
      {/* background blurs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-fuchsia-200/40 blur-3xl" />
      </div>

      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-lg rounded-2xl bg-white/80 backdrop-blur-xl ring-1 ring-gray-200 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5">
          <div className="p-8">
            {/* header */}
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              <span className="inline-block h-2 w-2 rounded-full bg-indigo-500" />
              New Enrollment
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-gray-800">
              Add New Student
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the details to enroll a new student.
            </p>

            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <Input
                {...register("name")}
                label="Full Name"
                type="text"
                id="name"
                placeholder="e.g., John Michael Doe"
                error={errors.name?.message}
              />

              <Input
                {...register("code", { valueAsNumber: true })}
                label="Student Code"
                type="number"
                id="code"
                placeholder="e.g., 210001"
                error={errors.code?.message}
              />

              <Input
                {...register("email")}
                label="Email Address"
                type="email"
                id="email"
                placeholder="e.g., john.doe@example.com"
                error={errors.email?.message}
              />

              <Input
                {...register("grade", { valueAsNumber: true })}
                label="Grade"
                type="number"
                id="grade"
                placeholder="e.g., 4"
                error={errors.grade?.message}
              />

              {/* buttons */}
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
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow-md transition active:scale-95 disabled:opacity-60"
                >
                  {isSubmitting ? "Adding..." : "Add Student"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Add;
