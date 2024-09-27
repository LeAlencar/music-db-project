import chalk from 'chalk'
import { client, db } from '.'
import { artist, user } from './schema'

async function seed() {
  await db.delete(user)
  await db.delete(artist)

  console.log(chalk.yellowBright('✅ Database reset!'))

  console.log(chalk.yellowBright('✅ Created customers!'))
}

seed().finally(() => {
  client.end()
})
