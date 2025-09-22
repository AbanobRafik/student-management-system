import Button from "./ui/Button";
import { Link } from "react-router";

const UserTable = () => {
  return (
    <section className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Student Dashboard
          </h1>
          <p className="text-gray-500">Overview of all enrolled students</p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search students..."
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          />
          <Link to="/add">
            <Button variant="primary">Add Student</Button>
          </Link>
        </div>
      </header>

      {/* Table Card */}
      <div className="overflow-x-auto rounded-2xl bg-white shadow-xl">
        <table className="w-full table-auto border-collapse text-center">
          <thead>
            <tr className="bg-indigo-600 text-white uppercase text-sm tracking-wider">
              <th className="py-4 px-6 text-center">Name</th>
              <th className="py-4 px-6 text-center">Code</th>
              <th className="py-4 px-6 text-center">Email</th>
              <th className="py-4 px-6 text-center">Grade</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
              <td className="py-3 px-6 text-center font-medium text-gray-800 whitespace-normal break-words max-w-xs">
                Abanob Rafik Fouad
              </td>
              <td className="py-3 px-6 text-center text-gray-700 whitespace-normal break-words max-w-xs">
                210001
              </td>
              <td className="py-3 px-6 text-center text-indigo-600 underline whitespace-normal break-words max-w-xs">
                abanob@example.com
              </td>
              <td className="py-3 px-6 text-center">
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  4
                </span>
              </td>
              <td className="py-3 px-6 text-center space-x-3">
                <Link to="/edit">
                  <Button variant="warning">Edit</Button>
                </Link>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserTable;
