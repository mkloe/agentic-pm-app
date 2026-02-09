import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROLE_LABELS } from "@/lib/constants";
import { getInitials } from "@/lib/utils";
import type { TeamMember } from "@/types";

interface MemberCardProps {
  member: TeamMember;
  taskCount: number;
  storyPoints: number;
}

export function MemberCard({ member, taskCount, storyPoints }: MemberCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700">
            {getInitials(member.name)}
          </div>
          <div className="flex-1">
            <p className="font-medium text-zinc-900">{member.name}</p>
            <p className="text-xs text-zinc-500">{member.email}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {ROLE_LABELS[member.role]}
          </Badge>
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span>{taskCount} tasks</span>
            <span>{storyPoints} SP</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
