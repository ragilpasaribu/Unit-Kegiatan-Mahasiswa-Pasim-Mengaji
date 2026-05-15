import { useEffect, useState } from "react";
import { getPendingUsers, approveUser, rejectUser } from "../../service/adminService";

export default function Admin() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await getPendingUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (id) => {
    await approveUser(id);
    fetchUsers();
  };

  const handleReject = async (id) => {
    await rejectUser(id);
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Pending</h1>

      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 border rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm">{user.programStudi}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleApprove(user.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => handleReject(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}