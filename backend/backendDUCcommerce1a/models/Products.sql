CREATE TABLE `duccommerce1a`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(10000) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `price` FLOAT NOT NULL,
  `url_img` VARCHAR(1000) NOT NULL,
  `owner_email` VARCHAR(100) NOT NULL,
  `tel` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`));
