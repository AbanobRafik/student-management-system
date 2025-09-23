import { Link, useNavigate, useParams } from "react-router";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EditSchema = z.object({
  name: z
    .string()
    .regex(
      /^[A-Z][a-z]+(?:\s[A-Z][a-z]+){2}$/,
      "Name must have three words, each starting with a capital letter"
    ),
  code: z.number().min(100000).max(999999),
  email: z.string().email(),
  grade: z.number().min(1).max(6),
});

const Edit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(EditSchema) });

  const { code } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const Navigate = useNavigate();

  // Load current student data
  useEffect(() => {
    const loadStudentData = async () => {
      try {
        const { data } = await axios.get(
          `https://student-management-rho.vercel.app/api/student/${code}`
        );
        reset({
          name: data.name,
          code: data.code,
          email: data.email,
          grade: data.grade,
        });
      } catch (err) {
        toast.error("Failed to load student data");
      } finally {
        setLoading(false);
      }
    };
    loadStudentData();
  }, [code, reset]);

  const onSubmit = async (data) => {
    console.log("Submitting", data);
    try {
      setSaving(true);
      const response = await axios.put(
        `https://student-management-rho.vercel.app/api/update/student/${code}`,
        {
          ...data,
          code: Number(data.code),
          grade: Number(data.grade),
        }
      );
      if (response.status === 200) {
        toast.success("Student updated successfully!", {
          position: "top-center",
        });
      }
      Navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add student", {
        position: "top-right",
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      setSaving(false);
    }
  };

  // Show a loader while fetching data
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-gray-600">Loading student data…</p>
      </div>
    );
  }

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
                error={errors.name?.message}
              />
              <Input
                {...register("code", { valueAsNumber: true })}
                label="Student Code"
                type="text"
                error={errors.code?.message}
                disabled
              />
              <Input
                {...register("email")}
                label="Email Address"
                type="email"
                error={errors.email?.message}
              />
              <Input
                {...register("grade", { valueAsNumber: true })}
                label="Grade"
                type="number"
                min="1"
                max="6"
                error={errors.grade?.message}
              />

              <div className="flex justify-end gap-3 pt-2">
                <Link to="/">
                  <Button type="button" variant="outline" disabled={saving}>
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow-md transition active:scale-95"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Edit Student"}
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
