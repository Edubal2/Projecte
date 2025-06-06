CREATE
DATABASE IF NOT EXISTS Projecte;
USE
Projecte;

-- movies table
CREATE TABLE movies
(
    `id`         INT AUTO_INCREMENT PRIMARY KEY,
    `title`      VARCHAR(255) NOT NULL,
    `year`       INT          NOT NULL,
    `director`   VARCHAR(255) NOT NULL,
    `box_office` INT          NOT NULL,
    `image`      VARCHAR(255) NOT NULL
);

-- actors table
CREATE TABLE actors
(
    `id`              INT AUTO_INCREMENT PRIMARY KEY,
    `movies_id`       INT          NOT NULL,
    `name`            VARCHAR(255) NOT NULL,
    `nationality`     VARCHAR(255) NOT NULL,
    `birth_date`      DATE         NOT NULL,
    `height`          INT          NOT NULL,
    `awards`          VARCHAR(255),
    `social_networks` VARCHAR(255),
    `image`           VARCHAR(255) NOT NULL,
    FOREIGN KEY (movies_id) REFERENCES movies (id)
);

-- movies inserts
INSERT INTO movies (id, title, year, director, box_office, image)
VALUES (1, 'Batman Begins', 2005, 'Christopher Nolan', 1066, '/images/batman/batman_begins.jpg'),
       (2, 'The Devil Wears Prada', 2006, 'David Frankel', 326, '/images/prada/prada.jpg'),
       (3, 'The Super Mario Bros. Movie', 2023, 'Aaron Horvath', 1362, '/images/mario/mario.jpg'),
       (4, 'The Matrix', 1999, 'Lana Wachowski', 460, '/images/matrix/The_matrix.jpg'),
       (5, 'Fast & Furious 7', 2015, 'James Wan', 1516, '/images/F7/furious.jpg');

-- actors isnerts
INSERT INTO actors (id, movies_id, name, nationality, birth_date, height, awards, social_networks, image)
VALUES
-- movie 1
(1, 1, 'Christian Bale', 'Britanica', '1974-01-30', 183, 'MTV Movie Award al Mejor Héroe',
 'https://www.instagram.com/christianbale_', '/images/batman/christian_bale.jpg'),
(2, 1, 'Cillian Murphy', 'Irlandesa', '1976-05-25', 172, NULL, NULL, '/images/batman/cillian_murphy.jpg'),
(3, 1, 'Liam Neeson', 'Britanica', '1952-07-30', 193, NULL, NULL, '/images/batman/liam_neeson.jpg'),
(4, 1, 'Gary Oldman', 'Britanica', '1958-03-21', 174, NULL, NULL, '/images/batman/gary_oldman.jpg'),
(5, 1, 'Morgan Freeman', 'Estadounidense', '1973-06-01', 188, NULL, NULL, '/images/batman/morgan_freeman.jpg'),
-- movie 2
(6, 2, 'Anne Hathaway', 'Estadounidense', '1984-11-12', 173, NULL, 'https://www.instagram.com/annehathaway',
 '/images/prada/anne_hathaway.jpg'),
(7, 2, 'Emily Blunt', 'Britanica', '1983-02-23', 170, NULL, NULL, '/images/prada/emily_blunt.jpg'),
(8, 2, 'Meryl Streep', 'Estadounidense', '1949-06-22', 168, NULL, NULL, '/images/prada/meryl_streep.jpg'),
(9, 2, 'Stanley Tucci', 'Estadounidense', '1960-11-11', 172, NULL, NULL, '/images/prada/stanley_tucci.jpg'),
(10, 2, 'Simon Baker', 'Australiana', '1969-07-30', 178, NULL, NULL, '/images/prada/simon_baker.jpg'),
-- movie 3
(11, 3, 'Jack Black', 'Estadounidense', '1979-06-21', 168, 'Nickelodeon Kids Choice Award al Villano Favorito', NULL,
 '/images/mario/jack_black.jpg'),
(12, 3, 'Chris Pratt', 'Estadounidense', '1979-06-21', 188, NULL, NULL, '/images/mario/chris_pratt.jpg'),
(13, 3, 'Anya Taylor-Joy', 'Estadounidense', '1996-04-16', 173, NULL, NULL, '/images/mario/anya.jpg'),
(14, 3, 'Charlie Day', 'Estadounidense', '1976-02-09', 169, NULL, NULL, '/images/mario/charlie_day.jpg'),
(15, 3, 'Keegan-Michael Key', 'Estadounidense', '1971-03-22', 185, NULL, NULL, '/images/mario/Keegan-Michael_Key.jpg'),
-- movie 4
(16, 4, 'Keanu Reeves', 'Canadiense', '1964-07-02', 186, 'MTV Movie Award a la Mejor Pelea', NULL,
 '/images/matrix/keanu_reeves.jpg'),
(17, 4, 'Laurence Fishburne', 'Estadounidense', '1961-07-30', 184, 'MTV Movie Award a la Mejor Pelea',
 'https://x.com/RealLaureneFish', '/images/matrix/laurence_fishburne.jpg'),
(18, 4, 'Carrie-Anne Moss', 'Canadiense', '1967-08-21', 174, NULL, NULL, '/images/matrix/carrie.jpg'),
(19, 4, 'Hugo Weaving', 'Canadiense', '1967-08-21', 174, NULL, NULL, '/images/matrix/hugo_weaving.jpg'),
(20, 4, 'Joe Pantoliano', 'Estadounidense', '1951-07-12', 176, NULL, NULL, '/images/matrix/joe_pantoliano.jpg'),
-- movie 5
(21, 5, 'Paul Walker', 'Estadounidense', '1973-07-13', 188, 'Teen Choice Award al Mejor Actor en Aventura de Acción',
 'https://www.instagram.com/paulwalker', '/images/F7/paul_walker.jpg'),
(22, 5, 'Vin Diesel', 'Estadounidense', '1967-07-18', 182, NULL, NULL, '/images/F7/vin_diesel.jpg'),
(23, 5, 'Tyrese Gibson', 'Estadounidense', '1978-12-30', 180, NULL, NULL, '/images/F7/tyrese_gibson.jpg'),
(24, 5, 'Dwayne Johnson', 'Estadounidense', '1972-05-02', 193, NULL, NULL, '/images/F7/dwayne_johnson.jpg'),
(25, 5, 'Gal Gadot', 'Israeli', '1985-04-30', 178, NULL, NULL, '/images/F7/gal_gadot.jpg');
