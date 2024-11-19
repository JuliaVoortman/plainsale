import { 
  pgTable,
  text,
  timestamp,
  uuid,
  json,
  boolean
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  settings: json('settings'),
  customDomain: text('custom_domain')
});

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  orgId: uuid('org_id').references(() => organizations.id).notNull(),
  role: text('role').notNull().default('user'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const dealRooms = pgTable('deal_rooms', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  orgId: uuid('org_id').references(() => organizations.id).notNull(),
  ownerId: uuid('owner_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  isArchived: boolean('is_archived').default(false)
});

export const resources = pgTable('resources', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  url: text('url').notNull(),
  dealRoomId: uuid('deal_room_id').references(() => dealRooms.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const dealRoomRelations = relations(dealRooms, ({ one, many }) => ({
  owner: one(users, {
    fields: [dealRooms.ownerId],
    references: [users.id],
  }),
  resources: many(resources),
  organization: one(organizations, {
    fields: [dealRooms.orgId],
    references: [organizations.id],
  }),
}));

export const userRelations = relations(users, ({ one }) => ({
  organization: one(organizations, {
    fields: [users.orgId],
    references: [organizations.id],
  }),
}));