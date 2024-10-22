Integrantes: Caio Arnoni / Leandro de Brito Alencar / Mateus Rocha <br>
RA: 22.221.019-7 / 22.222.034-5 / 22.222.002-2

1. Liste o título de todas as músicas e suas durações.

SELECT Titulo, Duracao
FROM Musica

2. Encontre o nome de todos os artistas que têm mais de 5 músicas em seu repertório.

SELECT a.Nome <br>
FROM Artista a <br>
JOIN Musica_Artista ma ON a.ID_Artista = ma.ID_Artista <br>
GROUP BY a.ID_Artista, a.Nome <br>
HAVING COUNT(DISTINCT ma.ID_Musica) > 5;

3. Quais são os títulos dos discos lançados após 2020?

SELECT Titulo <br>
FROM Disco <br>
WHERE DataLancamento > '2020-12-31';

4. Liste os títulos das músicas e os nomes dos artistas que as interpretam, ordenados pelo título da música.

SELECT m.Titulo, a.Nome <br>
FROM Musica m <br>
JOIN Musica_Artista ma ON m.ID_Musica = ma.ID_Musica <br>
JOIN Artista a ON ma.ID_Artista = a.ID_Artista <br>
ORDER BY m.Titulo;

5. Encontre os títulos das playlists que contêm a música com o título 'Imagine'.

SELECT DISTINCT p.Titulo <br>
FROM Playlist p <br>
JOIN Musica_Playlist mp ON p.ID_Playlist = mp.ID_Playlist <br>
JOIN Musica m ON mp.ID_Musica = m.ID_Musica <br>
WHERE m.Titulo = 'Imagine';

6. Liste os usuários que criaram playlists que contêm músicas do disco 'Abbey Road'.

SELECT DISTINCT u.Nome <br>
FROM Usuario u <br>
JOIN Playlist p ON u.ID_Usuario = p.ID_Usuario <br>
JOIN Musica_Playlist mp ON p.ID_Playlist = mp.ID_Playlist <br>
JOIN Musica m ON mp.ID_Musica = m.ID_Musica <br>
JOIN Disco d ON m.ID_Disco = d.ID_Disco <br>
WHERE d.Titulo = 'Abbey Road';

7. Qual é a duração média das músicas de um artista específico?

SELECT AVG(m.Duracao) as DuracaoMedia <br>
FROM Musica m <br>
JOIN Musica_Artista ma ON m.ID_Musica = ma.ID_Musica <br>
JOIN Artista a ON ma.ID_Artista = a.ID_Artista <br>
WHERE a.Nome = 'Nome do Artista';

8. Encontre todos os artistas que não têm músicas.

SELECT a.Nome <br>
FROM Artista a <br>
LEFT JOIN Musica_Artista ma ON a.ID_Artista = ma.ID_Artista <br>
WHERE ma.ID_Musica IS NULL;

9. Liste todos os discos que contêm mais de 10 músicas.

SELECT d.Titulo <br>
FROM Disco d <br>
JOIN Disco_Musica dm ON d.ID_Disco = dm.ID_Disco <br>
GROUP BY d.ID_Disco, d.Titulo <br>
HAVING COUNT(dm.ID_Musica) > 10;

10. Quais são os nomes dos artistas que têm discos lançados antes de 2010 e que têm músicas na playlist "Top 50"?

SELECT DISTINCT a.Nome <br>
FROM Artista a <br>
JOIN Disco d ON a.ID_Artista = d.ID_Artista <br>
JOIN Musica_Artista ma ON a.ID_Artista = ma.ID_Artista <br>
JOIN Musica m ON ma.ID_Musica = m.ID_Musica <br>
JOIN Musica_Playlist mp ON m.ID_Musica = mp.ID_Musica <br>
JOIN Playlist p ON mp.ID_Playlist = p.ID_Playlist <br>
WHERE d.DataLancamento < '2010-01-01' <br>
  AND p.Titulo = 'Top 50';

11. Quais músicas são interpretadas por mais de um artista?

SELECT m.Titulo <br>
FROM Musica m <br>
JOIN Musica_Artista ma ON m.ID_Musica = ma.ID_Musica <br>
GROUP BY m.ID_Musica, m.Titulo <br>
HAVING COUNT(DISTINCT ma.ID_Artista) > 1;

