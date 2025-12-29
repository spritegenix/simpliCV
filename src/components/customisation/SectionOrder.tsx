import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SectionOrderProps {
  sectionOrder: { key: string; title: string }[];
  setSectionOrder: (sections: { key: string; title: string }[]) => void;
  styleId?: string;
}

interface SortableItemProps {
  id: string;
  title: string;
  isDisabled?: boolean;
}

function SortableItem({ id, title, isDisabled }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: isDisabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent/50"
    >
      <div
        {...attributes}
        {...listeners}
        className={
          isDisabled
            ? "cursor-not-allowed"
            : "cursor-grab active:cursor-grabbing"
        }
      >
        <GripVertical
          className={`h-5 w-5 ${isDisabled ? "text-muted-foreground/30" : "text-muted-foreground"}`}
        />
      </div>
      <div className="flex flex-1 items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-muted">
          <span className="text-xs font-medium">
            {title.substring(0, 2).toUpperCase()}
          </span>
        </div>
        <span
          className={`text-sm font-medium ${isDisabled ? "text-muted-foreground/50" : ""}`}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

export default function SectionOrder({
  sectionOrder,
  setSectionOrder,
  styleId,
}: SectionOrderProps) {
  // Templates that support section ordering
  const supportedTemplates = ["modern2", "modern5"];
  const isDisabled = !styleId || !supportedTemplates.includes(styleId);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    if (isDisabled) return; // Prevent reordering for disabled templates

    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSectionOrder(
        arrayMove(
          sectionOrder,
          sectionOrder.findIndex((item) => item.key === active.id),
          sectionOrder.findIndex((item) => item.key === over.id),
        ),
      );
    }
  }

  return (
    <Card className={isDisabled ? "cursor-not-allowed opacity-50" : ""}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Change Section Order
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sectionOrder.map((section) => section.key)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {sectionOrder.map((section) => (
                <SortableItem
                  key={section.key}
                  id={section.key}
                  title={section.title}
                  isDisabled={isDisabled}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}
