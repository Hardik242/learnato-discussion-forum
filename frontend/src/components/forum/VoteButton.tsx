import { ArrowBigUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VoteButtonProps {
  votes: number;
  isVoted: boolean;
  onVote: () => void;
  disabled?: boolean;
}

export function VoteButton({ votes, isVoted, onVote, disabled }: VoteButtonProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={onVote}
        disabled={disabled}
        className={cn(
          "h-auto p-2 hover:bg-accent/50 transition-all",
          isVoted && "text-accent hover:text-accent"
        )}
      >
        <ArrowBigUp 
          className={cn(
            "h-6 w-6 transition-all",
            isVoted ? "fill-accent" : "fill-transparent"
          )} 
        />
      </Button>
      <span className={cn(
        "font-bold text-lg tabular-nums",
        isVoted ? "text-accent" : "text-muted-foreground"
      )}>
        {votes}
      </span>
    </div>
  );
}
