-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Hobbies`
--

DROP TABLE IF EXISTS `Hobbies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Hobbies` (
  `idHobbies` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Activity` varchar(45) NOT NULL,
  `Category` varchar(45) NOT NULL DEFAULT 'Other',
  PRIMARY KEY (`idHobbies`,`Activity`),
  UNIQUE KEY `iDHobbies_UNIQUE` (`idHobbies`),
  UNIQUE KEY `Activity_UNIQUE` (`Activity`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hobbies`
--

LOCK TABLES `Hobbies` WRITE;
/*!40000 ALTER TABLE `Hobbies` DISABLE KEYS */;
INSERT INTO `Hobbies` VALUES (37,'Tennis','Sport');
/*!40000 ALTER TABLE `Hobbies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_to_Hobby`
--

DROP TABLE IF EXISTS `User_to_Hobby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_to_Hobby` (
  `idUsers` int(10) unsigned NOT NULL,
  `idHobbies` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idUsers`,`idHobbies`),
  KEY `idHobbies_idx` (`idHobbies`),
  KEY `idUsers_idx` (`idUsers`),
  CONSTRAINT `idHobbies` FOREIGN KEY (`idHobbies`) REFERENCES `hobbies` (`idHobbies`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idUsers` FOREIGN KEY (`idUsers`) REFERENCES `users` (`idUsers`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 MAX_ROWS=2;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_to_Hobby`
--

LOCK TABLES `User_to_Hobby` WRITE;
/*!40000 ALTER TABLE `User_to_Hobby` DISABLE KEYS */;
INSERT INTO `User_to_Hobby` VALUES (21,37);
/*!40000 ALTER TABLE `User_to_Hobby` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `idUsers` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `MOB` tinyint(2) NOT NULL,
  `DOB` tinyint(2) NOT NULL,
  `YOB` smallint(4) NOT NULL,
  `Email` varchar(45) NOT NULL,
  PRIMARY KEY (`idUsers`,`Email`),
  UNIQUE KEY `idUsers_UNIQUE` (`idUsers`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (21,'Adrian','Lee',3,15,1998,'mynameisadrianlee315@gmail.com');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-23 22:34:26

