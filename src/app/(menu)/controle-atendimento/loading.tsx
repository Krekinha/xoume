import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="mt-14">
      <LoadingSkeleton model={1} />
    </div>
  );
}
