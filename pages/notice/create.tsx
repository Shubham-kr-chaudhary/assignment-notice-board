import NoticeForm from "../../components/NoticeForm";
import Link from "next/link";

export default function CreateNotice() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Create Notice
            </h1>

            <p className="mt-2 text-muted-foreground">
              Publish a new announcement for users.
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

        <NoticeForm />
      </div>
    </div>
  );
}