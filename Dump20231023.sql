CREATE DATABASE  IF NOT EXISTS `chuville` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `chuville`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: chuville
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `forecast`
--

DROP TABLE IF EXISTS `forecast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forecast` (
  `cdforecast` int NOT NULL AUTO_INCREMENT,
  `dsreason` varchar(255) DEFAULT NULL,
  `probability` float DEFAULT NULL,
  `dtstart` date DEFAULT NULL,
  `fgperiod` int DEFAULT NULL,
  `cdregion` int DEFAULT NULL,
  PRIMARY KEY (`cdforecast`),
  KEY `cdregion_idx` (`cdregion`),
  CONSTRAINT `fkcdregion` FOREIGN KEY (`cdregion`) REFERENCES `region` (`cdregion`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forecast`
--

LOCK TABLES `forecast` WRITE;
/*!40000 ALTER TABLE `forecast` DISABLE KEYS */;
INSERT INTO `forecast` VALUES (1,'Fortes chuvas',0.8,'2023-11-10',2,1),(2,'Seca',0,'2023-10-10',1,4);
/*!40000 ALTER TABLE `forecast` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region` (
  `cdregion` int NOT NULL AUTO_INCREMENT,
  `nmregion` varchar(255) NOT NULL,
  `cepregion` varchar(45) NOT NULL,
  `fglevel` int DEFAULT NULL,
  `idsensor` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cdregion`)
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (1,'Rodovia BR-101','89220-815',NULL,NULL),(2,'Rua Adele Trapp','89220-533',NULL,NULL),(3,'Rua Adolfo Gruensch Júnior','89218-490',NULL,NULL),(4,'Rua Adolpho Ernesto Fischer','89218-370',NULL,NULL),(5,'Rua Adolpho Ritzmann','89220-640',NULL,NULL),(6,'Rua Adriano Schondermank','89217-400',NULL,NULL),(7,'Rua Affonso Baumer','89220-180',NULL,NULL),(8,'Rua Affonso Zabbot','89220-532',NULL,NULL),(9,'Rua Affonso Zastrow','89217-780',NULL,NULL),(10,'Rua Afonso Kieper','89218-640',NULL,NULL),(11,'Rua Agostinho José Cognaco','89220-370',NULL,NULL),(12,'Rua Águia','89220-140',NULL,NULL),(13,'Rua Albatroz','89220-600',NULL,NULL),(14,'Rua Alberto Wiest','89220-570',NULL,NULL),(15,'Rua Albino Kolbach','89217-300',NULL,NULL),(16,'Rua Alfredo Geiser','89217-446',NULL,NULL),(17,'Rua Alfredo Ross','89217-365',NULL,NULL),(18,'Rua Alfredo Trapp','89220-530',NULL,NULL),(19,'Rua Alícia Bittencourt Ferreira','89220-185',NULL,NULL),(20,'Rua Amadeu Sperandio','89217-800',NULL,NULL),(21,'Rua Ana Henning','89219-270',NULL,NULL),(22,'Rua Ana Landmann','89220-670',NULL,NULL),(23,'Rua Antônio de Freitas','89218-601',NULL,NULL),(24,'Rua Antônio Geraldo Pereira','89219-250',NULL,NULL),(25,'Rua Antônio Honorato Maria','89220-845',NULL,NULL),(26,'Rua Antônio Schmidt','89220-155',NULL,NULL),(27,'Rua Antonio Schmitt','89220-333',NULL,NULL),(28,'Rua Araquã','89220-120',NULL,NULL),(29,'Rua Aristiliano Alves Ferreira','89220-527',NULL,NULL),(30,'Rua Arlindo Mertens','89218-602',NULL,NULL),(31,'Rua Arthur Mendes','89220-560',NULL,NULL),(32,'Rua Augusto Bruno Nielson','89219-201',NULL,NULL),(33,'Rua Augusto Klimeck','89217-305',NULL,NULL),(34,'Rua Augusto Wunderwald','89219-190',NULL,NULL),(35,'Rua Barão de Batovi','89219-164',NULL,NULL),(36,'Rua Bem-Te-Vi','89220-090',NULL,NULL),(37,'Rua Benedito Campos','89218-260',NULL,NULL),(38,'Rua Bernardo Welter','89220-230',NULL,NULL),(39,'Rua Bruno Kupsch','89220-540',NULL,NULL),(40,'Rua Canário Belga','89220-070',NULL,NULL),(41,'Rua Caratinga','89220-260',NULL,NULL),(42,'Rua Carlos Von Zeska','89217-720',NULL,NULL),(43,'Rua Carlos Willy Boeh','89218-325',NULL,NULL),(44,'Rua Cézar Grunentald','89217-760',NULL,NULL),(45,'Rua Claudionor Borba','89220-510',NULL,NULL),(46,'Rua Claudionor Uriarte','89219-150',NULL,NULL),(47,'Rua Codornas','89220-050',NULL,NULL),(48,'Rua Colibri','89220-210',NULL,NULL),(49,'Rua Comandante Abdon Senna','89218-630',NULL,NULL),(50,'Rua Comandante Irapuã','89218-620',NULL,NULL),(51,'Rua Comandante Paulo Serra','89218-660',NULL,NULL),(52,'Rua Comandante Telles de Mendonça','89218-680',NULL,NULL),(53,'Rua Correia Pinto','89220-330',NULL,NULL),(54,'Rua Crystabel S Dória','89219-350',NULL,NULL),(55,'Rua Cuiabá','89220-110',NULL,NULL),(56,'Rua Curió','89220-040',NULL,NULL),(57,'Rua das Cabelereiras','89220-740',NULL,NULL),(58,'Rua das Cerejeira','89220-523',NULL,NULL),(59,'Rua das Costureiras','89220-750',NULL,NULL),(60,'Rua das Doceiras','89220-710',NULL,NULL),(61,'Rua das Domésticas','89220-700',NULL,NULL),(62,'Rua das Rendeiras','89220-760',NULL,NULL),(63,'Rua Deputada Ivete Vargas','89219-230',NULL,NULL),(64,'Rua Dez','89220-351',NULL,NULL),(65,'Rua Diogo Dias Velho','89217-330',NULL,NULL),(66,'Rua Dona Elsa Meinert','89217-380',NULL,NULL),(67,'Rua Dona Elza Meiner','89218-650',NULL,NULL),(68,'Rua Doutor David Ernesto de Oliveira','89218-410',NULL,NULL),(69,'Rua Duarte Schuttel','89220-310',NULL,NULL),(70,'Rua Edgar Klein','89218-450',NULL,NULL),(71,'Rua Edgar Pinheiro','89220-302',NULL,NULL),(72,'Rua Eduardo Brodbeck','89217-740',NULL,NULL),(73,'Rua Egon Bachtold','89217-785',NULL,NULL),(74,'Rua Emil Stegemann','89220-360',NULL,NULL),(75,'Rua Engelberto Hagelmann','89217-340',NULL,NULL),(76,'Rua Engenheiro Gunther','89217-315',NULL,NULL),(77,'Rua Erna Bachtold','89217-435',NULL,NULL),(78,'Rua Ernesto Just','89217-750',NULL,NULL),(79,'Rua Erwin Seiller','89217-770',NULL,NULL),(80,'Rua Eugênio Fleischer','89218-480',NULL,NULL),(81,'Rua Eugênio Scheunemann','89217-443',NULL,NULL),(82,'Rua Eugênio Wolter','89217-440',NULL,NULL),(83,'Rua Expedicionário Alfredo Bartz','89220-878',NULL,NULL),(84,'Rua Expedicionário Alvino Souza','89220-876',NULL,NULL),(85,'Rua Expedicionário André Randig','89220-877',NULL,NULL),(86,'Rua Expedicionário Paulo Rathunde','89220-866',NULL,NULL),(87,'Rua Expedicionário Reinoldo Millnitz','89220-879',NULL,NULL),(88,'Rua Fermino Valentin Cardozo','89220-790',NULL,NULL),(89,'Rua Francisco Salfer','89219-166',NULL,NULL),(90,'Rua Frederico Bibow Júnior','89217-336',NULL,NULL),(91,'Rua Frederico Eic','89218-335',NULL,NULL),(92,'Rua Frederico Koentopp','89219-180',NULL,NULL),(93,'Rua Frederico Lange','89219-120',NULL,NULL),(94,'Rua Frederico Wegner Filho','89220-810',NULL,NULL),(95,'Rua Fritz Koelling','89219-130',NULL,NULL),(96,'Rua Garça Branca','89220-163',NULL,NULL),(97,'Rua Geny Peixer','89218-610',NULL,NULL),(98,'Rua Gercy Rodrigues Alves','89218-350',NULL,NULL),(99,'Rua Giovanni Cattoni','89220-872',NULL,NULL),(100,'Rua Gralha','89220-175',NULL,NULL),(101,'Rua Graúna','89220-130',NULL,NULL),(102,'Rua Guilherme Finkbeiner','89220-420',NULL,NULL),(103,'Rua Guilherme Schroeder','89220-195',NULL,NULL),(104,'Rua Guilhermina Heidemann de Oliveira','89220-865',NULL,NULL),(105,'Rua Helena Degelmann','89218-580',NULL,NULL),(106,'Rua Helga Arndt','89220-515',NULL,NULL),(107,'Rua Henrique Miers','89218-600',NULL,NULL),(108,'Rua Hermann Lange','89219-160',NULL,NULL),(109,'Rua Higino Aguiar','89219-320',NULL,NULL),(110,'Rua Iguatemi','89220-240',NULL,NULL),(111,'Rua Iracema de Alencar','89220-220',NULL,NULL),(112,'Rua Iuna','89219-260',NULL,NULL),(113,'Rua Jacob','89220-500',NULL,NULL),(114,'Rua Jaó','89220-160',NULL,NULL),(115,'Rua João Adolfo Muller','89218-590',NULL,NULL),(116,'Rua João Antônio Schadeck','89219-155',NULL,NULL),(117,'Rua João Dietrich','89219-140',NULL,NULL),(118,'Rua João Dumke','89220-025',NULL,NULL),(119,'Rua João Hercílio dos Santos','89220-525',NULL,NULL),(120,'Rua João José Clemente','89220-868',NULL,NULL),(121,'Rua João Koneski','89218-585',NULL,NULL),(122,'Rua João Pesso','89218-533',NULL,NULL),(123,'Rua Joaquim Cercal Sobrinho','89218-568',NULL,NULL),(124,'Rua Joaquim de Paula Tavares','89220-820',NULL,NULL),(125,'Rua Joaquim Lisboa','89220-440',NULL,NULL),(126,'Rua José de Picolli Mattei','89218-523',NULL,NULL),(127,'Rua José Gomes de Freitas','89220-780',NULL,NULL),(128,'Rua José Manoel de Souza','89220-410',NULL,NULL),(129,'Rua José Salomon','89217-710',NULL,NULL),(130,'Rua Jovita Azevedo','89220-305',NULL,NULL),(131,'Rua Jurandir de Lima Mathias','89218-586',NULL,NULL),(132,'Rua Juriti','89220-010',NULL,NULL),(133,'Rua Juta W G Wendel','89218-470',NULL,NULL),(134,'Rua Landmann','89217-420',NULL,NULL),(135,'Rua Laranjeiras do Sul','89220-190',NULL,NULL),(136,'Rua Lauro Zimermann Júnior','89219-168',NULL,NULL),(137,'Rua Leonor Gonçalves','89218-565',NULL,NULL),(138,'Rua Leopoldo Ackermann','89217-790',NULL,NULL),(139,'Rua Leopoldo Alvino Reeck','89220-027',NULL,NULL),(140,'Rua Lourival Francisco Rita','89220-460',NULL,NULL),(141,'Rua Luiz Bachtold','89220-300',NULL,NULL),(142,'Rua Luiz Carlos Schroeder','89220-840',NULL,NULL),(143,'Rua Luiz Fidélis Angelli','89220-867',NULL,NULL),(144,'Rua Luiza Maria de Moraes','89220-830',NULL,NULL),(145,'Rua Macuco','89220-170',NULL,NULL),(146,'Rua Manoel da Luz Fontes','89219-220',NULL,NULL),(147,'Rua Manoel Lamin','89220-520',NULL,NULL),(148,'Rua Marcílio Dia','89218-543',NULL,NULL),(149,'Rua Marcos Rosa','89220-306',NULL,NULL),(150,'Rua Maria Alves Ferreira','89220-529',NULL,NULL),(151,'Rua Maria Judith Lopes Pereira','89220-832',NULL,NULL),(152,'Rua Maria Rosalina Speck','89220-730',NULL,NULL),(153,'Rua Mário Timm','89220-250',NULL,NULL),(154,'Rua Martiminiano Cercal','89218-670',NULL,NULL),(155,'Rua Max Lepper','89217-360',NULL,NULL),(156,'Rua Miguel José de Freitas','89220-531',NULL,NULL),(157,'Rua Moacyr Gomes de Oliveira','89219-360',NULL,NULL),(158,'Rua Nair Layde Santos Rocha da Silva','89218-603',NULL,NULL),(159,'Rua Nelson da Silva','89220-450',NULL,NULL),(160,'Rua Nelson Rodrigues','89219-145',NULL,NULL),(161,'Rua Olandina Vieira','89218-332',NULL,NULL),(162,'Rua Oscar Rosas','89220-320',NULL,NULL),(163,'Rua Otto Arno Schwartz','89219-380',NULL,NULL),(164,'Rua Otto Augusto Guilherme Urban','89218-355',NULL,NULL),(165,'Rua Otto Kersten','89219-170',NULL,NULL),(166,'Rua Padre José Sandrup','89218-530',NULL,NULL),(167,'Rua Pardal','89220-080',NULL,NULL),(168,'Rua Parintintins','89217-334',NULL,NULL),(169,'Rua Paulo Liermann','89219-240',NULL,NULL),(170,'Rua Pedro Alvaro Schmoeller','89220-870',NULL,NULL),(171,'Rua Pedro Mariano de Borba','89220-550',NULL,NULL),(172,'Rua Pero Vaz de Caminha','89218-520',NULL,NULL),(173,'Rua Pintassilgo','89220-060',NULL,NULL),(174,'Rua Piritiba','89219-020',NULL,NULL),(175,'Rua Poetisa Júlia de Costa','89220-280',NULL,NULL),(176,'Rua Presidente Prudente de Morae','89218-503',NULL,NULL),(177,'Rua Procópio Ferreira','89217-370',NULL,NULL),(178,'Rua Professor Felício Fuzinato','89218-420',NULL,NULL),(179,'Rua Professor Humberto Rohden','89219-330',NULL,NULL),(180,'Rua Professor James Fruhstuck','89218-550',NULL,NULL),(181,'Rua Professor Pedro Vieira','89218-560',NULL,NULL),(182,'Rua Professor Rodrigues Freita','89217-401',NULL,NULL),(183,'Rua Professor Schutzle','89219-010',NULL,NULL),(184,'Rua Professor Trindade','89220-400',NULL,NULL),(185,'Rua Professora Maria Borges da Silva','89218-507',NULL,NULL),(186,'Rua Promotor Ary Silveira de Souza','89219-300',NULL,NULL),(187,'Rua Psicanalista Hélio Pellegrino','89220-270',NULL,NULL),(188,'Rua Recreativa da Embraco','89219-171',NULL,NULL),(189,'Rua Rio Comprido','89218-330',NULL,NULL),(190,'Rua Roberto Hermann','89217-725',NULL,NULL),(191,'Rua Roberto Wolf','89219-162',NULL,NULL),(192,'Rua Rodolfo Plotow','89217-310',NULL,NULL),(193,'Rua Rodolpho Bauer','89218-505',NULL,NULL),(194,'Rua Ronaldo G Kluge','89220-350',NULL,NULL),(195,'Rua Rudolf Stutzer','89219-390',NULL,NULL),(196,'Rua Sabiá','89220-030',NULL,NULL),(197,'Rua Sanhaçu','89220-150',NULL,NULL),(198,'Rua Santa Sé','89218-415',NULL,NULL),(199,'Rua São Jorge','89218-510',NULL,NULL),(200,'Rua São Marcos','89218-515',NULL,NULL),(201,'Rua São Mathias','89220-564',NULL,NULL),(202,'Rua Saturno','89219-110',NULL,NULL),(203,'Rua Senador Mathias Schroeder','89218-570',NULL,NULL),(204,'Rua Senador Nilo Coelho','89219-340',NULL,NULL),(205,'Rua Senador Teotônio Vilela','89219-310',NULL,NULL),(206,'Rua Simone Dominoni Gonçalves','89220-890',NULL,NULL),(207,'Rua Souza Lobo','89220-340',NULL,NULL),(208,'Rua Tereza Werner','89220-855',NULL,NULL),(209,'Rua Thomaz de Carvalho Meyer','89218-440',NULL,NULL),(210,'Rua Valter Peters','89220-430',NULL,NULL),(211,'Rua Vereador Arnoldo Wetzel','89218-360',NULL,NULL),(212,'Rua Vereador Conrado de Mira','89218-430',NULL,NULL),(213,'Rua Vereador Hubert Hubner','89219-210',NULL,NULL),(214,'Rua Vereador Kurt Alvino Monich','89217-700',NULL,NULL),(215,'Rua Vereador Paulo Ewald Júnior','89219-305',NULL,NULL),(216,'Rua Veroni Pedro Graciano','89220-660',NULL,NULL),(217,'Rua Victor Kursancew','89218-400',NULL,NULL),(218,'Rua Victor Muller','89218-460',NULL,NULL),(219,'Rua Vinícius de Moraes','89220-620',NULL,NULL),(220,'Rua Waldir Azevedo','89220-630',NULL,NULL),(221,'Rua Walmor Harger','89220-650',NULL,NULL),(222,'Rua Walter Otto Monich','89217-730',NULL,NULL),(223,'Rua Willy A Jacob','89220-720',NULL,NULL),(224,'Rua Wolfgang Amon','89217-350',NULL,NULL),(225,'Rua Xororó','89220-165',NULL,NULL),(226,'Servidão Affonso Cardoso','89218-525',NULL,NULL),(227,'Servidão Alfredo Volpi','89217-428',NULL,NULL),(228,'Servidão Avelino Ramiro Pauli','89218-572',NULL,NULL),(229,'Servidão Eugênio Krüger','89217-355',NULL,NULL),(230,'Servidão Gustavo Guilherme Reinold Kuhn','89220-610',NULL,NULL),(231,'Servidão Hilda Marta Haake','89217-390',NULL,NULL),(232,'Servidão Himmemblau','89217-795',NULL,NULL),(233,'Servidão Jimmy Hendrix','89219-163',NULL,NULL),(234,'Servidão João Crispim da Luz','89217-430',NULL,NULL),(235,'Servidão José Francisco da Rosa','89218-540',NULL,NULL),(236,'Servidão Leopoldo Eugênio Laufer','89218-535',NULL,NULL),(237,'Servidão Leopoldo Kubas','89218-506',NULL,NULL),(238,'Servidão Luiz Zoellner','89219-142',NULL,NULL),(239,'Servidão Nilson Dias Bexiga','89220-783',NULL,NULL),(240,'Servidão Orlando Jair Veiga','89217-480',NULL,NULL),(241,'Servidão República da Eslovênia','89220-562',NULL,NULL),(242,'Servidão Ricardo Bibow','89217-337',NULL,NULL),(243,'Servidão Rodrigo Cezario Chaves','89218-542',NULL,NULL),(244,'Servidão Willy Heinzl','89218-578',NULL,NULL);
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-23 21:43:53
