'use strict';

var dbm;
var type;
var seed;
const sequelize = require('../src/db/db-sequelize')
/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function() {
  return sequelize.query(
    "INSERT INTO `district` (`id`, `region_id`, `name`) VALUES\
(1, 1, 'Amudaryo tumani'),\
(2, 1, 'Beruniy tumani'),\
(3, 1, 'Kegayli tumani'),\
(4, 1, 'Qonliko‘l tumani'),\
(5, 1, 'Qorao‘zak tumani'),\
(6, 1, 'Qo‘ng‘irot tumani'),\
(7, 1, 'Mo‘ynoq tumani'),\
(8, 1, 'Nukus tumani'),\
(9, 1, 'Nukus shahri'),\
(10, 1, 'Taxtako‘pir tumani'),\
(11, 1, 'To‘rtko‘l tumani'),\
(12, 1, 'Xo‘jayli tumani'),\
(13, 1, 'Chimboy tumani'),\
(14, 1, 'Shumanay tumani'),\
(15, 1, 'Ellikqal‘a tumani'),\
(16, 2, 'Andijon shahri'),\
(17, 2, 'Andijon tumani'),\
(18, 2, 'Asaka tumani'),\
(19, 2, 'Baliqchi tumani'),\
(20, 2, 'Buloqboshi tumani'),\
(21, 2, 'Bo‘z tumani'),\
(22, 2, 'Jalaquduq tumani'),\
(23, 2, 'Izbosgan tumani'),\
(24, 2, 'Qorasuv shahri'),\
(25, 2, 'Qo‘rg‘ontepa tumani'),\
(26, 2, 'Marhamat tumani'),\
(27, 2, 'Oltinko‘l tumani'),\
(28, 2, 'Paxtaobod tumani'),\
(29, 2, 'Ulug‘nor tumani'),\
(30, 2, 'Xonobod shahri'),\
(31, 2, 'Xo‘jaobod tumani'),\
(32, 2, 'Shaxrixon tumani'),\
(33, 3, 'Buxoro shahri'),\
(34, 3, 'Buxoro tumani'),\
(35, 3, 'Vobkent tumani'),\
(36, 3, 'G‘ijduvon tumani'),\
(37, 3, 'Jondor tumani'),\
(38, 3, 'Kogon tumani'),\
(39, 3, 'Kogon shahri'),\
(40, 3, 'Qorako‘l tumani'),\
(41, 3, 'Qorovulbozor tumani'),\
(42, 3, 'Olot tumani'),\
(43, 3, 'Peshku tumani'),\
(44, 3, 'Romitan tumani'),\
(45, 3, 'Shofirkon tumani'),\
(46, 4, 'Arnasoy tumani'),\
(47, 4, 'Baxmal tumani'),\
(48, 4, 'G‘allaorol tumani'),\
(49, 4, 'Do‘stlik tumani'),\
(50, 4, 'Sh.Rashidov tumani'),\
(51, 4, 'Jizzax shahri'),\
(52, 4, 'Zarbdor tumani'),\
(53, 4, 'Zafarobod tumani'),\
(54, 4, 'Zomin tumani'),\
(55, 4, 'Mirzacho‘l tumani'),\
(56, 4, 'Paxtakor tumani'),\
(57, 4, 'Forish tumani'),\
(58, 4, 'Yangiobod tumani'),\
(59, 5, 'G‘uzor tumani'),\
(60, 5, 'Dehqonobod tumani'),\
(61, 5, 'Qamashi tumani'),\
(62, 5, 'Qarshi tumani'),\
(63, 5, 'Qarshi shahri'),\
(64, 5, 'Kasbi tumani'),\
(65, 5, 'Kitob tumani'),\
(66, 5, 'Koson tumani'),\
(67, 5, 'Mirishkor tumani'),\
(68, 5, 'Muborak tumani'),\
(69, 5, 'Nishon tumani'),\
(70, 5, 'Chiroqchi tumani'),\
(71, 5, 'Shahrisabz tumani'),\
(72, 5, 'Yakkabog‘ tumani'),\
(73, 6, 'Zarafshon shahri'),\
(74, 6, 'Karman tumani'),\
(75, 6, 'Qiziltepa tumani'),\
(76, 6, 'Konimex tumani'),\
(77, 6, 'Navbahor tumani'),\
(78, 6, 'Navoiy shahri'),\
(79, 6, 'Nurota tumani'),\
(80, 6, 'Tomdi tumani'),\
(81, 6, 'Uchquduq tumani'),\
(82, 6, 'Xatirchi tumani'),\
(83, 7, 'Kosonsoy tumani'),\
(84, 7, 'Mingbuloq tumani'),\
(85, 7, 'Namangan tumani'),\
(86, 7, 'Namangan shahri'),\
(87, 7, 'Norin tumani'),\
(88, 7, 'Pop tumani'),\
(89, 7, 'To‘raqo‘rg‘on tumani'),\
(90, 7, 'Uychi tumani'),\
(91, 7, 'Uchqo‘rg‘on tumani'),\
(92, 7, 'Chortoq tumani'),\
(93, 7, 'Chust tumani'),\
(94, 7, 'Yangiqo‘rg‘on tumani'),\
(95, 8, 'Bulung‘ur tumani'),\
(96, 8, 'Jomboy tumani'),\
(97, 8, 'Ishtixon tumani'),\
(98, 8, 'Kattaqo‘rg‘on tumani'),\
(99, 8, 'Kattaqo‘rg‘on shahri'),\
(100, 8, 'Qo‘shrabot tumani'),\
(101, 8, 'Narpay tumani'),\
(102, 8, 'Nurabod tumani'),\
(103, 8, 'Oqdaryo tumani'),\
(104, 8, 'Payariq tumani'),\
(105, 8, 'Pastarg‘om tumani'),\
(106, 8, 'Paxtachi tumani'),\
(107, 8, 'Samarqand tumani'),\
(108, 8, 'Samarqand shahri'),\
(109, 8, 'Toyloq tumani'),\
(110, 8, 'Urgut tumani'),\
(112, 9, 'Angor tumani'),\
(113, 9, 'Boysun tumani'),\
(114, 9, 'Denov tumani'),\
(115, 9, 'Jarqo‘rg‘on tumani'),\
(116, 9, 'Qiziriq tumani'),\
(117, 9, 'Qo‘mqo‘rg‘on tumani'),\
(118, 9, 'Muzrabot tumani'),\
(119, 9, 'Oltinsoy tumani'),\
(120, 9, 'Sariosiy tumani'),\
(121, 9, 'Termiz tumani'),\
(122, 9, 'Termiz shahri'),\
(123, 9, 'Uzun tumani'),\
(124, 9, 'Sherobod tumani'),\
(125, 9, 'Sho‘rchi tumani'),\
(126, 10, 'Boyovut tumani'),\
(127, 10, 'Guliston tumani'),\
(128, 10, 'Guliston shahri'),\
(129, 10, 'Mirzaobod tumani'),\
(130, 10, 'Oqoltin tumani'),\
(131, 10, 'Sayxunobod tumani'),\
(132, 10, 'Sardoba tumani'),\
(133, 10, 'Sirdaryo tumani'),\
(134, 10, 'Xavos tumani'),\
(135, 10, 'Shirin shahri'),\
(136, 10, 'Yangiyer shahri'),\
(137, 11, 'Angiren shahri'),\
(138, 11, 'Bekabod tumani'),\
(139, 11, 'Bekabod shahri'),\
(140, 11, 'Bo‘ka tumani'),\
(141, 11, 'Bo‘stonliq tumani'),\
(142, 11, 'Zangiota tumani'),\
(143, 11, 'Qibray tumani'),\
(144, 11, 'Quyichirchiq tumani'),\
(145, 11, 'Oqqo‘rg‘on tumani'),\
(146, 11, 'Olmaliq shahri'),\
(147, 11, 'Ohangaron tumani'),\
(148, 11, 'Parkent tumani'),\
(149, 11, 'Piskent tumani'),\
(150, 11, 'O‘rtachirchiq tumani'),\
(151, 11, 'Chinoz tumani'),\
(152, 11, 'Chirchiq shahri'),\
(153, 11, 'Yuqorichirchiq tumani'),\
(154, 11, 'Yangiyo‘l tumani'),\
(155, 12, 'Beshariq tumani'),\
(156, 12, 'Bog‘dod tumani'),\
(157, 12, 'Buvayda tumani'),\
(158, 12, 'Dang‘ara tumani' ),\
(159, 12, 'Yozyovon tumani'),\
(160, 12, 'Quva tumani'),\
(161, 12, 'Quvasoy shahri'),\
(162, 12, 'Qo‘qon shahri'),\
(163, 12, 'Qo‘shtepa tumani'),\
(164, 12, 'Marg‘ilon shahri'),\
(165, 12, 'Oltiariq tumani'),\
(166, 12, 'Rishton tumani'),\
(167, 12, 'So‘x tumani'),\
(168, 12, 'Toshloq tumani'),\
(169, 12, 'Uchko‘prik tumani'),\
(170, 12, 'O‘zbekiston tumani'),\
(171, 12, 'Farg‘ona tumani'),\
(172, 12, 'Farg‘ona shahri'),\
(173, 12, 'Furqat tumani'),\
(174, 13, 'Bog‘ot tumani'),\
(175, 13, 'Gurlan tumani'),\
(176, 13, 'Qo‘shko‘pir tumani'),\
(177, 13, 'Urganch tumani'),\
(178, 13, 'Urganch shahri'),\
(179, 13, 'Xiva tumani'),\
(180, 13, 'Xazarasp tumani'),\
(181, 13, 'Xonqa tumani'),\
(182, 13, 'Shavot tumani'),\
(183, 13, 'Yangiariq tumani'),\
(184, 13, 'Yangibozor tumani'),\
(185, 14, 'Bektimer tumani'),\
(186, 14, 'Mirzo Ulugbek tumani'),\
(187, 14, 'Mirobod tumani'),\
(188, 14, 'Olmazor tumani'),\
(189, 14, 'Sirgali tumani'),\
(190, 14, 'Uchtepa tumani'),\
(191, 14, 'Yashnobod tumani'),\
(192, 14, 'Chilonzor tumani'),\
(193, 14, 'Shayxontohur tumani'),\
(194, 14, 'Yunusobod tumani'),\
(195, 14, 'Yakkasaroy tumani')\
"
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
