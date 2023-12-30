import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  unique,
  uuid,
  varchar,
  boolean,
  date
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
  bigList: many(bigListTable),
  usersToWritingTable: many(usersToWritingTable),
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
  bigList: many(bigListTable),
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

export const writingTable = pgTable(
  "writing",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    name: varchar("name").notNull(),
    description: text("description"),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const writingRelations = relations(writingTable, ({ many }) => ({
  usersToWritingTable: many(usersToWritingTable),
}));


export const usersToWritingTable = pgTable(
  "users_to_writing",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    writingId: uuid("writing_id")
      .notNull()
      .references(() => writingTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    userAndDocumentIndex: index("user_and_document_index").on(
      table.userId,
      table.writingId,
    ),
    uniqCombination: unique().on(table.writingId, table.userId),
  }),
);

export const usersToWritingRelations = relations(
  usersToWritingTable,
  ({ one }) => ({
    writing: one(writingTable, {
      fields: [usersToWritingTable.writingId],
      references: [writingTable.displayId],
    }),
    user: one(usersTable, {
      fields: [usersToWritingTable.userId],
      references: [usersTable.displayId],
    }),
  }),
);

export const globalTopicTable = pgTable(
  "global_topic",
  {
    id: serial("id").primaryKey(),
    type: varchar("type", { length: 10000 }).notNull(),
    topic: text("topic").notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.id),
  })
);

export const bigListTable = pgTable(
  "big_list",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    wordIndex: integer("word_index").notNull(),
    learned: boolean("learned").notNull().default(false),
    learnedDate: date("learned_date"),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    userIdIndex: index("user_id_index").on(table.userId),
    wordIndexIndex: index("word_index_index").on(table.wordIndex),
  })
);

export const bigListRelations = relations(bigListTable, ({ one , many}) => ({
  user: one(usersTable, {
    fields: [bigListTable.displayId],
    references: [usersTable.displayId],
  }),
  globalDictionary: one(globalDictionaryTable, {
    fields: [bigListTable.id],
    references: [globalDictionaryTable.id],
  }),
  projects: many(projectsTable),
}));

export const globalDictionaryTable = pgTable(
  "global_dictionary",
  {
    id: serial("id").primaryKey(),
    word: varchar("word", { length: 100 }).notNull(),
    definition: text("definition").notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.id),
  })
);

export const globalDictionaryRelations = relations(globalDictionaryTable, ({ many }) => ({
  bigList: many(bigListTable),
}));

export const bigListToProjectsTable = pgTable(
  "big_list_to_projects",
  {
    id: serial("id").primaryKey(),
    bigListId: uuid("big_list_id")
      .notNull()
      .references(() => bigListTable.displayId, {
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
    bigListAndProjectIndex: index("big_list_and_project_index").on(
      table.bigListId,
      table.projectId,
    ),
    uniqCombination: unique().on(table.bigListId, table.projectId),
  }),
);
export const bigListToProjectsRelations = relations(
  bigListToProjectsTable,
  ({ one }) => ({
    project: one(projectsTable, {
      fields: [bigListToProjectsTable.projectId],
      references: [projectsTable.displayId],
    }),
    bigList: one(bigListTable, {
      fields: [bigListToProjectsTable.bigListId],
      references: [bigListTable.displayId],
    }),
  }),
);
