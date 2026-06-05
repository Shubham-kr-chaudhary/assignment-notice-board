import Link from "next/link";
import { useEffect, useState } from "react";
import NoticeCard from "../components/NoticeCard";

type Notice = {
  id: string;
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
};

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => {
        setNotices(data);
      })
      .catch(console.error);
  }, []);

  const handleDelete = async (
    id: string
  ) => {
    const response = await fetch(
      `/api/notices/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      setNotices((prev) =>
        prev.filter(
          (notice) => notice.id !== id
        )
      );
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Notice Board
        </h1>

        <Link
          href="/notice/create"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Notice
        </Link>
      </div>

      <div className="grid gap-4 mt-6">
        {notices.map((notice) => (
          <NoticeCard
            key={notice.id}
            notice={notice}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}