import { useState, useEffect } from "react";
import Button from "./ui/Button";
import { Link } from "react-router";
import axios from "axios";

const UserTable = () => {
  const [students, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await axios.get(
          "https://student-management-rho.vercel.app/api/students"
        );
        setStudent(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 p-4 sm:p-8">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Student Dashboard
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Overview of all enrolled students
          </p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Link to="/add">
            <Button variant="primary">Add Student</Button>
          </Link>
        </div>
      </header>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto rounded-2xl bg-white shadow-xl">
        <table className="min-w-[600px] w-full border-collapse text-center text-sm sm:text-base">
          <thead>
            <tr className="bg-indigo-600 text-white uppercase tracking-wider">
              <th className="py-3 px-4 sm:py-4 sm:px-6">Name</th>
              <th className="py-3 px-4 sm:py-4 sm:px-6">Code</th>
              <th className="py-3 px-4 sm:py-4 sm:px-6">Email</th>
              <th className="py-3 px-4 sm:py-4 sm:px-6">Grade</th>
              <th className="py-3 px-4 sm:py-4 sm:px-6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="py-6 text-gray-600 font-medium">
                  Loading students...
                </td>
              </tr>
            )}

            {error && !loading && (
              <tr>
                <td colSpan="5" className="py-6 text-red-500">
                  {error}
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              students.map((student) => (
                <tr
                  key={student._id || student.code}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 sm:py-4 sm:px-6 break-words max-w-xs font-medium text-gray-800">
                    {student.name}
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6 break-words">
                    {student.code}
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6 break-words text-indigo-600 underline">
                    {student.email}
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      {student.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6 space-x-2">
                    <div className="flex md:gap-3 gap:2 justify-center items-center">
                      <Link to="/edit">
                        <Button variant="warning" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Button variant="danger" size="sm">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserTable;
