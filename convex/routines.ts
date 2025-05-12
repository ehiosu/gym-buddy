import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const getAll=query({
    args:{},
    handler:async(ctx)=>{
        if(auth){
            const userId = await auth.getUserId(ctx);
            if(!userId){
                return null
            };
            const routines = await ctx.db.query("routine").withIndex("by_user_id",(q)=>q.eq("userId",userId)).collect();
            return routines
        }
        return null

    }
})
export const create= mutation({
    args:{
         routine:v.any(),
            name:v.string(),
            timeline:v.number(),
            sessionDuration:v.number()
    },
    handler:async(ctx,args)=>{
        const userId = await auth.getUserId(ctx);
        if(!userId){
           return null
        };
        const newRoutine = await ctx.db.insert("routine",{
            userId,
            ...args
        });
        return newRoutine
    }
})