CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_of_birth` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=513 DEFAULT CHARSET=utf8;
SELECT * FROM heroku_b9591a250142bf1.user;