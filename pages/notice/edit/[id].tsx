import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NoticeForm from "../../../components/NoticeForm";

type Notice = {
  id: string;
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
};

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;

  const [notice, setNotice] =
    useState<Notice | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/notices/${id}`)
      .then((res) => res.json())
      .then((data) => setNotice(data));
  }, [id]);

  if (!notice) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Notice
      </h1>

      <NoticeForm
        initialData={notice}
        isEdit
      />
    </div>
  );
}