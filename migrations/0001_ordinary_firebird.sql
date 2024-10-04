CREATE TABLE IF NOT EXISTS "album_music" (
	"album_id" text NOT NULL,
	"music_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "music_artist" (
	"music_id" text NOT NULL,
	"artist_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "music_playlist" (
	"music_id" text NOT NULL,
	"playlist_id" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "album_music" ADD CONSTRAINT "album_music_album_id_album_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."album"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "album_music" ADD CONSTRAINT "album_music_music_id_music_id_fk" FOREIGN KEY ("music_id") REFERENCES "public"."music"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "music_artist" ADD CONSTRAINT "music_artist_music_id_music_id_fk" FOREIGN KEY ("music_id") REFERENCES "public"."music"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "music_artist" ADD CONSTRAINT "music_artist_artist_id_artist_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artist"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "music_playlist" ADD CONSTRAINT "music_playlist_music_id_music_id_fk" FOREIGN KEY ("music_id") REFERENCES "public"."music"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "music_playlist" ADD CONSTRAINT "music_playlist_playlist_id_playlist_id_fk" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlist"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "album_music_pk" ON "album_music" USING btree ("album_id","music_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "music_artist_pk" ON "music_artist" USING btree ("music_id","artist_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "music_playlist_pk" ON "music_playlist" USING btree ("music_id","playlist_id");