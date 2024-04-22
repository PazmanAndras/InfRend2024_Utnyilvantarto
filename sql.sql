

CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customerId` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `idCard` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;



CREATE TABLE IF NOT EXISTS `car` (
  `id` int(10) NOT NULL ,
  `lp_number` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `car_type` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `fuel` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `consumption` int(10) NOT NULL,
  `start_km` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;


INSERT INTO `car` (`id`, `lp_number`, `car_type`, `fuel`, `consumption`, `start_km`) VALUES
(1, 'ABC-123', 'Sedan', 'Gasoline', 10, 10000),
(2, 'DEF-456', 'SUV', 'Diesel', 8, 12000),
(3, 'GHI-789', 'Hatchback', 'Gasoline', 12, 8000),
(4, 'JKL-012', 'Truck', 'Diesel', 15, 15000),
(5, 'MNO-345', 'Convertible', 'Gasoline', 11, 11000),
(6, 'PQR-678', 'Coupe', 'Gasoline', 9, 13000),
(7, 'STU-901', 'Van', 'Diesel', 13, 9000),
(8, 'VWX-234', 'Sedan', 'Gasoline', 10, 14000),
(9, 'YZA-567', 'SUV', 'Diesel', 8, 10000),
(10, 'BCD-890', 'Hatchback', 'Gasoline', 12, 12000),
(11, 'EFG-123', 'Truck', 'Diesel', 15, 11000),
(12, 'HIJ-456', 'Convertible', 'Gasoline', 11, 13000),
(13, 'KLM-789', 'Coupe', 'Gasoline', 9, 15000),
(14, 'NOP-012', 'Van', 'Diesel', 13, 14000),
(15, 'QRS-345', 'Sedan', 'Gasoline', 10, 16000),
(16, 'TUV-678', 'SUV', 'Diesel', 8, 13000),
(17, 'VWX-901', 'Hatchback', 'Gasoline', 12, 15000),
(18, 'YZA-234', 'Truck', 'Diesel', 15, 12000),
(19, 'BCD-567', 'Convertible', 'Gasoline', 11, 14000),
(20, 'EFG-890', 'Coupe', 'Gasoline', 9, 16000);


CREATE TABLE `driver` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `birthDate` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `licenseNumber` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `licenseExpirationDate` varchar(255) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;


INSERT INTO `driver` (`Id`, `name`, `birthDate`, `address`, `licenseNumber`, `licenseExpirationDate`) VALUES
(1, 'Kovács Bence', '1985-04-10', 'Budapest, Kossuth Lajos utca 12.', 'ABC123456', '2026-04-10'),
(2, 'Tóth Csilla', '1990-07-22', 'Debrecen, Petőfi tér 5.', 'DEF789012', '2023-07-22'),
(3, 'Nagy Gábor', '1982-12-15', 'Szeged, Rózsadomb utca 8.', 'GHI345678', '2025-12-15'),
(4, 'Kiss Eszter', '1995-08-30', 'Miskolc, Fő utca 21.', 'JKL901234', '2028-08-30'),
(5, 'Szabó Dániel', '1988-03-25', 'Pécs, Jókai utca 3.', 'MNO567890', '2024-03-25'),
(6, 'Varga Enikő', '1993-06-12', 'Győr, Bajcsy-Zsilinszky utca 17.', 'PQR123456', '2029-06-12'),
(7, 'Fekete Balázs', '1980-11-18', 'Szombathely, Hunyadi utca 10.', 'STU789012', '2023-11-18'),
(8, 'Horváth Katalin', '1991-09-05', 'Kecskemét, Széchenyi tér 4.', 'VWX345678', '2030-09-05'),
(9, 'Papp László', '1987-05-14', 'Nyíregyháza, Bajcsy-Zsilinszky utca 9.', 'YZA901234', '2022-05-14'),
(10, 'Molnár Zsuzsa', '1994-02-28', 'Székesfehérvár, Vörösmarty tér 6.', 'BCD567890', '2027-02-28'),
(11, 'Fehér Péter', '1984-10-08', 'Érd, Ady Endre utca 23.', 'EFG123456', '2025-10-08'),
(12, 'Balogh Tamás', '1992-01-17', 'Dunaújváros, Szabadság tér 7.', 'HIJ789012', '2028-01-17'),
(13, 'Pintér Anikó', '1986-07-03', 'Sopron, Fő tér 11.', 'KLM345678', '2024-07-03'),
(14, 'Király Gergő', '1990-04-20', 'Veszprém, Árpád út 2.', 'NOP901234', '2029-04-20'),
(15, 'Németh Anna', '1983-11-28', 'Szombathely, Hunyadi utca 15.', 'QRS567890', '2023-11-28'),
(16, 'Takács Krisztina', '1996-08-14', 'Eger, Dobó tér 12.', 'TUV123456', '2026-08-14'),
(17, 'Simon Zoltán', '1981-06-22', 'Békéscsaba, Szent István tér 8.', 'VWX789012', '2027-06-22'),
(18, 'Bakos Réka', '1989-03-07', 'Zalaegerszeg, Rákóczi út 5.', 'YZA345678', '2025-03-07'),
(19, 'Magyar János', '1991-10-30', 'Salgótarján, Kossuth tér 14.', 'BCD901234', '2028-10-30'),
(20, 'Fodor Ibolya', '1985-02-13', 'Szeged, Rózsadomb utca 6.', 'EFG567890', '2024-02-13'),
(21, 'Török Attila', '1993-09-19', 'Pécs, Jókai utca 9.', 'HIJ123456', '2029-09-19'),
(22, 'Balla Petra', '1980-04-26', 'Kaposvár, Szabadság tér 3.', 'KLM789012', '2023-04-26'),
(23, 'Mészáros Dávid', '1987-01-01', 'Debrecen, Petőfi tér 7.', 'NOP345678', '2026-01-01'),
(24, 'Bognár Katalin', '1992-11-11', 'Székesfehérvár, Vörösmarty tér 10.', 'QRS901234', '2027-11-11'),
(25, 'Fehér Zsolt', '1984-08-05', 'Miskolc, Fő utca 19.', 'TUV567890', '2025-08-05');


CREATE TABLE `trip` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `car` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `driver` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `startDate` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `tripType` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `startPlace` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `endPlace` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `distance` int(10) NOT NULL,
  `newKm` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;


INSERT INTO `trip` (`Id`, `car`, `driver`, `startDate`, `tripType`, `startPlace`, `endPlace`, `distance`, `newKm`) VALUES
(1, 'Sedan', 'Kiss Eszter', '2024-04-01', 'Magán', 'Budapest', 'Szeged', 250, 20000),
(2, 'Truck', 'Varga Enikő', '2024-04-02', 'Céges', 'Szeged', 'Debrecen', 350, 15000),
(3, 'Van', 'Bakos Réka', '2024-04-03', 'Magán', 'Szeged', 'Pécs', 200, 18000),
(4, 'Coupe', 'Magyar János', '2024-04-04', 'Céges', 'Debrecen', 'Budapest', 300, 22000),
(5, 'Suv', 'Török Attila', '2024-04-05', 'Magán', 'Budapest', 'Győr', 150, 25000),
(6, 'Convertible', 'Mészáros Dávid', '2024-04-06', 'Céges', 'Győr', 'Pécs', 400, 21000),
(7, 'Hatchback', 'Bognár Katalin', '2024-04-07', 'Magán', 'Pécs', 'Szeged', 180, 23000),
(8, 'Sedan', 'Fehér Zsolt', '2024-04-08', 'Céges', 'Szeged', 'Debrecen', 320, 19000),
(9, 'Truck', 'Kiss Eszter', '2024-04-09', 'Magán', 'Debrecen', 'Budapest', 280, 21000),
(10, 'Van', 'Varga Enikő', '2024-04-10', 'Céges', 'Budapest', 'Szeged', 220, 24000);


CREATE TABLE `user` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;