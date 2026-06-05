import { useState } from "react";
import { useRouter } from "next/router";

type NoticeFormProps = {
  initialData?: {
    id?: string;
    title: string;
    body: string;
    category: string;
    priority: string;
    publishDate: string;
  };
  isEdit?: boolean;
};

export default function NoticeForm({
  initialData,
  isEdit = false,
}: NoticeFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(
    initialData?.title ?? ""
  );

  const [body, setBody] = useState(
    initialData?.body ?? ""
  );

  const [category, setCategory] = useState(
    initialData?.category ?? "GENERAL"
  );

  const [priority, setPriority] = useState(
    initialData?.priority ?? "NORMAL"
  );

  const [publishDate, setPublishDate] =
    useState(
      initialData?.publishDate?.split("T")[0] ??
        ""
    );

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const payload = {
      title,
      body,
      category,
      priority,
      publishDate,
    };

    const response = await fetch(
      isEdit
        ? `/api/notices/${initialData?.id}`
        : "/api/notices",
      {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-4"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) =>
          setBody(e.target.value)
        }
        className="w-full border p-2 rounded"
        rows={5}
        required
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="w-full border p-2 rounded"
      >
        <option value="EXAM">
          Exam
        </option>
        <option value="EVENT">
          Event
        </option>
        <option value="GENERAL">
          General
        </option>
      </select>

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
        className="w-full border p-2 rounded"
      >
        <option value="NORMAL">
          Normal
        </option>
        <option value="URGENT">
          Urgent
        </option>
      </select>

      <input
        type="date"
        value={publishDate}
        onChange={(e) =>
          setPublishDate(e.target.value)
        }
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isEdit
          ? "Update Notice"
          : "Create Notice"}
      </button>
    </form>
  );
}