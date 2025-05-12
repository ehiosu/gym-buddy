"use client"
import { Dialog } from "@/components/ui/dialog";
import useModalStore from "@/features/store/modalStore";
import { GoalSetupModal } from "./goal-setup";

export const CreateGoalDialog = () => {
const { isOpen, setModalType,modalType } = useModalStore();
return(
    <Dialog open={isOpen||modalType==="create-goal"} onOpenChange={(open)=>setModalType(isOpen?"create-goal":open?"create-goal":null)}>
    <GoalSetupModal/>
</Dialog>
)
}