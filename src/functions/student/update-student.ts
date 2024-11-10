import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { student } from '../../db/schema'

interface updateStudentRequest {
  ra: string
  name: string
  email: string
  supportCenter: string
}

export async function updateStudent({
  ra,
  name,
  email,
  supportCenter,
}: updateStudentRequest) {
  await db
    .update(student)
    .set({ name, email, supportCenter })
    .where(eq(student.ra, ra))
}
