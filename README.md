Integrantes: Caio Arnoni / Leandro de Brito Alencar / Mateus Rocha <br>
RA: 22.221.019-7 / 22.222.034-5 / 22.222.002-2

1. Liste o título de todas as músicas e suas durações.

SELECT Titulo, Duracao
FROM Musica;

2. Encontre o nome de todos os artistas que têm mais de 5 músicas em seu repertório.

SELECT a.Nome
FROM Artista a
JOIN Musica_Artista ma ON a.ID_Artista = ma.ID_Artista
GROUP BY a.ID_Artista, a.Nome
HAVING COUNT(DISTINCT ma.ID_Musica) > 5;

3. Quais são os títulos dos discos lançados após 2020?

SELECT Titulo
FROM Disco
WHERE DataLancamento > '2020-12-31';

4. Liste os títulos das músicas e os nomes dos artistas que as interpretam, ordenados pelo título da música.

SELECT m.Titulo, a.Nome
FROM Musica m
JOIN Musica_Artista ma ON m.ID_Musica = ma.ID_Musica
JOIN Artista a ON ma.ID_Artista = a.ID_Artista
ORDER BY m.Titulo;

5. Encontre os títulos das playlists que contêm a música com o título 'Imagine'.

SELECT DISTINCT p.Titulo
FROM Playlist p
JOIN Musica_Playlist mp ON p.ID_Playlist = mp.ID_Playlist
JOIN Musica m ON mp.ID_Musica = m.ID_Musica
WHERE m.Titulo = 'Imagine';

6. Liste os usuários que criaram playlists que contêm músicas do disco 'Abbey Road'.

SELECT DISTINCT u.Nome
FROM Usuario u
JOIN Playlist p ON u.ID_Usuario = p.ID_Usuario
JOIN Musica_Playlist mp ON p.ID_Playlist = mp.ID_Playlist
JOIN Musica m ON mp.ID_Musica = m.ID_Musica
JOIN Disco d ON m.ID_Disco = d.ID_Disco
WHERE d.Titulo = 'Abbey Road';

7. Qual é a duração média das músicas de um artista específico?

SELECT AVG(m.Duracao) as DuracaoMedia
FROM Musica m
JOIN Musica_Artista ma ON m.ID_Musica = ma.ID_Musica
JOIN Artista a ON ma.ID_Artista = a.ID_Artista
WHERE a.Nome = 'Nome do Artista';

8. Encontre todos os artistas que não têm músicas.

SELECT a.Nome
FROM Artista a
LEFT JOIN Musica_Artista ma ON a.ID_Artista = ma.ID_Artista
WHERE ma.ID_Musica IS NULL;

9. Liste todos os discos que contêm mais de 10 músicas.

SELECT d.Titulo
FROM Disco d
JOIN Disco_Musica dm ON d.ID_Disco = dm.ID_Disco
GROUP BY d.ID_Disco, d.Titulo
HAVING COUNT(dm.ID_Musica) > 10;

10. Quais são os nomes dos artistas que têm discos lançados antes de 2010 e que têm músicas na playlist "Top 50"?

SELECT DISTINCT a.Nome
FROM Artista a
JOIN Disco d ON a.ID_Artista = d.ID_Artista
JOIN Musica_Artista ma ON a.ID_Artista = ma.ID_Artista
JOIN Musica m ON ma.ID_Musica = m.ID_Musica
JOIN Musica_Playlist mp ON m.ID_Musica = mp.ID_Musica
JOIN Playlist p ON mp.ID_Playlist = p.ID_Playlist
WHERE d.DataLancamento < '2010-01-01'
  AND p.Titulo = 'Top 50';

11. Quais músicas são interpretadas por mais de um artista?

SELECT m.Titulo
FROM Musica m
JOIN Musica_Artista ma ON m.ID_Musica = ma.ID_Musica
GROUP BY m.ID_Musica, m.Titulo
HAVING COUNT(DISTINCT ma.ID_Artista) > 1;

