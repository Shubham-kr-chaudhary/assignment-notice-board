import Link from "next/link";


type Notice = {
  id: string;
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
};
type Props = {
  notice: Notice;
  onDelete: (id: string) => void;
};

export default function NoticeCard({
  notice,
  onDelete,
}: Props) {
 return (
  <div className="border rounded-lg p-4 shadow">
    <div className="flex justify-between items-start">
      <h2 className="text-xl font-bold">
        {notice.title}
      </h2>

      {notice.priority === "URGENT" && (
        <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
          Urgent
        </span>
      )}
    </div>

    <p className="mt-2">{notice.body}</p>

    <div className="mt-4 text-sm text-gray-500">
      <p>Category: {notice.category}</p>

      <p>
        Publish Date:{" "}
        {new Date(
          notice.publishDate
        ).toLocaleDateString()}
      </p>
    </div>

    <div className="mt-4 flex gap-2">
      <Link
        href={`/notice/edit/${notice.id}`}
        className="bg-yellow-500 text-white px-3 py-2 rounded"
      >
        Edit
      </Link>

      <button
        onClick={() => {
          const confirmed =
            window.confirm(
              "Are you sure you want to delete this notice?"
            );

          if (confirmed) {
            onDelete(notice.id);
          }
        }}
        className="bg-red-500 text-white px-3 py-2 rounded"
      >
        Delete
      </button>
    </div>
  </div>
);
}