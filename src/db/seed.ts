import { faker } from '@faker-js/faker'
import chalk from 'chalk'
import { client, db } from '.'
import {
  album,
  albumMusic,
  artist,
  music,
  musicArtist,
  musicPlaylist,
  playlist,
  user,
} from './schema'

async function seed() {
  await db.delete(user)
  await db.delete(artist)
  await db.delete(album)
  await db.delete(albumMusic)
  await db.delete(playlist)
  await db.delete(music)
  await db.delete(musicArtist)
  await db.delete(musicPlaylist)

  console.log(chalk.yellowBright('✅ Database reset!'))

  const users = await db
    .insert(user)
    .values([
      {
        name: faker.person.firstName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.firstName(),
        email: faker.internet.email(),
      },
    ])
    .returning()

  console.log(chalk.yellowBright('✅ Created users!'))

  const artists = await db
    .insert(artist)
    .values([
      {
        name: faker.person.firstName(),
        birthday: faker.date.birthdate(),
      },
      {
        name: faker.person.lastName(),
        birthday: faker.date.birthdate(),
      },
    ])
    .returning()

  console.log(chalk.yellowBright('✅ Created artists!'))

  const albums = await db
    .insert(album)
    .values([
      {
        title: faker.commerce.productName(),
        artistId: artists[0].id,
        launchDate: faker.date.future(),
      },
      {
        title: faker.commerce.productName(),
        artistId: artists[1].id,
        launchDate: faker.date.future(),
      },
    ])
    .returning()

  console.log(chalk.yellowBright('✅ Created albums!'))

  const musics = await db.insert(music).values([
    {
      title: faker.commerce.productName(),
      duration: faker.number.int({ min: 1, max: 100 }),
    },
    {
      title: faker.commerce.productName(),
      duration: faker.number.int({ min: 1, max: 100 }),
    }
  ])

  console.log(chalk.yellowBright('✅ Created musics!'))
}

seed().finally(() => {
  client.end()
})
