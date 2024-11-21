import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TooltipDemo({ title, content, className }) {
  return (
    <TooltipProvider clasName="">
      <Tooltip clasName="">
        <TooltipTrigger asChild>
          <div
            // variant="outline"
            className={className}
          >
            {title}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-buttonOrange text-zinc-100">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
