-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema data_warehouse_2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `data_warehouse_2` DEFAULT CHARACTER SET utf8mb4 ;
USE `data_warehouse_2` ;

-- -----------------------------------------------------
-- Table `data_warehouse_2`.`compania`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `data_warehouse_2`.`compania` (
  `companiaID` INT NOT NULL AUTO_INCREMENT,
  `companiaDescripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`companiaID`))
ENGINE = InnoDB;


-- -----------------------------------------
-- insert en tabla compania
-- -----------------------------------------

INSERT INTO `data_warehouse_2`.`compania` (`companiaID`, `companiaDescripcion`) VALUES ('1', 'Facebook');
INSERT INTO `data_warehouse_2`.`compania` (`companiaID`, `companiaDescripcion`) VALUES ('2', 'Whathsapp');
INSERT INTO `data_warehouse_2`.`compania` (`companiaID`, `companiaDescripcion`) VALUES ('3', 'Twitter');
INSERT INTO `data_warehouse_2`.`compania` (`companiaID`, `companiaDescripcion`) VALUES ('4', 'Instagram');

-- -----------------------------------------------------
-- Table `data_warehouse_2`.`Region`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `data_warehouse_2`.`Region` (
  `RegionID` INT NOT NULL AUTO_INCREMENT,
  `RegionDescripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`RegionID`))
ENGINE = InnoDB;

-- -----------------------------------------
-- insert en tabla regiones
-- -----------------------------------------

INSERT INTO `data_warehouse_2`.`region` (`RegionID`, `RegionDescripcion`) VALUES ('1', 'Asia');
INSERT INTO `data_warehouse_2`.`region` (`RegionID`, `RegionDescripcion`) VALUES ('2', 'Africa');
INSERT INTO `data_warehouse_2`.`region` (`RegionID`, `RegionDescripcion`) VALUES ('3', 'Europa');
INSERT INTO `data_warehouse_2`.`region` (`RegionID`, `RegionDescripcion`) VALUES ('4', 'America');


