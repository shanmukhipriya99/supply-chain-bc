-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2021 at 09:28 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supplychain`
--
CREATE DATABASE IF NOT EXISTS `supplychain` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `supplychain`;

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
CREATE TABLE `assets` (
  `AID` varchar(255) NOT NULL,
  `AName` varchar(255) NOT NULL,
  `creator` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `time` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`AID`, `AName`, `creator`, `owner`, `time`) VALUES
('A-xht1l4ckoo917zf', 'A1', 'P-xhts0skoo4c9dc', 'P-xhtg4wkori6gwu', '1620992420'),
('A-xht1l4ckoo93hy5', 'A2', 'P-xhts0skoo4c9dc', 'P-xht1l4ckoo8nmhb', '1620992526'),
('A-xht3nskoptm7aq', 'A3', 'P-xhts0skoo4c9dc', 'P-xhts0skoo4c9dc', '1621087457'),
('A-xht3nskoptntv1', 'A4', 'P-xhts0skoo4c9dc', 'P-xhts0skoo4c9dc', '1621087533'),
('A-xhtdnokor02ouh', 'A5', 'P-xht13sgkoo720q8', 'P-xhtg4wkori6gwu', '1621158770'),
('A-xhtdnokor061j2', 'A6', 'P-xht13sgkoo720q8', 'P-xht13sgkoo720q8', '1621158927'),
('A-xhtdnokor06ffr', 'A7', 'P-xht13sgkoo720q8', 'P-xht13sgkoo720q8', '1621158945'),
('A-xhtdoskp5ln9gp', 'Trail Asset', 'P-xhtdoskp5lmb0a', 'P-xht3nskoppgim7', '1622041603'),
('A-xhtmcokp12m5x1', 'Asset1', 'P-xhts0skoo4c9dc', 'P-xhtg4wkori6gwu', '1621767733'),
('A-xhtnckorhtqqb', 'Trail', 'P-xhts0skoo4c9dc', 'P-xhts0skoo4c9dc', '1621188601'),
('A-xhtufwkp19e3p6', 'Asset2', 'P-xhts0skoo4c9dc', 'P-xht3nskoppgim7', '1621779116');

-- --------------------------------------------------------

--
-- Table structure for table `parties`
--

DROP TABLE IF EXISTS `parties`;
CREATE TABLE `parties` (
  `PID` varchar(255) NOT NULL,
  `PName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `token` text NOT NULL,
  `time` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `parties`
--

