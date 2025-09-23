import { Link } from "react-router";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Add = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data submitted");
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

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <Input
                label="Full Name"
                type="text"
                id="name"
                name="name"
                placeholder="e.g., John Doe"
                required
              />
              <Input
                label="Student Code"
                type="text"
                id="code"
                name="code"
                placeholder="e.g., 210001"
                required
              />
              <Input
                label="Email Address"
                type="email"
                id="email"
                name="email"
                placeholder="e.g., john.doe@example.com"
                required
              />
              <Input
                label="Grade"
                type="number"
                id="grade"
                name="grade"
                placeholder="e.g., 4"
                min="1"
                max="12"
                required
              />

              {/* Buttons */}
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
                  Add Student
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
