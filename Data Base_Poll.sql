/*
Navicat MySQL Data Transfer

Source Server         : Poll
Source Server Version : 50508
Source Host           : localhost:3306
Source Database       : poll

Target Server Type    : MYSQL
Target Server Version : 50508
File Encoding         : 65001

Date: 2014-07-13 23:31:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `options`
-- ----------------------------
DROP TABLE IF EXISTS `options`;
CREATE TABLE `options` (
  `id_quest` int(8) NOT NULL,
  `option` char(50) NOT NULL,
  `id_vote` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- ----------------------------
-- Records of options
-- ----------------------------
INSERT INTO `options` VALUES ('1', 'бежать-бежать', '1');
INSERT INTO `options` VALUES ('1', 'наслаждаться', '2');
INSERT INTO `options` VALUES ('1', 'найти укрытие', '3');
INSERT INTO `options` VALUES ('1', 'идти дальше как ни в чем не бывало', '4');
INSERT INTO `options` VALUES ('2', 'Java', '1');
INSERT INTO `options` VALUES ('2', 'C++', '2');
INSERT INTO `options` VALUES ('2', 'Prolog', '3');
INSERT INTO `options` VALUES ('2', 'JavaScript', '4');
INSERT INTO `options` VALUES ('2', 'Lisp', '5');
INSERT INTO `options` VALUES ('2', 'C#', '6');
INSERT INTO `options` VALUES ('2', 'Pascal', '7');

-- ----------------------------
-- Table structure for `strawpoll`
-- ----------------------------
DROP TABLE IF EXISTS `strawpoll`;
CREATE TABLE `strawpoll` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `quest` char(150) NOT NULL,
  `mult_pass` int(1) NOT NULL,
  `mult_ip` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=cp1251;

-- ----------------------------
-- Records of strawpoll
-- ----------------------------
INSERT INTO `strawpoll` VALUES ('1', 'Пошёл дождь. Ваши действия?', '0', '1');
INSERT INTO `strawpoll` VALUES ('2', 'Любимый язык программирования?', '1', '1');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id_quest` int(8) NOT NULL,
  `ip_adress` char(15) CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- ----------------------------
-- Records of users
-- ----------------------------

-- ----------------------------
-- Table structure for `votes`
-- ----------------------------
DROP TABLE IF EXISTS `votes`;
CREATE TABLE `votes` (
  `id_quest` int(8) NOT NULL,
  `vote` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- ----------------------------
-- Records of votes
-- ----------------------------
INSERT INTO `votes` VALUES ('1', '1');
INSERT INTO `votes` VALUES ('1', '3');
INSERT INTO `votes` VALUES ('1', '2');
INSERT INTO `votes` VALUES ('1', '4');
INSERT INTO `votes` VALUES ('2', '1');
INSERT INTO `votes` VALUES ('2', '4');
INSERT INTO `votes` VALUES ('2', '7');
INSERT INTO `votes` VALUES ('1', '3');