12. Liste os títulos das músicas que aparecem em mais de uma playlist.

SELECT m.Titulo <br>
FROM Musica m <br>
JOIN Musica_Playlist mp ON m.ID_Musica = mp.ID_Musica <br>
GROUP BY m.ID_Musica, m.Titulo <br>
HAVING COUNT(DISTINCT mp.ID_Playlist) > 1;

13. Encontre os nomes dos usuários que têm playlists que incluem a música 'Bohemian Rhapsody'.

SELECT DISTINCT u.Nome <br>
FROM Usuario u <br>
JOIN Playlist p ON u.ID_Usuario = p.ID_Usuario <br>
JOIN Musica_Playlist mp ON p.ID_Playlist = mp.ID_Playlist <br>
JOIN Musica m ON mp.ID_Musica = m.ID_Musica <br>
WHERE m.Titulo = 'Bohemian Rhapsody';

14. Qual é o título da música mais longa do disco 'Dark Side of the Moon'?

SELECT m.Titulo <br>
FROM Musica m <br>
JOIN Disco d ON m.ID_Disco = d.ID_Disco <br>
WHERE d.Titulo = 'Dark Side of the Moon' <br>
ORDER BY m.Duracao DESC <br>
LIMIT 1;

15. Liste todos os discos lançados por um artista específico em um determinado ano.

SELECT d.Titulo <br>
FROM Disco d <br>
JOIN Artista a ON d.ID_Artista = a.ID_Artista <br>
WHERE a.Nome = 'Nome do Artista' <br>
  AND EXTRACT(YEAR FROM d.DataLancamento) = 2022;

16. Quais são os nomes dos artistas que têm músicas em playlists criadas por um usuário específico?

SELECT DISTINCT a.Nome <br>
FROM Artista a <br>
JOIN Musica_Artista ma ON a.ID_Artista = ma.ID_Artista <br>
JOIN Musica m ON ma.ID_Musica = m.ID_Musica <br>
JOIN Musica_Playlist mp ON m.ID_Musica = mp.ID_Musica <br>
JOIN Playlist p ON mp.ID_Playlist = p.ID_Playlist <br>
JOIN Usuario u ON p.ID_Usuario = u.ID_Usuario <br>
WHERE u.Nome = 'Nome do Usuário';

17. Encontre a lista de músicas que não estão em nenhuma playlist.

SELECT m.Titulo <br>
FROM Musica m <br>
LEFT JOIN Musica_Playlist mp ON m.ID_Musica = mp.ID_Musica <br>
WHERE mp.ID_Playlist IS NULL;

18. Liste os títulos das músicas e os nomes dos artistas que têm mais de 3 músicas em uma mesma playlist.

SELECT m.Titulo, a.Nome <br>
FROM Musica m <br>
JOIN Musica_Artista ma ON m.ID_Musica = ma.ID_Artista <br>
JOIN Artista a ON ma.ID_Artista = a.ID_Artista <br>
JOIN Musica_Playlist mp ON m.ID_Musica = mp.ID_Musica <br>
GROUP BY m.ID_Musica, m.Titulo, a.ID_Artista, a.Nome, mp.ID_Playlist <br>
HAVING COUNT(*) > 3;

19. Quais são os discos que contêm músicas de artistas que têm pelo menos 2 discos lançados?

SELECT DISTINCT d.Titulo <br>
FROM Disco d <br>
JOIN Artista a ON d.ID_Artista = a.ID_Artista <br>
WHERE a.ID_Artista IN ( <br>
    SELECT ID_Artista <br>
    FROM Disco <br>
    GROUP BY ID_Artista <br>
    HAVING COUNT(*) >= 2 <br>
);

20. Liste todos os usuários e suas playlists, mas apenas para playlists que contêm pelo menos 5 músicas?

SELECT u.Nome, p.Titulo <br>
FROM Usuario u <br>
JOIN Playlist p ON u.ID_Usuario = p.ID_Usuario <br>
JOIN Musica_Playlist mp ON p.ID_Playlist = mp.ID_Playlist <br>
GROUP BY u.ID_Usuario, u.Nome, p.ID_Playlist, p.Titulo <br>
HAVING COUNT(DISTINCT mp.ID_Musica) >= 5;
