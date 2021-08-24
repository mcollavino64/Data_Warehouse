--
-- Base de datos: `data_warehouse`
--


CREATE TABLE `contactos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `apellido` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` text COLLATE utf8_spanish_ci NOT NULL,
  `pais` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `region` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `compania` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `cargo` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `canal_preferido` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- insert de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`id`, `nombre`, `apellido`, `email`, `telefono`, `pais`, `region`, `compania`, `cargo`, `canal_preferido`) VALUES
(1, 'Mariano', 'Collavino', 'mcollavino64@gmail.com', '123456789', 'Argentina', 'America', 'MarianoEnterprise', 'Desarrollador Full Stack', 'Email,Whatsapp,Facebook'),
(2, 'Juan', 'Collavino', 'jcollavino@gmail.com', '2323', 'Argentina', 'America', 'JRC COMPANY', 'Desarrollador Full Stack', 'Telefono,Email'),
(3, 'Frankie', 'Collavino', 'Frankie@inox.com', '1213243', 'Argentina', 'America', 'Frankie SRL', 'TheBoss', 'Whatsapp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--

CREATE TABLE `paises` (
  `id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci NOT NULL,
  `region` text COLLATE utf8_spanish_ci NOT NULL,
  `sub_region` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- insert de datos para la tabla `paises`
--

INSERT INTO `paises` (`id`, `nombre`, `region`, `sub_region`) VALUES
(1, 'Afghanistan', 'Asia', 'Southern Asia'),
(2, 'Åland Islands', 'Europa', 'Northern Europe'),
(3, 'Algeria', 'Africa', 'Northern Africa'),
(4, 'Albania', 'Europa', 'Southern Europe'),
(5, 'American Samoa', 'Oceania', 'Polynesia'),
(6, 'Andorra', 'Europa', 'Southern Europe'),
(7, 'Angola', 'Africa', 'Middle Africa'),
(8, 'Anguilla', 'America', 'Caribbean'),
(9, 'Antarctica', 'Polar', ''),
(10, 'Antigua and Barbuda', 'America', 'Caribbean'),
(11, 'Argentina', 'America', 'South America'),
(12, 'Armenia', 'Asia', 'Western Asia'),
(13, 'Aruba', 'America', 'Caribbean'),
(14, 'Australia', 'Oceania', 'Australia and New Zealand'),
(15, 'Austria', 'Europa', 'Western Europe'),
(16, 'Azerbaijan', 'Asia', 'Western Asia'),
(17, 'Bahamas', 'America', 'Caribbean'),
(18, 'Bahrain', 'Asia', 'Western Asia'),
(19, 'Bangladesh', 'Asia', 'Southern Asia'),
(20, 'Barbados', 'America', 'Caribbean'),
(21, 'Belarus', 'Europa', 'Eastern Europe'),
(22, 'Belgium', 'Europa', 'Western Europe'),
(23, 'Belize', 'America', 'Central America'),
(24, 'Benin', 'Africa', 'Western Africa'),
(25, 'Bermuda', 'America', 'Northern America'),
(26, 'Bhutan', 'Asia', 'Southern Asia'),
(27, 'Bolivia (Plurinational State of)', 'America', 'South America'),
(28, 'Bonaire, Sint Eustatius and Saba', 'America', 'Caribbean'),
(29, 'Bosnia and Herzegovina', 'Europa', 'Southern Europe'),
(30, 'Botswana', 'Africa', 'Southern Africa'),
(31, 'Bouvet Island', '', ''),
(32, 'Brazil', 'America', 'South America'),
(33, 'British Indian Ocean Territory', 'Africa', 'Eastern Africa'),
(34, 'United States Minor Outlying Islands', 'America', 'Northern America'),
(35, 'Virgin Islands (British)', 'America', 'Caribbean'),
(36, 'Virgin Islands (U.S.)', 'America', 'Caribbean'),
(37, 'Brunei Darussalam', 'Asia', 'South-Eastern Asia'),
(38, 'Bulgaria', 'Europa', 'Eastern Europe'),
(39, 'Burkina Faso', 'Africa', 'Western Africa'),
(40, 'Burundi', 'Africa', 'Eastern Africa'),
(41, 'Cambodia', 'Asia', 'South-Eastern Asia'),
(42, 'Cameroon', 'Africa', 'Middle Africa'),
(43, 'Canada', 'America', 'Northern America'),
(44, 'Cabo Verde', 'Africa', 'Western Africa'),
(45, 'Cayman Islands', 'America', 'Caribbean'),
(46, 'Central African Republic', 'Africa', 'Middle Africa'),
(47, 'Chad', 'Africa', 'Middle Africa'),
(48, 'Chile', 'America', 'South America'),
(49, 'China', 'Asia', 'Eastern Asia'),
(50, 'Christmas Island', 'Oceania', 'Australia and New Zealand'),
(51, 'Cocos (Keeling) Islands', 'Oceania', 'Australia and New Zealand'),
(52, 'Colombia', 'America', 'South America'),
(53, 'Comoros', 'Africa', 'Eastern Africa'),
(54, 'Congo', 'Africa', 'Middle Africa'),
(55, 'Congo (Democratic Republic of the)', 'Africa', 'Middle Africa'),
(56, 'Cook Islands', 'Oceania', 'Polynesia'),
(57, 'Costa Rica', 'America', 'Central America'),
(58, 'Croatia', 'Europa', 'Southern Europe'),
(59, 'Cuba', 'America', 'Caribbean'),
(60, 'Curaçao', 'America', 'Caribbean'),
(61, 'Cyprus', 'Europa', 'Southern Europe'),
(62, 'Czech Republic', 'Europa', 'Eastern Europe'),
(63, 'Denmark', 'Europa', 'Northern Europe'),
(64, 'Djibouti', 'Africa', 'Eastern Africa'),
(65, 'Dominica', 'America', 'Caribbean'),
(66, 'Dominican Republic', 'America', 'Caribbean'),
(67, 'Ecuador', 'America', 'South America'),
(68, 'Egypt', 'Africa', 'Northern Africa'),
(69, 'El Salvador', 'America', 'Central America'),
(70, 'Equatorial Guinea', 'Africa', 'Middle Africa'),
(71, 'Eritrea', 'Africa', 'Eastern Africa'),
(72, 'Estonia', 'Europa', 'Northern Europe'),
(73, 'Ethiopia', 'Africa', 'Eastern Africa'),
(74, 'Falkland Islands (Malvinas)', 'America', 'South America'),
(75, 'Faroe Islands', 'Europa', 'Northern Europe'),
(76, 'Fiji', 'Oceania', 'Melanesia'),
(77, 'Finland', 'Europa', 'Northern Europe'),
(78, 'France', 'Europa', 'Western Europe'),
(79, 'French Guiana', 'America', 'South America'),
(80, 'French Polynesia', 'Oceania', 'Polynesia'),
(81, 'French Southern Territories', 'Africa', 'Southern Africa'),
(82, 'Gabon', 'Africa', 'Middle Africa'),
(83, 'Gambia', 'Africa', 'Western Africa'),
(84, 'Georgia', 'Asia', 'Western Asia'),
(85, 'Germany', 'Europa', 'Western Europe'),
(86, 'Ghana', 'Africa', 'Western Africa'),
(87, 'Gibraltar', 'Europa', 'Southern Europe'),
(88, 'Greece', 'Europa', 'Southern Europe'),
(89, 'Greenland', 'America', 'Northern America'),
(90, 'Grenada', 'America', 'Caribbean'),
(91, 'Guadeloupe', 'America', 'Caribbean'),
(92, 'Guam', 'Oceania', 'Micronesia'),
(93, 'Guatemala', 'America', 'Central America'),
(94, 'Guernsey', 'Europa', 'Northern Europe'),
(95, 'Guinea', 'Africa', 'Western Africa'),
(96, 'Guinea-Bissau', 'Africa', 'Western Africa'),
(97, 'Guyana', 'America', 'South America'),
(98, 'Haiti', 'America', 'Caribbean'),
(99, 'Heard Island and McDonald Islands', '', ''),
(100, 'Holy See', 'Europa', 'Southern Europe'),
(101, 'Honduras', 'America', 'Central America'),
(102, 'Hong Kong', 'Asia', 'Eastern Asia'),
(103, 'Hungary', 'Europa', 'Eastern Europe'),
(104, 'Iceland', 'Europa', 'Northern Europe'),
(105, 'India', 'Asia', 'Southern Asia'),
(106, 'Indonesia', 'Asia', 'South-Eastern Asia'),
(107, 'Côte d\'Ivoire', 'Africa', 'Western Africa'),
(108, 'Iran (Islamic Republic of)', 'Asia', 'Southern Asia'),
(109, 'Iraq', 'Asia', 'Western Asia'),
(110, 'Ireland', 'Europa', 'Northern Europe'),
(111, 'Isle of Man', 'Europa', 'Northern Europe'),
(112, 'Israel', 'Asia', 'Western Asia'),
(113, 'Italy', 'Europa', 'Southern Europe'),
(114, 'Jamaica', 'America', 'Caribbean'),
(115, 'Japan', 'Asia', 'Eastern Asia'),
(116, 'Jersey', 'Europa', 'Northern Europe'),
(117, 'Jordan', 'Asia', 'Western Asia'),
(118, 'Kazakhstan', 'Asia', 'Central Asia'),
(119, 'Kenya', 'Africa', 'Eastern Africa'),
(120, 'Kiribati', 'Oceania', 'Micronesia'),
(121, 'Kuwait', 'Asia', 'Western Asia'),
(122, 'Kyrgyzstan', 'Asia', 'Central Asia'),
(123, 'Lao People\'s Democratic Republic', 'Asia', 'South-Eastern Asia'),
(124, 'Latvia', 'Europa', 'Northern Europe'),
(125, 'Lebanon', 'Asia', 'Western Asia'),
(126, 'Lesotho', 'Africa', 'Southern Africa'),
(127, 'Liberia', 'Africa', 'Western Africa'),
(128, 'Libya', 'Africa', 'Northern Africa'),
(129, 'Liechtenstein', 'Europa', 'Western Europe'),
(130, 'Lithuania', 'Europa', 'Northern Europe'),
(131, 'Luxembourg', 'Europa', 'Western Europe'),
(132, 'Macao', 'Asia', 'Eastern Asia'),
(133, 'Macedonia (the former Yugoslav Republic of)', 'Europa', 'Southern Europe'),
(134, 'Madagascar', 'Africa', 'Eastern Africa'),
(135, 'Malawi', 'Africa', 'Eastern Africa'),
(136, 'Malaysia', 'Asia', 'South-Eastern Asia'),
(137, 'Maldives', 'Asia', 'Southern Asia'),
(138, 'Mali', 'Africa', 'Western Africa'),
(139, 'Malta', 'Europa', 'Southern Europe'),
(140, 'Marshall Islands', 'Oceania', 'Micronesia'),
(141, 'Martinique', 'America', 'Caribbean'),
(142, 'Mauritania', 'Africa', 'Western Africa'),
(143, 'Mauritius', 'Africa', 'Eastern Africa'),
(144, 'Mayotte', 'Africa', 'Eastern Africa'),
(145, 'Mexico', 'America', 'Central America'),
(146, 'Micronesia (Federated States of)', 'Oceania', 'Micronesia'),
(147, 'Moldova (Republic of)', 'Europa', 'Eastern Europe'),
(148, 'Monaco', 'Europa', 'Western Europe'),
(149, 'Mongolia', 'Asia', 'Eastern Asia'),
(150, 'Montenegro', 'Europa', 'Southern Europe'),
(151, 'Montserrat', 'America', 'Caribbean'),
(152, 'Morocco', 'Africa', 'Northern Africa'),
(153, 'Mozambique', 'Africa', 'Eastern Africa'),
(154, 'Myanmar', 'Asia', 'South-Eastern Asia'),
(155, 'Namibia', 'Africa', 'Southern Africa'),
(156, 'Nauru', 'Oceania', 'Micronesia'),
(157, 'Nepal', 'Asia', 'Southern Asia'),
(158, 'Netherlands', 'Europa', 'Western Europe'),
(159, 'New Caledonia', 'Oceania', 'Melanesia'),
(160, 'New Zealand', 'Oceania', 'Australia and New Zealand'),
(161, 'Nicaragua', 'America', 'Central America'),
(162, 'Niger', 'Africa', 'Western Africa'),
(163, 'Nigeria', 'Africa', 'Western Africa'),
(164, 'Niue', 'Oceania', 'Polynesia'),
(165, 'Norfolk Island', 'Oceania', 'Australia and New Zealand'),
(166, 'Korea (Democratic People Republic of)', 'Asia', 'Eastern Asia'),
(167, 'Northern Mariana Islands', 'Oceania', 'Micronesia'),
(168, 'Norway', 'Europa', 'Northern Europe'),
(169, 'Oman', 'Asia', 'Western Asia'),
(170, 'Pakistan', 'Asia', 'Southern Asia'),
(171, 'Palau', 'Oceania', 'Micronesia'),
(172, 'Palestine, State of', 'Asia', 'Western Asia'),
(173, 'Panama', 'America', 'Central America'),
(174, 'Papua New Guinea', 'Oceania', 'Melanesia'),
(175, 'Paraguay', 'America', 'South America'),
(176, 'Peru', 'America', 'South America'),
(177, 'Philippines', 'Asia', 'South-Eastern Asia'),
(178, 'Pitcairn', 'Oceania', 'Polynesia'),
(179, 'Poland', 'Europa', 'Eastern Europe'),
(180, 'Portugal', 'Europa', 'Southern Europe'),
(181, 'Puerto Rico', 'America', 'Caribbean'),
(182, 'Qatar', 'Asia', 'Western Asia'),
(183, 'Republic of Kosovo', 'Europa', 'Eastern Europe'),
(184, 'Réunion', 'Africa', 'Eastern Africa'),
(185, 'Romania', 'Europa', 'Eastern Europe'),
(186, 'Russian Federation', 'Europa', 'Eastern Europe'),
(187, 'Rwanda', 'Africa', 'Eastern Africa'),
(188, 'Saint Barthélemy', 'America', 'Caribbean'),
(189, 'Saint Helena, Ascension and Tristan da Cunha', 'Africa', 'Western Africa'),
(190, 'Saint Kitts and Nevis', 'America', 'Caribbean'),
(191, 'Saint Lucia', 'America', 'Caribbean'),
(192, 'Saint Martin (French part)', 'America', 'Caribbean'),
(193, 'Saint Pierre and Miquelon', 'America', 'Northern America'),
(194, 'Saint Vincent and the Grenadines', 'America', 'Caribbean'),
(195, 'Samoa', 'Oceania', 'Polynesia'),
(196, 'San Marino', 'Europa', 'Southern Europe'),
(197, 'Sao Tome and Principe', 'Africa', 'Middle Africa'),
(198, 'Saudi Arabia', 'Asia', 'Western Asia'),
(199, 'Senegal', 'Africa', 'Western Africa'),
(200, 'Serbia', 'Europa', 'Southern Europe'),
(201, 'Seychelles', 'Africa', 'Eastern Africa'),
(202, 'Sierra Leone', 'Africa', 'Western Africa'),
(203, 'Singapore', 'Asia', 'South-Eastern Asia'),
(204, 'Sint Maarten (Dutch part)', 'America', 'Caribbean'),
(205, 'Slovakia', 'Europa', 'Eastern Europe'),
(206, 'Slovenia', 'Europa', 'Southern Europe'),
(207, 'Solomon Islands', 'Oceania', 'Melanesia'),
(208, 'Somalia', 'Africa', 'Eastern Africa'),
(209, 'South Africa', 'Africa', 'Southern Africa'),
(210, 'South Georgia and the South Sandwich Islands', 'America', 'South America'),
(211, 'Korea (Republic of)', 'Asia', 'Eastern Asia'),
(212, 'South Sudan', 'Africa', 'Middle Africa'),
(213, 'Spain', 'Europa', 'Southern Europe'),
(214, 'Sri Lanka', 'Asia', 'Southern Asia'),
(215, 'Sudan', 'Africa', 'Northern Africa'),
(216, 'Surinombre', 'America', 'South America'),
(217, 'Svalbard and Jan Mayen', 'Europa', 'Northern Europe'),
(218, 'Swaziland', 'Africa', 'Southern Africa'),
(219, 'Sweden', 'Europa', 'Northern Europe'),
(220, 'Switzerland', 'Europa', 'Western Europe'),
(221, 'Syrian Arab Republic', 'Asia', 'Western Asia'),
(222, 'Taiwan', 'Asia', 'Eastern Asia'),
(223, 'Tajikistan', 'Asia', 'Central Asia'),
(224, 'Tanzania, United Republic of', 'Africa', 'Eastern Africa'),
(225, 'Thailand', 'Asia', 'South-Eastern Asia'),
(226, 'Timor-Leste', 'Asia', 'South-Eastern Asia'),
(227, 'Togo', 'Africa', 'Western Africa'),
(228, 'Tokelau', 'Oceania', 'Polynesia'),
(229, 'Tonga', 'Oceania', 'Polynesia'),
(230, 'Trinidad and Tobago', 'America', 'Caribbean'),
(231, 'Tunisia', 'Africa', 'Northern Africa'),
(232, 'Turkey', 'Asia', 'Western Asia'),
(233, 'Turkmenistan', 'Asia', 'Central Asia'),
(234, 'Turks and Caicos Islands', 'America', 'Caribbean'),
(235, 'Tuvalu', 'Oceania', 'Polynesia'),
(236, 'Uganda', 'Africa', 'Eastern Africa'),
(237, 'Ukraine', 'Europa', 'Eastern Europe'),
(238, 'United Arab Emirates', 'Asia', 'Western Asia'),
(239, 'United Kingdom of Great Britain and Northern Ireland', 'Europa', 'Northern Europe'),
(240, 'United States of America', 'America', 'Northern America'),
(241, 'Uruguay', 'America', 'South America'),
(242, 'Uzbekistan', 'Asia', 'Central Asia'),
(243, 'Vanuatu', 'Oceania', 'Melanesia'),
(244, 'Venezuela (Bolivarian Republic of)', 'America', 'South America'),
(245, 'Viet Nam', 'Asia', 'South-Eastern Asia'),
(246, 'Wallis and Futuna', 'Oceania', 'Polynesia'),
(247, 'Western Sahara', 'Africa', 'Northern Africa'),
(248, 'Yemen', 'Asia', 'Western Asia'),
(249, 'Zambia', 'Africa', 'Eastern Africa'),
(250, 'Zimbabwe', 'Africa', 'Eastern Africa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--



CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `apellido` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `usuario` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `contrasena` text COLLATE utf8_spanish_ci NOT NULL,
  `telefono` text COLLATE utf8_spanish_ci NOT NULL,
  `domicilio` text COLLATE utf8_spanish_ci NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- insert de datos para la tabla `usuarios`
--



INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `usuario`, `email`, `contrasena`, `telefono`, `domicilio`, `admin`) VALUES
(1, 'Mariano', 'Collavino', 'Macollavino', 'macollavino64@gmail.com', '123', '12345678', 'Temperley BsAs', 1),
(2, 'Acamica', 'DWFS', 'Acamica', 'hola@acamica.com', '123', '08000132123213', 'Buenos Aires, Argentina', 0),

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);


--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT de la tabla `paises`
--
ALTER TABLE `paises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=251;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