-- -----------------------------------------------------
-- Table `data_warehouse_2`.`paises`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `data_warehouse_2`.`paises` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` TEXT NOT NULL,
  `Region_RegionID` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_paises_Region_idx` (`Region_RegionID` ASC) ,
  CONSTRAINT `fk_paises_Region`
    FOREIGN KEY (`Region_RegionID`)
    REFERENCES `data_warehouse_2`.`Region` (`RegionID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 251
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;

-- -----------------------------------------
-- insert en tabla paises
-- -----------------------------------------

INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('1', 'Afganistan', '1');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('2', 'Butan', '1');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('3', 'Indonesia', '1');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('4', 'Laos', '1');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('5', 'Malasia', '1');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('6', 'Angola', '2');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('7', 'Republica del congo', '2');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('8', 'Madagascar', '2');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('9', 'Nigeria', '2');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('10', 'Zimbabwe', '2');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('11', 'Portugal', '3');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('12', 'Italia', '3');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('13', 'Suiza', '3');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('14', 'Noruega', '3');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('15', 'Holanda', '3');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('16', 'Argentina', '4');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('17', 'Brasil', '4');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('18', 'Mexico', '4');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('19', 'Uruguay', '4');
INSERT INTO `data_warehouse_2`.`paises` (`id`, `nombre`, `Region_RegionID`) VALUES ('20', 'Costa Rica', '4');


-- -----------------------------------------------------
-- Table `data_warehouse_2`.`ciudad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `data_warehouse_2`.`ciudad` (
  `ciudadID` INT NOT NULL AUTO_INCREMENT,
  `ciudadDescripcion` VARCHAR(45) NOT NULL,
  `paises_id` INT(11) NOT NULL,
  PRIMARY KEY (`ciudadID`),
  INDEX `fk_ciudad_paises1_idx` (`paises_id` ASC) ,
  CONSTRAINT `fk_ciudad_paises1`
    FOREIGN KEY (`paises_id`)
    REFERENCES `data_warehouse_2`.`paises` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------
-- insert en tabla ciudades 
-- -----------------------------------------
INSERT INTO `data_warehouse_2`.`ciudad` (`ciudadID`, `ciudadDescripcion`, `paises_id`) VALUES ('1', 'Kabul', '1');
INSERT INTO `data_warehouse_2`.`ciudad` (`ciudadID`, `ciudadDescripcion`, `paises_id`) VALUES ('2', 'Kandahar', '1');
INSERT INTO `data_warehouse_2`.`ciudad` (`ciudadID`, `ciudadDescripcion`, `paises_id`) VALUES ('3', 'Timbu', '2');
INSERT INTO `data_warehouse_2`.`ciudad` (`ciudadID`, `ciudadDescripcion`, `paises_id`) VALUES ('4', 'Jakar', '2');
INSERT INTO `data_warehouse_2`.`ciudad` (`ciudadID`, `ciudadDescripcion`, `paises_id`) VALUES ('5', 'Yakarta', '3');
INSERT INTO `data_warehouse_2`.`ciudad` (`ciudadID`, `ciudadDescripcion`, `paises_id`) VALUES ('6', 'Vang Vieng', '4');
INSERT INTO `data_warehouse_2`.`ciudad` (`ciudadID`, `ciudadDescripcion`, `paises_id`) VALUES ('7', 'Malaca', '5');
INSERT INTO `data_warehouse_2`.`ciudad` (`ciudadID`, `ciudadDescripcion`, `paises_id`) VALUES ('8', 'Luanda', '6');
INSERT INTO `data_warehouse_2`.`ciudad` (`ciudadID`, `ciudadDescripcion`, `paises_id`) VALUES ('9', 'Matadi', '7');
INSERT INTO `data_warehouse_2`.`ciudad` (`ciudadID`, `ciudadDescripcion`, `paises_id`) VALUES ('10', 'Lisboa', '11');
INSERT INTO `data_warehouse_2`.`ciudad` (`ciudadID`, `ciudadDescripcion`, `paises_id`) VALUES ('11', 'roma', '12');
INSERT INTO `data_warehouse_2`.`ciudad` (`ciudadID`, `ciudadDescripcion`, `paises_id`) VALUES ('12', 'Basilea', '13');
INSERT INTO `data_warehouse_2`.`ciudad` (`ciudadID`, `ciudadDescripcion`, `paises_id`) VALUES ('13', 'Oslo', '14');
INSERT INTO `data_warehouse_2`.`ciudad` (`ciudadID`, `ciudadDescripcion`, `paises_id`) VALUES ('14', 'Amsterdam', '15');
INSERT INTO `data_warehouse_2`.`ciudad` (`ciudadID`, `ciudadDescripcion`, `paises_id`) VALUES ('15', 'Salta La Linda', '16');
INSERT INTO `data_warehouse_2`.`ciudad` (`ciudadID`, `ciudadDescripcion`, `paises_id`) VALUES ('16', 'Rio do Janeiro', '17');


-- -----------------------------------------------------
-- Table `data_warehouse_2`.`contactos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `data_warehouse_2`.`contactos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(20) NOT NULL,
  `apellido` VARCHAR(20) NOT NULL,
  `email` VARCHAR(40) NOT NULL,
  `telefono` TEXT NOT NULL,
  `pais` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `region` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `compania` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `cargo` VARCHAR(40) NOT NULL,
  `canal_preferido` TEXT NOT NULL,
  `compania_companiaID` INT NOT NULL,
  `ciudad_ciudadID` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_contactos_compania1_idx` (`compania_companiaID` ASC) ,
  INDEX `fk_contactos_ciudad1_idx` (`ciudad_ciudadID` ASC) ,
  CONSTRAINT `fk_contactos_compania1`
    FOREIGN KEY (`compania_companiaID`)
    REFERENCES `data_warehouse_2`.`compania` (`companiaID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contactos_ciudad1`
    FOREIGN KEY (`ciudad_ciudadID`)
    REFERENCES `data_warehouse_2`.`ciudad` (`ciudadID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 46
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------
-- insert en tabla contactos
-- -----------------------------------------

INSERT INTO `contactos` (`id`, `nombre`, `apellido`, `email`, `telefono`, `pais`, `cargo`, `canal_preferido`, `compania_companiaID`,`ciudad_ciudadID`) VALUES
(1, 'Mariano', 'Collavino', 'mcollavino64@gmail.com', '123456789', 'Argentina', 'Desarrollador Full Stack', 'Email,Whatsapp,Facebook',1,1),
(2, 'Juan', 'Collavino', 'jcollavino@gmail.com', '2323', 'Argentina', 'Desarrollador Full Stack', 'Telefono,Email',1,1),
(3, 'Frankie', 'Collavino', 'Frankie@inox.com', '1213243', 'Argentina', 'TheBoss', 'Whatsapp',1,1);

SELECT * FROM contactos

-- -----------------------------------------------------
-- Table `data_warehouse_2`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `data_warehouse_2`.`usuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(20) NOT NULL,
  `apellido` VARCHAR(20) NOT NULL,
  `usuario` VARCHAR(20) NOT NULL,
  `email` VARCHAR(20) NOT NULL,
  `contrasena` TEXT NOT NULL,
  `telefono` TEXT NOT NULL,
  `domicilio` TEXT NOT NULL,
  `admin` TINYINT(1) NOT NULL DEFAULT 0,
  `compania_companiaID` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuarios_compania1_idx` (`compania_companiaID` ASC) ,
  CONSTRAINT `fk_usuarios_compania1`
    FOREIGN KEY (`compania_companiaID`)
    REFERENCES `data_warehouse_2`.`compania` (`companiaID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 30
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------
-- insert en tabla USUARIOS
-- -----------------------------------------


INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `usuario`, `email`, `contrasena`, `telefono`, `domicilio`, `admin`,`compania_companiaID`) VALUES
(1, 'Mariano', 'Collavino', 'Macollavino', 'macollavino64@gmail.com', '123', '12345678', 'Temperley BsAs', 1,1),
(2, 'Acamica', 'DWFS', 'Acamica', 'hola@acamica.com', '123', '08000132123213', 'Buenos Aires, Argentina', 0,2);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
