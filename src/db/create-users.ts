import argon2 from 'argon2'
import { db } from './index'
import { adminUser } from './schema'

type Role = 'admin' | 'coordinator' | 'student'

async function createUsers() {
  const users = [
    {
      email: 'unifaa@admin.com',
      password: 'unifaa-admin',
      role: 'admin' as Role,
    },
    {
      email: 'unifaa@coordination.com',
      password: 'unifaa-coordination',
      role: 'coordinator' as Role,
    },
  ]

  try {
    await db.delete(adminUser)

    for (const user of users) {
      const hashedPassword = await argon2.hash(user.password)
      await db.insert(adminUser).values({
        email: user.email,
        password: hashedPassword,
        role: user.role,
      })
      console.log(`Usuário ${user.email} criado com sucesso.`)
    }
  } catch (error) {
    console.error('Erro ao criar usuários:', error)
  }
}

createUsers()
