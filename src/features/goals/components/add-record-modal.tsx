"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useModalStore from "@/features/store/modalStore";
import { ChartBarIcon, ListOrderedIcon } from "lucide-react";

export const AddRecordModal=()=>{
    const {modalType,setModalType}=useModalStore();
    return(
        <Dialog open={modalType === "add-goal-record"} onOpenChange={(open) => {
            if (!open) {
                setModalType(null);
            }}}>
             <DialogContent className="bg-white rounded-lg shadow-xl max-w-md">
    <DialogHeader className="border-b border-gray-100 pb-4">
      <DialogTitle className="text-lg font-semibold">Log Progress</DialogTitle>
    </DialogHeader>
    
    <div className="space-y-5 pt-2">
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Value</label>
            <input
              type="number"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full py-2.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 active:bg-gray-700 transition-colors"
        >
          Add Record
        </button>
      </form>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-800">Recent History</h3>
          <div className="flex gap-1">
            <button
              className={`p-1.5 rounded-md ${false ? 'bg-gray-100' : 'hover:bg-gray-50'} transition`}
              title="Chart view"
            >
              <ChartBarIcon className="w-4 h-4 text-gray-600" />
            </button>
            <button
              className={`p-1.5 rounded-md ${false ? 'bg-gray-100' : 'hover:bg-gray-50'} transition`}
              title="List view"
            >
              <ListOrderedIcon className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 h-40">
          {/* Placeholder for chart/list view */}
          <div className="flex items-center justify-center h-full text-gray-400">
            <p className="text-sm">Progress history will appear here</p>
          </div>
        </div>
      </div>
    </div>
  </DialogContent>
        </Dialog>
    )
}