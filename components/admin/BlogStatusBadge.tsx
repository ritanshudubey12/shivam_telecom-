import { Badge } from "@/components/ui/badge";
import { titleCase } from "@/lib/utils";
import type { BlogStatus } from "@prisma/client";

const statusVariant: Record<BlogStatus, "default" | "outline" | "signal" | "success" | "muted"> = {
  DRAFT: "muted",
  PUBLISHED: "success",
};

export function BlogStatusBadge({ status }: { status: BlogStatus }) {
  return <Badge variant={statusVariant[status]}>{titleCase(status)}</Badge>;
}
