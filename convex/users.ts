import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const updateWeight = mutation({
  args:{newWeight:v.number()},
  handler:async(ctx,args)=>{
     const userId = await auth.getUserId(ctx);
    if (!userId) {
      return null;
    }
    const user = await ctx.db.get(userId);
    if (!user) {
      return null;
    } 
    await ctx.db.patch(userId, {
      currentWeight: args.newWeight,
    });


  }

})