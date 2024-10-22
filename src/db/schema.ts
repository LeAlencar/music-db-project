import { createId } from '@paralleldrive/cuid2'
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

export const artist = pgTable('artist', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  birthday: timestamp('birthday', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const user = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const album = pgTable('album', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  artistId: text('artist_id')
    .references(() => artist.id)
    .notNull(),
  launchDate: timestamp('launch_date', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const playlist = pgTable('playlist', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  userId: text('user_id')
    .references(() => user.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
export const music = pgTable('music', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  duration: integer('duration').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const musicArtist = pgTable(
  'music_artist',
  {
    musicId: text('music_id')
      .notNull()
      .references(() => music.id),
    artistId: text('artist_id')
      .notNull()
      .references(() => artist.id),
  },
  t => ({
    compoundKey: uniqueIndex('music_artist_pk').on(t.musicId, t.artistId),
  })
)

export const musicPlaylist = pgTable(
  'music_playlist',
  {
    musicId: text('music_id')
      .notNull()
      .references(() => music.id),
    playlistId: text('playlist_id')
      .notNull()
      .references(() => playlist.id),
  },
  t => ({
    compoundKey: uniqueIndex('music_playlist_pk').on(t.musicId, t.playlistId),
  })
)

export const albumMusic = pgTable(
  'album_music',
  {
    albumId: text('album_id')
      .notNull()
      .references(() => album.id),
    musicId: text('music_id')
      .notNull()
      .references(() => music.id),
  },
  t => ({
    compoundKey: uniqueIndex('album_music_pk').on(t.albumId, t.musicId),
  })
)