INSERT INTO `parties` (`PID`, `PName`, `email`, `password`, `role`, `token`, `time`) VALUES
('P-xht13sgkoo720q8', 'P2', 'p2@gmail.com', '$2b$10$RnrbdQsVfRztcJE/7xDIdeLREzFSk7PmJgbVGXcUca4Q6ELYsr6dG', 'Farmer', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InAyQGdtYWlsLmNvbSIsImlhdCI6MTYyMjA0NDM5NywiZXhwIjoxNjIyMDYyMzk3fQ.S6lDd1WQHcsOdHtCEtB770NKuxUO0mVZ4_naI_sEHJ0', '1620989098'),
('P-xht1l4ckoo8nmhb', 'P3', 'p3@gmail.com', '$2b$10$ZXuIS9nZdHUPTrZR7xYmte/H54RSXlw.IAx7V0m91BQO5ER1Bzq4C', 'Wholesaler', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InAzQGdtYWlsLmNvbSIsImlhdCI6MTYyMjA0MjEyNCwiZXhwIjoxNjIyMDYwMTI0fQ.iSci6KIjKHTmONdSk_ffgtXauUdMtQCMadm_gmTroRs', '1620991785'),
('P-xht3nskoppgim7', 'P4', 'p4@gmail.com', '$2b$10$AHbCUTVfHXYNJ/eh/Ud68.h6mYM6/1Ui1fznfIvKIwAwI8xoIAbuW', 'Retailer', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InA0QGdtYWlsLmNvbSIsImlhdCI6MTYyMTE5MDc1NiwiZXhwIjoxNjIxMjA4NzU2fQ.-D76etWA5tVipatQUAx-HOjLVV_lasXECaj99F-8EUo', '1621080473'),
('P-xhtbo8korfpkl5', 'P8', 'p8@gmail.com', '$2b$10$kyDT.3zGG3hs1dXJMc8WOuFB.D5fQtJoSU4EMiligkEyuYpJ19tD6', 'Retailer', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InA4QGdtYWlsLmNvbSIsImlhdCI6MTYyMTE4NTA1MSwiZXhwIjoxNjIxMjAzMDUxfQ.AxZLdFQ3OKeg2mXZAH1ksgjJCuz4Sk8ZW0x4RikLAdI', '1621185032'),
('P-xhtdoskp5lmb0a', 'Farmer', 'farmer@gmail.com', '$2b$10$qEu8aN45E0zzdD1723uUUuPYDI9ZxEom79SSaBCbD42UpFkTIie5a', 'Farmer', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhcm1lckBnbWFpbC5jb20iLCJpYXQiOjE2MjIwNDE0OTcsImV4cCI6MTYyMjA1OTQ5N30.MZWX6v_kfLyASNwhzoQyHPLmzqooriy568RHHE5HsE8', '1622041484'),
('P-xhtfjgkos3u23w', 'P9', 'p9@gmail.com', '$2b$10$Ca/PMsKKzg7s3yNg8651ZeSOXGLgKUUXtwq4YKJFHjQH4TyJYp3qq', 'Customer', '', '1621225552'),
('P-xhtg4wkori6gwu', 'P5', 'p5@gmail.com', '$2b$10$EJyZeWKwhLzCC3KE4HlL0eh9/xluGFwDA92CVGNfS6N7bTGd.qx7S', 'Customer', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InA1QGdtYWlsLmNvbSIsImlhdCI6MTYyMjA0NDQxMiwiZXhwIjoxNjIyMDYyNDEyfQ.E_oUyna5Ty1_UDs6y8NugGZ5E109zyFRFy7OPeFtftY', '1621189180'),
('P-xhts0skoo4c9dc', 'P1', 'p1@gmail.com', '$2b$10$2fXG961VZo4znCQqmYBjm.M482GJgvD/onRNkHcN4r1YEHKbTN9ai', 'Farmer', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InAxQGdtYWlsLmNvbSIsImlhdCI6MTYyMjA0NDM2MywiZXhwIjoxNjIyMDYyMzYzfQ.XYWr8eNAZdmE2DC8L9wbh96TGk4fsbpdJ-FIHzEib-4', '1620984537');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
CREATE TABLE `transaction` (
  `TID` varchar(255) NOT NULL,
  `AID` varchar(255) NOT NULL,
  `Sender` varchar(255) NOT NULL,
  `Receiver` varchar(255) NOT NULL,
  `time` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`TID`, `AID`, `Sender`, `Receiver`, `time`) VALUES
('T-xht1l4ckoo91ufk', 'A-xht1l4ckoo917zf', 'P-xhts0skoo4c9dc', 'P-xht13sgkoo720q8', '1620992449'),
('T-xht1l4ckoo946vs', 'A-xht1l4ckoo93hy5', 'P-xhts0skoo4c9dc', 'P-xht1l4ckoo8nmhb', '1620992558'),
('T-xht1l4ckoo955j7', 'A-xht1l4ckoo917zf', 'P-xht13sgkoo720q8', 'P-xht1l4ckoo8nmhb', '1620992603'),
('T-xhtb3ckor1vnw9', 'A-xhtdnokor02ouh', 'P-xht13sgkoo720q8', 'P-xht3nskoppgim7', '1621161802'),
('T-xhtdoskp5lwc9b', 'A-xhtdoskp5ln9gp', 'P-xhtdoskp5lmb0a', 'P-xht3nskoppgim7', '1622041952'),
('T-xhtee8kp179hlc', 'A-xhtmcokp12m5x1', 'P-xhts0skoo4c9dc', 'P-xhtg4wkori6gwu', '1621775507'),
('T-xhthk4korje941', 'A-xhtdnokor02ouh', 'P-xht3nskoppgim7', 'P-xhtg4wkori6gwu', '1621191222'),
('T-xhthk4kork1zdq', 'A-xht1l4ckoo917zf', 'P-xht1l4ckoo8nmhb', 'P-xhtg4wkori6gwu', '1621192330'),
('T-xhtufwkp19fqel', 'A-xhtufwkp19e3p6', 'P-xhts0skoo4c9dc', 'P-xht3nskoppgim7', '1621779157');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`AID`),
  ADD KEY `creator` (`creator`),
  ADD KEY `owner` (`owner`);

--
-- Indexes for table `parties`
--
ALTER TABLE `parties`
  ADD PRIMARY KEY (`PID`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`TID`),
  ADD KEY `AID` (`AID`),
  ADD KEY `Sender` (`Sender`),
  ADD KEY `Receiver` (`Receiver`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assets`
--
ALTER TABLE `assets`
  ADD CONSTRAINT `creator` FOREIGN KEY (`creator`) REFERENCES `parties` (`PID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `owner` FOREIGN KEY (`owner`) REFERENCES `parties` (`PID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `AID` FOREIGN KEY (`AID`) REFERENCES `assets` (`AID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `Receiver` FOREIGN KEY (`Receiver`) REFERENCES `parties` (`PID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `Sender` FOREIGN KEY (`Sender`) REFERENCES `parties` (`PID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
