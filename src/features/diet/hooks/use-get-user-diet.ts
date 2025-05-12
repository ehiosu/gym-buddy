import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useUserDiet = ()=>{
    const userDiets = useQuery(api.diet.get);
    const isLoading  = userDiets === undefined;
    const isError = userDiets === null;
    return {userDiets,isLoading,isError}
}