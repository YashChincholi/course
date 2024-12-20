import {
  pgTable,
  serial,
  varchar,
  json,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const CourseList = pgTable("CourseList", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(),
  level: varchar("level").notNull(),
  includeVideo: varchar("includeVideo").notNull().default("Yes"),
  noOfChapters: integer("noOfChapters").notNull().default(3),
  courseOutput: json("courseOutput").notNull(),
  createdBy: varchar("createdBy").notNull(),
  userName: varchar("userName"),
  userProfileImage: varchar("userProfileImage"),
  banner: varchar("banner"),
  publish: boolean("publish").default(false),
});

export const Chapters = pgTable("Chapters", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  chapterId: varchar("chapterId").notNull(),
  content: json("content").notNull(),
  videoId: varchar("videoId"),
});
