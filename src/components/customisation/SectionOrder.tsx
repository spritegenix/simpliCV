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
}

interface SortableItemProps {
  id: string;
  title: string;
}

function SortableItem({ id, title }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

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
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex flex-1 items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-muted">
          <span className="text-xs font-medium">
            {title.substring(0, 2).toUpperCase()}
          </span>
        </div>
        <span className="text-sm font-medium">{title}</span>
      </div>
    </div>
  );
}

export default function SectionOrder({
  sectionOrder,
  setSectionOrder,
}: SectionOrderProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
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
    <Card>
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
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}
