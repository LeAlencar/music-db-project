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
  try {
    await db.delete(albumMusic)
    await db.delete(musicArtist)
    await db.delete(musicPlaylist)
    await db.delete(user)
    await db.delete(album)
    await db.delete(artist)
    await db.delete(playlist)
    await db.delete(music)

    console.log(chalk.yellowBright('✅ Database reset!'))
  } catch (err) {
    console.log(chalk.redBright('❌ Error reseting database!'))
  }

  // Hardcoded data
  const users = await db
    .insert(user)
    .values([
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
      { name: 'Bob Johnson', email: 'bob@example.com' },
    ])
    .returning()

  console.log(chalk.yellowBright('✅ Created users!'))

  const artists = await db
    .insert(artist)
    .values([
      { name: 'The Beatles', birthday: new Date('1960-08-01') },
      { name: 'Queen', birthday: new Date('1970-06-27') },
      { name: 'Pink Floyd', birthday: new Date('1965-01-01') },
      { name: 'John Lennon', birthday: new Date('1940-10-09') },
      { name: 'David Gilmour', birthday: new Date('1946-03-06') },
      { name: 'Paul McCartney', birthday: new Date('1942-06-18') },
      { name: 'Freddie Mercury', birthday: new Date('1946-09-05') },
    ])
    .returning()

  console.log(chalk.yellowBright('✅ Created artists!'))

  const albums = await db
    .insert(album)
    .values([
      {
        title: 'Abbey Road',
        artistId: artists[0].id,
        launchDate: new Date('1969-09-26'),
      },
      {
        title: 'A Night at the Opera',
        artistId: artists[1].id,
        launchDate: new Date('1975-11-21'),
      },
      {
        title: 'Dark Side of the Moon',
        artistId: artists[2].id,
        launchDate: new Date('1973-03-01'),
      },
      {
        title: 'Imagine',
        artistId: artists[3].id,
        launchDate: new Date('1971-09-09'),
      },
      {
        title: 'On an Island',
        artistId: artists[4].id,
        launchDate: new Date('2006-03-06'),
      },
      {
        title: 'McCartney III',
        artistId: artists[5].id,
        launchDate: new Date('2020-12-18'),
      },
      {
        title: 'Mr. Bad Guy',
        artistId: artists[6].id,
        launchDate: new Date('1985-04-29'),
      },
    ])
    .returning()

  console.log(chalk.yellowBright('✅ Created albums!'))

  const musics = await db
    .insert(music)
    .values([
      { title: 'teste', duration: 120 },
      { title: 'Come Together', duration: 259 },
      { title: 'Something', duration: 183 },
      { title: 'Bohemian Rhapsody', duration: 354 },
      { title: 'Love of My Life', duration: 219 },
      { title: 'Money', duration: 382 },
      { title: 'Time', duration: 421 },
      { title: 'Imagine', duration: 183 },
      { title: 'Gimme Some Truth', duration: 196 },
      { title: 'On an Island', duration: 414 },
      { title: 'Take a Breath', duration: 349 },
      { title: 'Find My Way', duration: 206 },
      { title: 'Pretty Boys', duration: 183 },
      { title: 'I Was Born to Love You', duration: 209 },
      { title: 'Made in Heaven', duration: 248 },
    ])
    .returning()

  console.log(chalk.yellowBright('✅ Created musics!'))

  const playlists = await db
    .insert(playlist)
    .values([
      { title: 'Top 50', userId: users[0].id },
      { title: 'Rock Classics', userId: users[1].id },
      { title: 'Chill Vibes', userId: users[2].id },
    ])
    .returning()

  console.log(chalk.yellowBright('✅ Created playlists!'))

  await db.insert(musicArtist).values([
    { musicId: musics[0].id, artistId: artists[0].id },
    { musicId: musics[1].id, artistId: artists[0].id },
    { musicId: musics[2].id, artistId: artists[1].id },
    { musicId: musics[3].id, artistId: artists[1].id },
    { musicId: musics[4].id, artistId: artists[2].id },
    { musicId: musics[5].id, artistId: artists[2].id },
    { musicId: musics[6].id, artistId: artists[3].id },
    { musicId: musics[7].id, artistId: artists[3].id },
    { musicId: musics[8].id, artistId: artists[4].id },
    { musicId: musics[9].id, artistId: artists[4].id },
    { musicId: musics[10].id, artistId: artists[5].id },
    { musicId: musics[11].id, artistId: artists[5].id },
    { musicId: musics[12].id, artistId: artists[6].id },
    { musicId: musics[13].id, artistId: artists[6].id },
  ])

  console.log(chalk.yellowBright('✅ Created music-artist relationships!'))

  await db.insert(musicPlaylist).values([
    { musicId: musics[0].id, playlistId: playlists[0].id },
    { musicId: musics[2].id, playlistId: playlists[0].id },
    { musicId: musics[4].id, playlistId: playlists[0].id },
    { musicId: musics[6].id, playlistId: playlists[0].id },
    { musicId: musics[0].id, playlistId: playlists[1].id },
    { musicId: musics[1].id, playlistId: playlists[1].id },
    { musicId: musics[2].id, playlistId: playlists[1].id },
    { musicId: musics[3].id, playlistId: playlists[1].id },
    { musicId: musics[4].id, playlistId: playlists[1].id },
    { musicId: musics[5].id, playlistId: playlists[1].id },
    { musicId: musics[6].id, playlistId: playlists[2].id },
    { musicId: musics[8].id, playlistId: playlists[2].id },
    { musicId: musics[10].id, playlistId: playlists[2].id },
    { musicId: musics[12].id, playlistId: playlists[2].id },
  ])

  console.log(chalk.yellowBright('✅ Created music-playlist relationships!'))

  await db.insert(albumMusic).values(
    albums.flatMap(album =>
      musics
        .map(music => ({
          albumId: album.id,
          musicId: music.id,
        }))
    )
  )

  console.log(chalk.yellowBright('✅ Created album-music relationships!'))

  // Add some random data
  for (let i = 0; i < 10; i++) {
    await db.insert(user).values({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    })
  }

  for (let i = 0; i < 5; i++) {
    await db.insert(artist).values({
      name: faker.person.fullName(),
      birthday: faker.date.past(),
    })
  }

  for (let i = 0; i < 10; i++) {
    await db.insert(album).values({
      title: faker.music.songName(),
      artistId: artists[Math.floor(Math.random() * artists.length)].id,
      launchDate: faker.date.past(),
    })
  }

  for (let i = 0; i < 20; i++) {
    await db.insert(music).values({
      title: faker.music.songName(),
      duration: faker.number.int({ min: 120, max: 300 }),
    })
  }

  for (let i = 0; i < 5; i++) {
    await db.insert(playlist).values({
      title: faker.lorem.words(3),
      userId: users[Math.floor(Math.random() * users.length)].id,
    })
  }

  console.log(chalk.yellowBright('✅ Added random data!'))
}

seed().finally(() => {
  client.end()
})
