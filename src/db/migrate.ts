import chalk from 'chalk'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import { env } from '../env'

async function startMigrations() {
  console.log(chalk.greenBright('Starting migrations...'))
  const connection = postgres(env.DATABASE_URL, { max: 1 })
  const db = drizzle(connection)
  await migrate(db, { migrationsFolder: 'migrations' })

  console.log(chalk.greenBright('Migrations applied successfully!✅'))

  await connection.end()
}

startMigrations().finally(() => {
  process.exit(0)
})
