import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const create = mutation({
    args:{
        name:v.string(),
        description:v.string(),
        goal:v.string(),
        calories:v.number(),
        macros:v.any(),
        mealPlan:v.any()
    },
    handler:async(ctx,args)=>{
        const userId = await auth.getUserId(ctx);
        if(!userId){
            return null;
        };
         await ctx.db.insert("diet",{userId,...args});
        return;
    }
})

export const get=query({
    args:{},
    handler:async(ctx)=>{
        const userId = await auth.getUserId(ctx);
        if(!userId){
            return null;
        };
        const diet = await ctx.db.query("diet").withIndex("by_user_id",(q)=>q.eq("userId",userId)).first();
        return diet;
    }
})