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
  <div className="min-h-screen bg-background">
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Notice Board
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage announcements, events, and important updates.
          </p>
        </div>

        <Link
          href="/notice/create"
className="
inline-flex
items-center
justify-center
rounded-lg
bg-blue-600
px-4
py-2
font-medium
text-white
hover:bg-blue-700
transition
"
        >
          Add Notice
        </Link>
      </div>

      {notices.length === 0 ? (
        <div
          className="
            rounded-2xl
            border
            border-border
            bg-card
            p-10
            text-center
          "
        >
          <h2 className="text-xl font-semibold">
            No notices yet
          </h2>

          <p className="mt-2 text-muted-foreground">
            Create your first notice to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {notices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  </div>
);
}