"use client";
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api";

export const useCurrentUser = ()=>{
    const user = useQuery(api.users.currentUser,undefined);
    const isLoading = user === undefined;
    const isError = user === null;
    return {isLoading, isError, user}
}