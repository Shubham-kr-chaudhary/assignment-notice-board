import Link from "next/link";
import DeleteModal from "./DeleteModal";
import { useState } from "react";


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

  const [showDeleteModal, setShowDeleteModal] =useState(false);
 return (
  <div className="bg-card text-card-foreground border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex-1">
        <h2 className="text-xl font-semibold tracking-tight">
          {notice.title}
        </h2>

        <p className="mt-2 text-muted-foreground leading-relaxed">
          {notice.body}
        </p>
      </div>

      {notice.priority === "URGENT" && (
        <span className="w-fit rounded-lg  px-3 py-1 text-xs font-medium  bg-amber-600 text-white">
          Urgent
        </span>
      )}
    </div>

    <div className="mt-5 flex flex-col gap-1 text-sm text-muted-foreground">
      <p>
        <span className="font-medium text-foreground">
          Category:
        </span>{" "}
        {notice.category}
      </p>

      <p>
        <span className="font-medium text-foreground">
          Publish Date:
        </span>{" "}
        {new Date(
          notice.publishDate
        ).toLocaleDateString()}
      </p>
    </div>

    <div className="mt-6 flex flex-col gap-2 sm:flex-row">
 <Link
  href={`/notice/edit/${notice.id}`}
  className="
    flex-1
    inline-flex
    items-center
    justify-center
    rounded-lg
    bg-blue-600
    px-4
    py-2
    text-sm
    font-medium
    text-white
    transition
    hover:bg-blue-700
  "
>
        Edit Notice
      </Link>
<button
  onClick={() =>
    setShowDeleteModal(true)
  }
  className="
    flex-1
    rounded-lg
    bg-red-600
    px-4
    py-2
    font-medium
    text-white
    transition
    hover:bg-red-700
  "
>
  Delete
</button>
<DeleteModal
  open={showDeleteModal}
  onClose={() =>
    setShowDeleteModal(false)
  }
  onConfirm={() => {
    onDelete(notice.id);
    setShowDeleteModal(false);
  }}
/>
    </div>
    
  </div>
);
}