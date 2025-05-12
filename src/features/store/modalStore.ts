import {create} from 'zustand'
type modalType="create-routine"|"create-goal"|"delete-routine"|"add-goal-record"|"create-diet"|"delete-goal"|"edit-goal"|null
type modalStore = {
    isOpen:boolean,
    modalType:modalType|null,
    setModalType:(modalType:modalType|null)=>void,
    setIsOpen:(isOpen:boolean)=>void
}


const useModalStore = create<modalStore>((set)=>({
    isOpen:false,
    modalType:null,
    setModalType:(modalType)=>set({modalType}),
    setIsOpen:(isOpen)=>set({isOpen})
}))
export default useModalStore

