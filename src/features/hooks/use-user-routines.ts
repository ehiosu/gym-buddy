"use client";
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"

export const useUserRoutines = ()=>{
    try{


    const data = useQuery(api.routines.getAll,{});
    const isLoading = data === undefined;
    const isError = data === null;
    return {data, isLoading, isError}
}
catch(err){

    console.error("Error fetching user routines",err);
    return {data:null, isLoading:false, isError:true}
}
}