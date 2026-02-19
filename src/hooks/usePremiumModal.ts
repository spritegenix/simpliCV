import { create } from "zustand";

interface PremiumModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const usePremiumModal = create<PremiumModalState>((set) => ({
  open: false,
  setOpen: (open: boolean) => {
    // TEMPORARY: Bypass for testing - remove this to re-enable premium checks
    if (open) {
      console.log("Premium modal blocked for testing");
      return;
    }
    console.log("PremiumModal State Changed:", open);
    set({ open });
  },
}));

export default usePremiumModal;
