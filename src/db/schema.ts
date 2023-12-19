import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  serial,
  text,
  unique,
  uuid,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    hashedPassword: varchar("hashed_password", { length: 100 }),
    provider: varchar("provider", {
      length: 100,
      enum: ["github", "credentials"],
    })
      .notNull()
      .default("credentials"),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
  }),
);

export const usersRelations = relations(usersTable, ({ many }) => ({
  usersToProjectsTable: many(usersToProjectsTable),
}));

export const projectsTable = pgTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const projectsRelations = relations(projectsTable, ({ many }) => ({
  usersToProjectsTable: many(usersToProjectsTable),
  tasks: many(tasksTable),
}));

export const usersToProjectsTable = pgTable(
  "users_to_projects",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projectsTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    userAndDocumentIndex: index("user_and_document_index").on(
      table.userId,
      table.projectId,
    ),
    // This is a unique constraint on the combination of userId and documentId.
    // This ensures that there is no duplicate entry in the table.
    uniqCombination: unique().on(table.projectId, table.userId),
  }),
);

export const usersToProjectsRelations = relations(
  usersToProjectsTable,
  ({ one }) => ({
    project: one(projectsTable, {
      fields: [usersToProjectsTable.projectId],
      references: [projectsTable.displayId],
    }),
    user: one(usersTable, {
      fields: [usersToProjectsTable.userId],
      references: [usersTable.displayId],
    }),
  }),
);

export const tasksTable = pgTable(
  "tasks",
  {
    id: serial("id").primaryKey(),
    completed: boolean("completed").notNull().default(false),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    title: varchar("title", { length: 100 }).notNull(),
    description: text("description"),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projectsTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    projectIdIndex: index("project_id_index").on(table.projectId),
  }),
);

export const tasksRelations = relations(tasksTable, ({ one }) => ({
  project: one(projectsTable, {
    fields: [tasksTable.projectId],
    references: [projectsTable.displayId],
  }),
}));
