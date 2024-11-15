import { db } from '../db'
import { eq } from 'drizzle-orm'
import { adminUser, student } from '../db/schema'

export const findUserByEmail = async (email: string) => {
  const [admin] = await db
    .select()
    .from(adminUser)
    .where(eq(adminUser.email, email))
    .limit(1)

  if (admin) return { ...admin, role: admin.role || 'admin' }

  const [studentResult] = await db
    .select()
    .from(student)
    .where(eq(student.email, email))
    .limit(1)

  if (studentResult)
    return { ...studentResult, role: studentResult.role || 'student' }

  return null
}
