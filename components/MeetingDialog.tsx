import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { ReactNode } from "react";
import { View } from "react-native";

type MeetingDialogProps = {
  isOpen?: boolean;
  onClose?: (val: boolean) => void;
  title?: string;
  description?: string;
  onActionClick?: () => void;
  children?: ReactNode;
}

export function MeetingDialog({ title, description, isOpen, onClose, children }: MeetingDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title || "Meeting Dialog"}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children && (
          <View>
            {children}
          </View>
        )}
      </DialogContent>
    </Dialog>
  )
}