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
          <Button
            // variant="outline"
            className={className}
          >
            {title}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-buttonOrange">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
