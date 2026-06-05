import Link from "next/link";
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
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <p className="text-muted-foreground">
            Loading notice...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Edit Notice
            </h1>

            <p className="mt-2 text-muted-foreground">
              Update the notice information.
            </p>
          </div>

          <Link
            href="/"
            className="
              rounded-lg
              border
              border-border
              px-4
              py-2
              text-sm
              transition
              hover:bg-accent
            "
          >
            Back
          </Link>
        </div>

        <NoticeForm
          initialData={notice}
          isEdit
        />
      </div>
    </div>
  );
}