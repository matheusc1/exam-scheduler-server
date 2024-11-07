import {
  pgTable,
  text,
  integer,
  date,
  pgEnum,
  time,
  index,
  timestamp,
  primaryKey
} from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

const rolesEnum = pgEnum('roles', ['admin', 'coordinator', 'student'])
const examEnum = pgEnum('type', ['mandatory', 'substitute'])

export const adminUser = pgTable('admin_user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: rolesEnum(),
})

export const student = pgTable(
  'student',
  {
    id: text('id').$defaultFn(() => createId()),
    ra: text('ra').notNull().unique(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    birthDate: date('birth_date', { mode: 'date' }).notNull(),
    supportCenter: text('support-center_id')
      .notNull()
      .references(() => supportCenter.id),
    role: rolesEnum().default('student'),
  },
  t => {
    return [primaryKey({ columns: [t.id, t.ra] })]
  }
)

export const period = pgTable('period', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  startDate: date('start_date', { mode: 'date' }).notNull(),
  endDate: date('end_date', { mode: 'date' }).notNull(),
})

export const discipline = pgTable('discipline', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
})

export const enrollment = pgTable('enrollment', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  studentId: text('student_id')
    .notNull()
    .references(() => student.ra),
  disciplineId: text('discipline_id')
    .notNull()
    .references(() => discipline.id),
  periodId: text('period_id')
    .notNull()
    .references(() => period.id),
})

export const examSchedule = pgTable(
  'exam_schedule',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    enrollmentId: text('enrollment_id')
      .notNull()
      .references(() => enrollment.id),
    type: examEnum(),
    scheduledDate: timestamp('scheduled_date', { withTimezone: true }),
  },
  t => [index('exam_enrollment_type_idx').on(t.enrollmentId, t.type)]
)

export const supportCenter = pgTable('support_center', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull().unique(),
  numberOfComputers: integer('number_of_computers').notNull(),
})

export const supportCenterOperatingHours = pgTable(
  'support_center_operating_hours',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    supportCenter: text('support_center_id').references(() => supportCenter.id),
    weekDay: integer('week_day').notNull(),
    openTime: time('open_time').notNull(),
    closeTime: time('close_time').notNull(),
  }
)

export const availableSlots = pgTable('available_slots', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  date: date('date', { mode: 'date' }).notNull(),
  time: time('time').notNull(),
  availableSlots: integer('available_slots').notNull(),
  supportCenter: text('support_center_id')
    .notNull()
    .references(() => supportCenter.id),
})
