import NoticeForm from "../../components/NoticeForm";

export default function CreateNotice() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Notice
      </h1>

      <NoticeForm />
    </div>
  );
}