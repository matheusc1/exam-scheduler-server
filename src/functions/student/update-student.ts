import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { student } from '../../db/schema'

interface UpdateStudentRequest {
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
}: UpdateStudentRequest) {
  await db
    .update(student)
    .set({ name, email, supportCenter })
    .where(eq(student.ra, ra))
}
