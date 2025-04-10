import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type AlertDialogProps = {
  title: string;
  onConfirm: () => void;
  children?: React.ReactNode;
};

const DeleteAlertDialog = ({
  title,
  onConfirm,
  children,
}: AlertDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="destructive" className="rounded-full">
            Delete all
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {title} and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
          <Button
            variant={"destructive"}
            onClick={onConfirm}
            className="rounded-full"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
