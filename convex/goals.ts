import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const getUsersGoals = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if(!userId){
        return null
    };
    return await ctx.db
      .query("goals")
      .withIndex("by_user",(q) => q.eq("userId", userId)).first();
  },
});
export const add = mutation({
  args:{
    goalId: v.id("goals"),
    activeGoals: v.array(v.string()),
    values: v.any(),
  },handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return null;
    }
    const goal = await ctx.db.get(args.goalId);
    if(!goal) {
      return null;
    };
    const goalData:Record<string,string|string[]|{current:number,target:number,initial:number}> = { userId: userId, activeGoals: args.activeGoals };
    const updatedActiveGoals = goal.activeGoals ? [...goal.activeGoals, ...args.activeGoals] : [...args.activeGoals];
    updatedActiveGoals.forEach((goalId) => {
      goalData[goalId] = {
        current: parseFloat(args.values[`${goalId}_current`]),
        target: parseFloat(args.values[`${goalId}_target`]),
        initial: parseFloat(args.values[`${goalId}_initial`]),
      };
    })
await ctx.db.patch(args.goalId, {
      ...goalData,
      activityLevel:goal.activityLevel,
      lastUpdated: new Date().toISOString(),
      activeGoals: updatedActiveGoals,
  })
}})
export const setup = mutation({
  args: {
    activeGoals: v.array(v.string()),
    values: v.any(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return null;
    }
    // Initialize goals document
    const goalData:Record<string,string|string[]|{current:number,target:number,initial:number}> = { userId: userId, activeGoals: args.activeGoals };

    // Add each goal's values
    args.activeGoals.forEach((goalId) => {
      goalData[goalId] = {
        current: parseFloat(args.values[`${goalId}_current`]),
        target: parseFloat(args.values[`${goalId}_target`]),
        initial: parseFloat(args.values[`${goalId}_initial`]),
      };
    });

    await ctx.db.insert("goals", {...goalData,activityLevel:"sedentary",lastUpdated:new Date().toISOString()} as any);
  },
});

