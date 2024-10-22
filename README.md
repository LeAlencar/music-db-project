# Projeto de Banco de Dados

Este projeto tem como objetivo apresentar o conhecimento adquirido ao longo do curso de Banco de Dados, com o objetivo de ser utilizado em outros projetos.
Fizemos todo o código usando Node com Fastify, PostgreSQL e DrizzleORM.

#### Integrantes:

Leandro de Brito Alencar RA: 22.222.034-5

Caio Arnoni RA: 22.221.019-7

Mateus Rocha RA: 22.222.002-2

## Diagrama Realacional

![image](https://github.com/user-attachments/assets/15f1ea84-f1b8-4827-9440-9ac481dd8e20)

## Como Rodar o projeto

Para rodar o projeto é necessário ter Docker instalado em sua máquina e o Node também. Após isso podemos seguir com os comandos abaixo.

### Clonar o repositório

```bash
git clone https://github.com/leandroalencar/projeto-db.git
```

### Rodar o container

```bash
docker-compose up -d
```

### Instalar as dependências

```bash
npm install
```

### Fazer a seed do banco de dados

```bash
npm run seed
```

### Visualizar as tabelas do banco de dados

```bash
npm run studio
```

### Questões

1. Liste o título de todas as músicas e suas durações.

```sql
SELECT title, duration FROM music;
```

2. Encontre o nome de todos os artistas que têm mais de 5 músicas em seu repertório.

```sql
SELECT a.name
FROM artist a
JOIN music_artist ma ON a.id = ma.artist_id
GROUP BY a.id, a.name
HAVING COUNT(DISTINCT ma.music_id) > 5;
```

3. Quais são os títulos dos discos lançados após 2020?

```sql
SELECT title
FROM album
WHERE launch_date > '2020-01-01';
```

4. Liste os títulos das músicas e os nomes dos artistas que as interpretam, ordenados pelo título da música.

```sql
SELECT m.title, a.name
FROM music m
JOIN music_artist ma ON m.id = ma.music_id
JOIN artist a ON ma.artist_id = a.id
ORDER BY m.title;
```

5. Encontre os títulos das playlists que contêm a música com o título 'Imagine'.

```sql
SELECT p.title
FROM playlist p
JOIN music_playlist mp ON p.id = mp.playlist_id
JOIN music m ON mp.music_id = m.id
WHERE m.title = 'Imagine';
```

6. Liste os usuários que criaram playlists que contêm músicas do disco 'Abbey Road'.

```sql
SELECT DISTINCT u.name
FROM "user" u
JOIN playlist p ON u.id = p.user_id
JOIN music_playlist mp ON p.id = mp.playlist_id
JOIN music m ON mp.music_id = m.id
JOIN album_music am ON m.id = am.music_id
JOIN album a ON am.album_id = a.id
WHERE a.title = 'Modern Metal';
```

7. Qual é a duração média das músicas de um artista específico?

```sql
SELECT AVG(m.duration) as avg_duration
FROM music m
JOIN music_artist ma ON m.id = ma.music_id
JOIN artist a ON ma.artist_id = a.id
WHERE a.id = 'k3bgt0ese5fsvc';
```

8. Encontre todos os artistas que não têm músicas.

```sql
SELECT a.name
FROM artist a
LEFT JOIN music_artist ma ON a.id = ma.artist_id
WHERE ma.music_id IS NULL;
```

9. Liste todos os discos que contêm mais de 10 músicas.

```sql
SELECT a.title
FROM album a
JOIN album_music am ON a.id = am.album_id
GROUP BY a.id, a.title
HAVING COUNT(am.music_id) > 10;
```

10. Quais são os nomes dos artistas que têm discos lançados antes de 2010 e que têm músicas na playlist "Top 50"?

```sql
SELECT DISTINCT ar.name
FROM artist ar
JOIN album al ON ar.id = al.artist_id
JOIN music_artist ma ON ar.id = ma.artist_id
JOIN music_playlist mp ON ma.music_id = mp.music_id
WHERE al.launch_date < '2020-01-01'
AND mp.playlist_id = 'playlist_id_específico';
```

11. Quais músicas são interpretadas por mais de um artista?

```sql
SELECT m.title
FROM music m
JOIN music_artist ma ON m.id = ma.music_id
GROUP BY m.id, m.title
HAVING COUNT(DISTINCT ma.artist_id) > 1;
```

12. Liste os títulos das músicas que aparecem em mais de uma playlist.

```sql
SELECT m.title
FROM music m
JOIN music_playlist mp ON m.id = mp.music_id
GROUP BY m.id, m.title
HAVING COUNT(DISTINCT mp.playlist_id) > 1;
```

13. Encontre os nomes dos usuários que têm playlists que incluem a música 'Bohemian Rhapsody'.

```sql
SELECT DISTINCT u.name
FROM "user" u
JOIN playlist p ON u.id = p.user_id
JOIN music_playlist mp ON p.id = mp.playlist_id
WHERE mp.music_id = 'c2w0vrnjvx7g';
```

14. Qual é o título da música mais longa do disco 'Dark Side of the Moon'?

```sql
SELECT m.title
FROM music m
JOIN album_music am ON m.id = am.music_id
JOIN album a ON am.album_id = a.id
WHERE a.id = 'nm1luwh6v1m7'
ORDER BY m.duration DESC
LIMIT 1;
```

15. Liste todos os discos lançados por um artista específico em um determinado ano.

```sql
SELECT a.title
FROM album a
WHERE a.artist_id = 'k3bgt0ese5fsvc'
AND EXTRACT(YEAR FROM launch_date) = 2024;
```

16. Quais são os nomes dos artistas que têm músicas em playlists criadas por um usuário específico?

```sql
SELECT DISTINCT ar.name
FROM artist ar
JOIN music_artist ma ON ar.id = ma.artist_id
JOIN music_playlist mp ON ma.music_id = mp.music_id
JOIN playlist p ON mp.playlist_id = p.id
WHERE p.user_id = 'user_id_específico';
```

17. Encontre a lista de músicas que não estão em nenhuma playlist.

```sql
SELECT m.title
FROM music m
LEFT JOIN music_playlist mp ON m.id = mp.music_id
WHERE mp.playlist_id IS NULL;
```

18. Liste os títulos das músicas e os nomes dos artistas que têm mais de 3 músicas em uma mesma playlist.

```sql
SELECT m.title, ar.name
FROM music m
JOIN music_artist ma ON m.id = ma.music_id
JOIN artist ar ON ma.artist_id = ar.id
JOIN music_playlist mp ON m.id = mp.music_id
GROUP BY m.id, m.title, ar.id, ar.name, mp.playlist_id
HAVING COUNT(*) > 3;
```

19. Quais são os discos que contêm músicas de artistas que têm pelo menos 2 discos lançados?

```sql
SELECT DISTINCT a.title
FROM album a
WHERE a.artist_id IN (
    SELECT artist_id
    FROM album
    GROUP BY artist_id
    HAVING COUNT(*) >= 2
);
);
```

20. Liste todos os usuários e suas playlists, mas apenas para playlists que contêm pelo menos 5 músicas?

```sql
SELECT u.name, p.title
FROM "user" u
JOIN playlist p ON u.id = p.user_id
JOIN music_playlist mp ON p.id = mp.playlist_id
GROUP BY u.id, u.name, p.id, p.title
HAVING COUNT(DISTINCT mp.music_id) >= 5;
```
