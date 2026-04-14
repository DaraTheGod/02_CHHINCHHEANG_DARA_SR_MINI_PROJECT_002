import { toast } from "sonner";

export const toastSuccessTop = (title, description) => {
  toast.success(title, {
    description,
    position: "top-center",
  });
};

export const toastSuccessTopEnd = (title, description) => {
  toast.success(title, {
    description,
    position: "top-right",
  });
};