12. Liste os títulos das músicas que aparecem em mais de uma playlist.

SELECT m.Titulo
FROM Musica m
JOIN Musica_Playlist mp ON m.ID_Musica = mp.ID_Musica
GROUP BY m.ID_Musica, m.Titulo
HAVING COUNT(DISTINCT mp.ID_Playlist) > 1;

13. Encontre os nomes dos usuários que têm playlists que incluem a música 'Bohemian Rhapsody'.

SELECT DISTINCT u.Nome
FROM Usuario u
JOIN Playlist p ON u.ID_Usuario = p.ID_Usuario
JOIN Musica_Playlist mp ON p.ID_Playlist = mp.ID_Playlist
JOIN Musica m ON mp.ID_Musica = m.ID_Musica
WHERE m.Titulo = 'Bohemian Rhapsody';

14. Qual é o título da música mais longa do disco 'Dark Side of the Moon'?

SELECT m.Titulo
FROM Musica m
JOIN Disco d ON m.ID_Disco = d.ID_Disco
WHERE d.Titulo = 'Dark Side of the Moon'
ORDER BY m.Duracao DESC
LIMIT 1;

15. Liste todos os discos lançados por um artista específico em um determinado ano.

SELECT d.Titulo
FROM Disco d
JOIN Artista a ON d.ID_Artista = a.ID_Artista
WHERE a.Nome = 'Nome do Artista'
  AND EXTRACT(YEAR FROM d.DataLancamento) = 2022;

16. Quais são os nomes dos artistas que têm músicas em playlists criadas por um usuário específico?

SELECT DISTINCT a.Nome
FROM Artista a
JOIN Musica_Artista ma ON a.ID_Artista = ma.ID_Artista
JOIN Musica m ON ma.ID_Musica = m.ID_Musica
JOIN Musica_Playlist mp ON m.ID_Musica = mp.ID_Musica
JOIN Playlist p ON mp.ID_Playlist = p.ID_Playlist
JOIN Usuario u ON p.ID_Usuario = u.ID_Usuario
WHERE u.Nome = 'Nome do Usuário';

17. Encontre a lista de músicas que não estão em nenhuma playlist.

SELECT m.Titulo
FROM Musica m
LEFT JOIN Musica_Playlist mp ON m.ID_Musica = mp.ID_Musica
WHERE mp.ID_Playlist IS NULL;

18. Liste os títulos das músicas e os nomes dos artistas que têm mais de 3 músicas em uma mesma playlist.

SELECT m.Titulo, a.Nome
FROM Musica m
JOIN Musica_Artista ma ON m.ID_Musica = ma.ID_Artista
JOIN Artista a ON ma.ID_Artista = a.ID_Artista
JOIN Musica_Playlist mp ON m.ID_Musica = mp.ID_Musica
GROUP BY m.ID_Musica, m.Titulo, a.ID_Artista, a.Nome, mp.ID_Playlist
HAVING COUNT(*) > 3;

19. Quais são os discos que contêm músicas de artistas que têm pelo menos 2 discos lançados?

SELECT DISTINCT d.Titulo
FROM Disco d
JOIN Artista a ON d.ID_Artista = a.ID_Artista
WHERE a.ID_Artista IN (
    SELECT ID_Artista
    FROM Disco
    GROUP BY ID_Artista
    HAVING COUNT(*) >= 2
);

20. Liste todos os usuários e suas playlists, mas apenas para playlists que contêm pelo menos 5 músicas?

SELECT u.Nome, p.Titulo
FROM Usuario u
JOIN Playlist p ON u.ID_Usuario = p.ID_Usuario
JOIN Musica_Playlist mp ON p.ID_Playlist = mp.ID_Playlist
GROUP BY u.ID_Usuario, u.Nome, p.ID_Playlist, p.Titulo
HAVING COUNT(DISTINCT mp.ID_Musica) >= 5;
