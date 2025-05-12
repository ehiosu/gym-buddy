import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    currentWeight:v.number(),
    targetWeight:v.number(),
    // other "users" fields...
  }).index("email", ["email"]).index("phone", ["phone"]),
  routine:defineTable({
    userId:v.string(),
    routine:v.any(),
    name:v.string(),
    timeline:v.number(),
    sessionDuration:v.number()

  }).index("by_user_id",["userId"]),
  goals: defineTable({
    userId: v.id("users"),
    activeGoals: v.array(v.string()), // e.g. ["weight", "sessions", "water"]
    
    // Dynamic goal values
    weight: v.optional(v.object({
      initial: v.number(),
      current: v.number(),
      target: v.number(),
      
    })),
    
    sessions: v.optional(v.object({
      initial: v.number(),
      current: v.number(),
      target: v.number(),
      completedThisWeek: v.optional(v.number()), // Optional: track weekly progress
    })),
    
    water: v.optional(v.object({
      initial: v.number(),
      current: v.number(),
      target: v.number(),
     
    })),
    
    sleep: v.optional(v.object({
      initial: v.number(),
      current: v.number(),
      target: v.number(),
    })),
    
    steps: v.optional(v.object({
      initial: v.number(),
      current: v.number(),
      target: v.number(),
    })),
    
    bmi: v.optional(v.object({
      initial: v.number(),
      current: v.number(),
      target: v.number(),
    })),
    
    // Metadata
    lastUpdated: v.string(), // ISO date
    activityLevel: v.union(
      v.literal("sedentary"),
      v.literal("moderate"),
      v.literal("active"),
      v.literal("very_active")
    ),
  })
  .index("by_user", ["userId"])
  .index("by_activity_level", ["activityLevel"]),
  
  // Optional: Goal history for tracking progress over time
  goalHistory: defineTable({
    userId: v.id("users"),
    goalId: v.string(),
    value: v.number(),
    date: v.string(),
  })
  .index("by_user_and_goal", ["userId", "goalId"])
  .index("by_date", ["date"]),
  diet:defineTable({
    name:v.string(),
    userId:v.id("users"),
    description:v.string(),
    goal:v.string(),
    calories:v.number(),
    macros:v.any(),
    mealPlan:v.any(),
  }).index("by_user_id",["userId"]),

});
 
export default schema;