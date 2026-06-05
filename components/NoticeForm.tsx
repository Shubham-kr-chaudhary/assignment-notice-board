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
      className="
        mx-auto
        w-full
        max-w-3xl
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-950
        p-6
        shadow-xl
        sm:p-8
      "
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          {isEdit
            ? "Edit Notice"
            : "Create Notice"}
        </h2>

        <p className="mt-2 text-zinc-400">
          {isEdit
            ? "Update the notice information below."
            : "Fill in the details to publish a new notice."}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Title
          </label>

          <input
            type="text"
            placeholder="Enter notice title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-zinc-900
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/20
            "
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            placeholder="Write your notice here..."
            value={body}
            onChange={(e) =>
              setBody(e.target.value)
            }
            rows={8}
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-zinc-900
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/20
            "
            required
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-zinc-700
                bg-zinc-900
                px-4
                py-3
                text-white
              "
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
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-zinc-700
                bg-zinc-900
                px-4
                py-3
                text-white
              "
            >
              <option value="NORMAL">
                Normal
              </option>

              <option value="URGENT">
                Urgent
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Publish Date
          </label>

          <input
            type="date"
            value={publishDate}
            onChange={(e) =>
              setPublishDate(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-zinc-900
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/20
            "
            required
          />
        </div>

        <button
          type="submit"
          className="
            w-full
            rounded-xl
            bg-blue-600
            py-3
            text-base
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          {isEdit
            ? "Update Notice"
            : "Create Notice"}
        </button>
      </div>
    </form>
  );
}