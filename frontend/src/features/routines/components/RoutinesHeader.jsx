import PageHeader from "@/components/PageHeader";

export default function RoutinesHeader({ onCreate }) {
  return (
    <PageHeader
      title="Routines"
      description="Build the small rituals that shape your day."
      actionLabel="New Routine"
      onAction={onCreate}
    />
  );
}
