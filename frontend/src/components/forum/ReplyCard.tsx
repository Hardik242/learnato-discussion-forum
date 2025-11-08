import { Card } from '@/components/ui/card';
import { Reply } from '@/types';
import { User, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ReplyCardProps {
  reply: Reply;
}

export function ReplyCard({ reply }: ReplyCardProps) {
  return (
    <Card className="p-4 bg-muted/30">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-sm">{reply.authorUsername}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</span>
            </div>
          </div>
          
          <p className="text-sm whitespace-pre-wrap break-words">{reply.content}</p>
        </div>
      </div>
    </Card>
  );
}
