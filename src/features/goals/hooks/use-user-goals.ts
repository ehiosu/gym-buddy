import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useUserGoals=()=>{
    const data = useQuery(api.goals.getUsersGoals);
    const isLoading = data === undefined;
    const isError = data === null;
    return {data, isLoading, isError}
}