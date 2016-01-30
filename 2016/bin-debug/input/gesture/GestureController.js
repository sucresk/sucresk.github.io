var GestureController = (function (_super) {
    __extends(GestureController, _super);
    function GestureController(stage) {
        _super.call(this);
        this._canvas = new egret.Shape();
        this._myRec = new GestureRecognizer();
        this._myRec.addTemplate("triangle", new Array(new egret.Point(137, 139), new egret.Point(135, 141), new egret.Point(133, 144), new egret.Point(132, 146), new egret.Point(130, 149), new egret.Point(128, 151), new egret.Point(126, 155), new egret.Point(123, 160), new egret.Point(120, 166), new egret.Point(116, 171), new egret.Point(112, 177), new egret.Point(107, 183), new egret.Point(102, 188), new egret.Point(100, 191), new egret.Point(95, 195), new egret.Point(90, 199), new egret.Point(86, 203), new egret.Point(82, 206), new egret.Point(80, 209), new egret.Point(75, 213), new egret.Point(73, 213), new egret.Point(70, 216), new egret.Point(67, 219), new egret.Point(64, 221), new egret.Point(61, 223), new egret.Point(60, 225), new egret.Point(62, 226), new egret.Point(65, 225), new egret.Point(67, 226), new egret.Point(74, 226), new egret.Point(77, 227), new egret.Point(85, 229), new egret.Point(91, 230), new egret.Point(99, 231), new egret.Point(108, 232), new egret.Point(116, 233), new egret.Point(125, 233), new egret.Point(134, 234), new egret.Point(145, 233), new egret.Point(153, 232), new egret.Point(160, 233), new egret.Point(170, 234), new egret.Point(177, 235), new egret.Point(179, 236), new egret.Point(186, 237), new egret.Point(193, 238), new egret.Point(198, 239), new egret.Point(200, 237), new egret.Point(202, 239), new egret.Point(204, 238), new egret.Point(206, 234), new egret.Point(205, 230), new egret.Point(202, 222), new egret.Point(197, 216), new egret.Point(192, 207), new egret.Point(186, 198), new egret.Point(179, 189), new egret.Point(174, 183), new egret.Point(170, 178), new egret.Point(164, 171), new egret.Point(161, 168), new egret.Point(154, 160), new egret.Point(148, 155), new egret.Point(143, 150), new egret.Point(138, 148), new egret.Point(136, 148)));
        this._myRec.addTemplate("x", new Array(new egret.Point(87, 142), new egret.Point(89, 145), new egret.Point(91, 148), new egret.Point(93, 151), new egret.Point(96, 155), new egret.Point(98, 157), new egret.Point(100, 160), new egret.Point(102, 162), new egret.Point(106, 167), new egret.Point(108, 169), new egret.Point(110, 171), new egret.Point(115, 177), new egret.Point(119, 183), new egret.Point(123, 189), new egret.Point(127, 193), new egret.Point(129, 196), new egret.Point(133, 200), new egret.Point(137, 206), new egret.Point(140, 209), new egret.Point(143, 212), new egret.Point(146, 215), new egret.Point(151, 220), new egret.Point(153, 222), new egret.Point(155, 223), new egret.Point(157, 225), new egret.Point(158, 223), new egret.Point(157, 218), new egret.Point(155, 211), new egret.Point(154, 208), new egret.Point(152, 200), new egret.Point(150, 189), new egret.Point(148, 179), new egret.Point(147, 170), new egret.Point(147, 158), new egret.Point(147, 148), new egret.Point(147, 141), new egret.Point(147, 136), new egret.Point(144, 135), new egret.Point(142, 137), new egret.Point(140, 139), new egret.Point(135, 145), new egret.Point(131, 152), new egret.Point(124, 163), new egret.Point(116, 177), new egret.Point(108, 191), new egret.Point(100, 206), new egret.Point(94, 217), new egret.Point(91, 222), new egret.Point(89, 225), new egret.Point(87, 226), new egret.Point(87, 224)));
        this._myRec.addTemplate("rectangle", new Array(new egret.Point(78, 149), new egret.Point(78, 153), new egret.Point(78, 157), new egret.Point(78, 160), new egret.Point(79, 162), new egret.Point(79, 164), new egret.Point(79, 167), new egret.Point(79, 169), new egret.Point(79, 173), new egret.Point(79, 178), new egret.Point(79, 183), new egret.Point(80, 189), new egret.Point(80, 193), new egret.Point(80, 198), new egret.Point(80, 202), new egret.Point(81, 208), new egret.Point(81, 210), new egret.Point(81, 216), new egret.Point(82, 222), new egret.Point(82, 224), new egret.Point(82, 227), new egret.Point(83, 229), new egret.Point(83, 231), new egret.Point(85, 230), new egret.Point(88, 232), new egret.Point(90, 233), new egret.Point(92, 232), new egret.Point(94, 233), new egret.Point(99, 232), new egret.Point(102, 233), new egret.Point(106, 233), new egret.Point(109, 234), new egret.Point(117, 235), new egret.Point(123, 236), new egret.Point(126, 236), new egret.Point(135, 237), new egret.Point(142, 238), new egret.Point(145, 238), new egret.Point(152, 238), new egret.Point(154, 239), new egret.Point(165, 238), new egret.Point(174, 237), new egret.Point(179, 236), new egret.Point(186, 235), new egret.Point(191, 235), new egret.Point(195, 233), new egret.Point(197, 233), new egret.Point(200, 233), new egret.Point(201, 235), new egret.Point(201, 233), new egret.Point(199, 231), new egret.Point(198, 226), new egret.Point(198, 220), new egret.Point(196, 207), new egret.Point(195, 195), new egret.Point(195, 181), new egret.Point(195, 173), new egret.Point(195, 163), new egret.Point(194, 155), new egret.Point(192, 145), new egret.Point(192, 143), new egret.Point(192, 138), new egret.Point(191, 135), new egret.Point(191, 133), new egret.Point(191, 130), new egret.Point(190, 128), new egret.Point(188, 129), new egret.Point(186, 129), new egret.Point(181, 132), new egret.Point(173, 131), new egret.Point(162, 131), new egret.Point(151, 132), new egret.Point(149, 132), new egret.Point(138, 132), new egret.Point(136, 132), new egret.Point(122, 131), new egret.Point(120, 131), new egret.Point(109, 130), new egret.Point(107, 130), new egret.Point(90, 132), new egret.Point(81, 133), new egret.Point(76, 133)));
        this._myRec.addTemplate("circle", new Array(new egret.Point(127, 141), new egret.Point(124, 140), new egret.Point(120, 139), new egret.Point(118, 139), new egret.Point(116, 139), new egret.Point(111, 140), new egret.Point(109, 141), new egret.Point(104, 144), new egret.Point(100, 147), new egret.Point(96, 152), new egret.Point(93, 157), new egret.Point(90, 163), new egret.Point(87, 169), new egret.Point(85, 175), new egret.Point(83, 181), new egret.Point(82, 190), new egret.Point(82, 195), new egret.Point(83, 200), new egret.Point(84, 205), new egret.Point(88, 213), new egret.Point(91, 216), new egret.Point(96, 219), new egret.Point(103, 222), new egret.Point(108, 224), new egret.Point(111, 224), new egret.Point(120, 224), new egret.Point(133, 223), new egret.Point(142, 222), new egret.Point(152, 218), new egret.Point(160, 214), new egret.Point(167, 210), new egret.Point(173, 204), new egret.Point(178, 198), new egret.Point(179, 196), new egret.Point(182, 188), new egret.Point(182, 177), new egret.Point(178, 167), new egret.Point(170, 150), new egret.Point(163, 138), new egret.Point(152, 130), new egret.Point(143, 129), new egret.Point(140, 131), new egret.Point(129, 136), new egret.Point(126, 139)));
        this._myRec.addTemplate("check", new Array(new egret.Point(91, 185), new egret.Point(93, 185), new egret.Point(95, 185), new egret.Point(97, 185), new egret.Point(100, 188), new egret.Point(102, 189), new egret.Point(104, 190), new egret.Point(106, 193), new egret.Point(108, 195), new egret.Point(110, 198), new egret.Point(112, 201), new egret.Point(114, 204), new egret.Point(115, 207), new egret.Point(117, 210), new egret.Point(118, 212), new egret.Point(120, 214), new egret.Point(121, 217), new egret.Point(122, 219), new egret.Point(123, 222), new egret.Point(124, 224), new egret.Point(126, 226), new egret.Point(127, 229), new egret.Point(129, 231), new egret.Point(130, 233), new egret.Point(129, 231), new egret.Point(129, 228), new egret.Point(129, 226), new egret.Point(129, 224), new egret.Point(129, 221), new egret.Point(129, 218), new egret.Point(129, 212), new egret.Point(129, 208), new egret.Point(130, 198), new egret.Point(132, 189), new egret.Point(134, 182), new egret.Point(137, 173), new egret.Point(143, 164), new egret.Point(147, 157), new egret.Point(151, 151), new egret.Point(155, 144), new egret.Point(161, 137), new egret.Point(165, 131), new egret.Point(171, 122), new egret.Point(174, 118), new egret.Point(176, 114), new egret.Point(177, 112), new egret.Point(177, 114), new egret.Point(175, 116), new egret.Point(173, 118)));
        this._myRec.addTemplate("caret", new Array(new egret.Point(79, 245), new egret.Point(79, 242), new egret.Point(79, 239), new egret.Point(80, 237), new egret.Point(80, 234), new egret.Point(81, 232), new egret.Point(82, 230), new egret.Point(84, 224), new egret.Point(86, 220), new egret.Point(86, 218), new egret.Point(87, 216), new egret.Point(88, 213), new egret.Point(90, 207), new egret.Point(91, 202), new egret.Point(92, 200), new egret.Point(93, 194), new egret.Point(94, 192), new egret.Point(96, 189), new egret.Point(97, 186), new egret.Point(100, 179), new egret.Point(102, 173), new egret.Point(105, 165), new egret.Point(107, 160), new egret.Point(109, 158), new egret.Point(112, 151), new egret.Point(115, 144), new egret.Point(117, 139), new egret.Point(119, 136), new egret.Point(119, 134), new egret.Point(120, 132), new egret.Point(121, 129), new egret.Point(122, 127), new egret.Point(124, 125), new egret.Point(126, 124), new egret.Point(129, 125), new egret.Point(131, 127), new egret.Point(132, 130), new egret.Point(136, 139), new egret.Point(141, 154), new egret.Point(145, 166), new egret.Point(151, 182), new egret.Point(156, 193), new egret.Point(157, 196), new egret.Point(161, 209), new egret.Point(162, 211), new egret.Point(167, 223), new egret.Point(169, 229), new egret.Point(170, 231), new egret.Point(173, 237), new egret.Point(176, 242), new egret.Point(177, 244), new egret.Point(179, 250), new egret.Point(181, 255), new egret.Point(182, 257)));
        this._myRec.addTemplate("question", new Array(new egret.Point(104, 145), new egret.Point(103, 142), new egret.Point(103, 140), new egret.Point(103, 138), new egret.Point(103, 135), new egret.Point(104, 133), new egret.Point(105, 131), new egret.Point(106, 128), new egret.Point(107, 125), new egret.Point(108, 123), new egret.Point(111, 121), new egret.Point(113, 118), new egret.Point(115, 116), new egret.Point(117, 116), new egret.Point(119, 116), new egret.Point(121, 115), new egret.Point(124, 116), new egret.Point(126, 115), new egret.Point(128, 114), new egret.Point(130, 115), new egret.Point(133, 116), new egret.Point(135, 117), new egret.Point(140, 120), new egret.Point(142, 121), new egret.Point(144, 123), new egret.Point(146, 125), new egret.Point(149, 127), new egret.Point(150, 129), new egret.Point(152, 130), new egret.Point(154, 132), new egret.Point(156, 134), new egret.Point(158, 137), new egret.Point(159, 139), new egret.Point(160, 141), new egret.Point(160, 143), new egret.Point(160, 146), new egret.Point(160, 149), new egret.Point(159, 153), new egret.Point(158, 155), new egret.Point(157, 157), new egret.Point(155, 159), new egret.Point(153, 161), new egret.Point(151, 163), new egret.Point(146, 167), new egret.Point(142, 170), new egret.Point(138, 172), new egret.Point(134, 173), new egret.Point(132, 175), new egret.Point(127, 175), new egret.Point(124, 175), new egret.Point(122, 176), new egret.Point(120, 178), new egret.Point(119, 180), new egret.Point(119, 183), new egret.Point(119, 185), new egret.Point(120, 190), new egret.Point(121, 194), new egret.Point(122, 200), new egret.Point(123, 205), new egret.Point(123, 211), new egret.Point(124, 215), new egret.Point(124, 223), new egret.Point(124, 225)));
        this._myRec.addTemplate("arrow", new Array(new egret.Point(68, 222), new egret.Point(70, 220), new egret.Point(73, 218), new egret.Point(75, 217), new egret.Point(77, 215), new egret.Point(80, 213), new egret.Point(82, 212), new egret.Point(84, 210), new egret.Point(87, 209), new egret.Point(89, 208), new egret.Point(92, 206), new egret.Point(95, 204), new egret.Point(101, 201), new egret.Point(106, 198), new egret.Point(112, 194), new egret.Point(118, 191), new egret.Point(124, 187), new egret.Point(127, 186), new egret.Point(132, 183), new egret.Point(138, 181), new egret.Point(141, 180), new egret.Point(146, 178), new egret.Point(154, 173), new egret.Point(159, 171), new egret.Point(161, 170), new egret.Point(166, 167), new egret.Point(168, 167), new egret.Point(171, 166), new egret.Point(174, 164), new egret.Point(177, 162), new egret.Point(180, 160), new egret.Point(182, 158), new egret.Point(183, 156), new egret.Point(181, 154), new egret.Point(178, 153), new egret.Point(171, 153), new egret.Point(164, 153), new egret.Point(160, 153), new egret.Point(150, 154), new egret.Point(147, 155), new egret.Point(141, 157), new egret.Point(137, 158), new egret.Point(135, 158), new egret.Point(137, 158), new egret.Point(140, 157), new egret.Point(143, 156), new egret.Point(151, 154), new egret.Point(160, 152), new egret.Point(170, 149), new egret.Point(179, 147), new egret.Point(185, 145), new egret.Point(192, 144), new egret.Point(196, 144), new egret.Point(198, 144), new egret.Point(200, 144), new egret.Point(201, 147), new egret.Point(199, 149), new egret.Point(194, 157), new egret.Point(191, 160), new egret.Point(186, 167), new egret.Point(180, 176), new egret.Point(177, 179), new egret.Point(171, 187), new egret.Point(169, 189), new egret.Point(165, 194), new egret.Point(164, 196)));
        this._myRec.addTemplate("leftsquarebracket", new Array(new egret.Point(140, 124), new egret.Point(138, 123), new egret.Point(135, 122), new egret.Point(133, 123), new egret.Point(130, 123), new egret.Point(128, 124), new egret.Point(125, 125), new egret.Point(122, 124), new egret.Point(120, 124), new egret.Point(118, 124), new egret.Point(116, 125), new egret.Point(113, 125), new egret.Point(111, 125), new egret.Point(108, 124), new egret.Point(106, 125), new egret.Point(104, 125), new egret.Point(102, 124), new egret.Point(100, 123), new egret.Point(98, 123), new egret.Point(95, 124), new egret.Point(93, 123), new egret.Point(90, 124), new egret.Point(88, 124), new egret.Point(85, 125), new egret.Point(83, 126), new egret.Point(81, 127), new egret.Point(81, 129), new egret.Point(82, 131), new egret.Point(82, 134), new egret.Point(83, 138), new egret.Point(84, 141), new egret.Point(84, 144), new egret.Point(85, 148), new egret.Point(85, 151), new egret.Point(86, 156), new egret.Point(86, 160), new egret.Point(86, 164), new egret.Point(86, 168), new egret.Point(87, 171), new egret.Point(87, 175), new egret.Point(87, 179), new egret.Point(87, 182), new egret.Point(87, 186), new egret.Point(88, 188), new egret.Point(88, 195), new egret.Point(88, 198), new egret.Point(88, 201), new egret.Point(88, 207), new egret.Point(89, 211), new egret.Point(89, 213), new egret.Point(89, 217), new egret.Point(89, 222), new egret.Point(88, 225), new egret.Point(88, 229), new egret.Point(88, 231), new egret.Point(88, 233), new egret.Point(88, 235), new egret.Point(89, 237), new egret.Point(89, 240), new egret.Point(89, 242), new egret.Point(91, 241), new egret.Point(94, 241), new egret.Point(96, 240), new egret.Point(98, 239), new egret.Point(105, 240), new egret.Point(109, 240), new egret.Point(113, 239), new egret.Point(116, 240), new egret.Point(121, 239), new egret.Point(130, 240), new egret.Point(136, 237), new egret.Point(139, 237), new egret.Point(144, 238), new egret.Point(151, 237), new egret.Point(157, 236), new egret.Point(159, 237)));
        this._myRec.addTemplate("rightsquarebracket", new Array(new egret.Point(112, 138), new egret.Point(112, 136), new egret.Point(115, 136), new egret.Point(118, 137), new egret.Point(120, 136), new egret.Point(123, 136), new egret.Point(125, 136), new egret.Point(128, 136), new egret.Point(131, 136), new egret.Point(134, 135), new egret.Point(137, 135), new egret.Point(140, 134), new egret.Point(143, 133), new egret.Point(145, 132), new egret.Point(147, 132), new egret.Point(149, 132), new egret.Point(152, 132), new egret.Point(153, 134), new egret.Point(154, 137), new egret.Point(155, 141), new egret.Point(156, 144), new egret.Point(157, 152), new egret.Point(158, 161), new egret.Point(160, 170), new egret.Point(162, 182), new egret.Point(164, 192), new egret.Point(166, 200), new egret.Point(167, 209), new egret.Point(168, 214), new egret.Point(168, 216), new egret.Point(169, 221), new egret.Point(169, 223), new egret.Point(169, 228), new egret.Point(169, 231), new egret.Point(166, 233), new egret.Point(164, 234), new egret.Point(161, 235), new egret.Point(155, 236), new egret.Point(147, 235), new egret.Point(140, 233), new egret.Point(131, 233), new egret.Point(124, 233), new egret.Point(117, 235), new egret.Point(114, 238), new egret.Point(112, 238)));
        this._myRec.addTemplate("v", new Array(new egret.Point(89, 164), new egret.Point(90, 162), new egret.Point(92, 162), new egret.Point(94, 164), new egret.Point(95, 166), new egret.Point(96, 169), new egret.Point(97, 171), new egret.Point(99, 175), new egret.Point(101, 178), new egret.Point(103, 182), new egret.Point(106, 189), new egret.Point(108, 194), new egret.Point(111, 199), new egret.Point(114, 204), new egret.Point(117, 209), new egret.Point(119, 214), new egret.Point(122, 218), new egret.Point(124, 222), new egret.Point(126, 225), new egret.Point(128, 228), new egret.Point(130, 229), new egret.Point(133, 233), new egret.Point(134, 236), new egret.Point(136, 239), new egret.Point(138, 240), new egret.Point(139, 242), new egret.Point(140, 244), new egret.Point(142, 242), new egret.Point(142, 240), new egret.Point(142, 237), new egret.Point(143, 235), new egret.Point(143, 233), new egret.Point(145, 229), new egret.Point(146, 226), new egret.Point(148, 217), new egret.Point(149, 208), new egret.Point(149, 205), new egret.Point(151, 196), new egret.Point(151, 193), new egret.Point(153, 182), new egret.Point(155, 172), new egret.Point(157, 165), new egret.Point(159, 160), new egret.Point(162, 155), new egret.Point(164, 150), new egret.Point(165, 148), new egret.Point(166, 146)));
        this._myRec.addTemplate("delete", new Array(new egret.Point(123, 129), new egret.Point(123, 131), new egret.Point(124, 133), new egret.Point(125, 136), new egret.Point(127, 140), new egret.Point(129, 142), new egret.Point(133, 148), new egret.Point(137, 154), new egret.Point(143, 158), new egret.Point(145, 161), new egret.Point(148, 164), new egret.Point(153, 170), new egret.Point(158, 176), new egret.Point(160, 178), new egret.Point(164, 183), new egret.Point(168, 188), new egret.Point(171, 191), new egret.Point(175, 196), new egret.Point(178, 200), new egret.Point(180, 202), new egret.Point(181, 205), new egret.Point(184, 208), new egret.Point(186, 210), new egret.Point(187, 213), new egret.Point(188, 215), new egret.Point(186, 212), new egret.Point(183, 211), new egret.Point(177, 208), new egret.Point(169, 206), new egret.Point(162, 205), new egret.Point(154, 207), new egret.Point(145, 209), new egret.Point(137, 210), new egret.Point(129, 214), new egret.Point(122, 217), new egret.Point(118, 218), new egret.Point(111, 221), new egret.Point(109, 222), new egret.Point(110, 219), new egret.Point(112, 217), new egret.Point(118, 209), new egret.Point(120, 207), new egret.Point(128, 196), new egret.Point(135, 187), new egret.Point(138, 183), new egret.Point(148, 167), new egret.Point(157, 153), new egret.Point(163, 145), new egret.Point(165, 142), new egret.Point(172, 133), new egret.Point(177, 127), new egret.Point(179, 127), new egret.Point(180, 125)));
        this._myRec.addTemplate("leftcurlybrace", new Array(new egret.Point(150, 116), new egret.Point(147, 117), new egret.Point(145, 116), new egret.Point(142, 116), new egret.Point(139, 117), new egret.Point(136, 117), new egret.Point(133, 118), new egret.Point(129, 121), new egret.Point(126, 122), new egret.Point(123, 123), new egret.Point(120, 125), new egret.Point(118, 127), new egret.Point(115, 128), new egret.Point(113, 129), new egret.Point(112, 131), new egret.Point(113, 134), new egret.Point(115, 134), new egret.Point(117, 135), new egret.Point(120, 135), new egret.Point(123, 137), new egret.Point(126, 138), new egret.Point(129, 140), new egret.Point(135, 143), new egret.Point(137, 144), new egret.Point(139, 147), new egret.Point(141, 149), new egret.Point(140, 152), new egret.Point(139, 155), new egret.Point(134, 159), new egret.Point(131, 161), new egret.Point(124, 166), new egret.Point(121, 166), new egret.Point(117, 166), new egret.Point(114, 167), new egret.Point(112, 166), new egret.Point(114, 164), new egret.Point(116, 163), new egret.Point(118, 163), new egret.Point(120, 162), new egret.Point(122, 163), new egret.Point(125, 164), new egret.Point(127, 165), new egret.Point(129, 166), new egret.Point(130, 168), new egret.Point(129, 171), new egret.Point(127, 175), new egret.Point(125, 179), new egret.Point(123, 184), new egret.Point(121, 190), new egret.Point(120, 194), new egret.Point(119, 199), new egret.Point(120, 202), new egret.Point(123, 207), new egret.Point(127, 211), new egret.Point(133, 215), new egret.Point(142, 219), new egret.Point(148, 220), new egret.Point(151, 221)));
        this._myRec.addTemplate("rightcurlybrace", new Array(new egret.Point(117, 132), new egret.Point(115, 132), new egret.Point(115, 129), new egret.Point(117, 129), new egret.Point(119, 128), new egret.Point(122, 127), new egret.Point(125, 127), new egret.Point(127, 127), new egret.Point(130, 127), new egret.Point(133, 129), new egret.Point(136, 129), new egret.Point(138, 130), new egret.Point(140, 131), new egret.Point(143, 134), new egret.Point(144, 136), new egret.Point(145, 139), new egret.Point(145, 142), new egret.Point(145, 145), new egret.Point(145, 147), new egret.Point(145, 149), new egret.Point(144, 152), new egret.Point(142, 157), new egret.Point(141, 160), new egret.Point(139, 163), new egret.Point(137, 166), new egret.Point(135, 167), new egret.Point(133, 169), new egret.Point(131, 172), new egret.Point(128, 173), new egret.Point(126, 176), new egret.Point(125, 178), new egret.Point(125, 180), new egret.Point(125, 182), new egret.Point(126, 184), new egret.Point(128, 187), new egret.Point(130, 187), new egret.Point(132, 188), new egret.Point(135, 189), new egret.Point(140, 189), new egret.Point(145, 189), new egret.Point(150, 187), new egret.Point(155, 186), new egret.Point(157, 185), new egret.Point(159, 184), new egret.Point(156, 185), new egret.Point(154, 185), new egret.Point(149, 185), new egret.Point(145, 187), new egret.Point(141, 188), new egret.Point(136, 191), new egret.Point(134, 191), new egret.Point(131, 192), new egret.Point(129, 193), new egret.Point(129, 195), new egret.Point(129, 197), new egret.Point(131, 200), new egret.Point(133, 202), new egret.Point(136, 206), new egret.Point(139, 211), new egret.Point(142, 215), new egret.Point(145, 220), new egret.Point(147, 225), new egret.Point(148, 231), new egret.Point(147, 239), new egret.Point(144, 244), new egret.Point(139, 248), new egret.Point(134, 250), new egret.Point(126, 253), new egret.Point(119, 253), new egret.Point(115, 253)));
        this._myRec.addTemplate("star", new Array(new egret.Point(75, 250), new egret.Point(75, 247), new egret.Point(77, 244), new egret.Point(78, 242), new egret.Point(79, 239), new egret.Point(80, 237), new egret.Point(82, 234), new egret.Point(82, 232), new egret.Point(84, 229), new egret.Point(85, 225), new egret.Point(87, 222), new egret.Point(88, 219), new egret.Point(89, 216), new egret.Point(91, 212), new egret.Point(92, 208), new egret.Point(94, 204), new egret.Point(95, 201), new egret.Point(96, 196), new egret.Point(97, 194), new egret.Point(98, 191), new egret.Point(100, 185), new egret.Point(102, 178), new egret.Point(104, 173), new egret.Point(104, 171), new egret.Point(105, 164), new egret.Point(106, 158), new egret.Point(107, 156), new egret.Point(107, 152), new egret.Point(108, 145), new egret.Point(109, 141), new egret.Point(110, 139), new egret.Point(112, 133), new egret.Point(113, 131), new egret.Point(116, 127), new egret.Point(117, 125), new egret.Point(119, 122), new egret.Point(121, 121), new egret.Point(123, 120), new egret.Point(125, 122), new egret.Point(125, 125), new egret.Point(127, 130), new egret.Point(128, 133), new egret.Point(131, 143), new egret.Point(136, 153), new egret.Point(140, 163), new egret.Point(144, 172), new egret.Point(145, 175), new egret.Point(151, 189), new egret.Point(156, 201), new egret.Point(161, 213), new egret.Point(166, 225), new egret.Point(169, 233), new egret.Point(171, 236), new egret.Point(174, 243), new egret.Point(177, 247), new egret.Point(178, 249), new egret.Point(179, 251), new egret.Point(180, 253), new egret.Point(180, 255), new egret.Point(179, 257), new egret.Point(177, 257), new egret.Point(174, 255), new egret.Point(169, 250), new egret.Point(164, 247), new egret.Point(160, 245), new egret.Point(149, 238), new egret.Point(138, 230), new egret.Point(127, 221), new egret.Point(124, 220), new egret.Point(112, 212), new egret.Point(110, 210), new egret.Point(96, 201), new egret.Point(84, 195), new egret.Point(74, 190), new egret.Point(64, 182), new egret.Point(55, 175), new egret.Point(51, 172), new egret.Point(49, 170), new egret.Point(51, 169), new egret.Point(56, 169), new egret.Point(66, 169), new egret.Point(78, 168), new egret.Point(92, 166), new egret.Point(107, 164), new egret.Point(123, 161), new egret.Point(140, 162), new egret.Point(156, 162), new egret.Point(171, 160), new egret.Point(173, 160), new egret.Point(186, 160), new egret.Point(195, 160), new egret.Point(198, 161), new egret.Point(203, 163), new egret.Point(208, 163), new egret.Point(206, 164), new egret.Point(200, 167), new egret.Point(187, 172), new egret.Point(174, 179), new egret.Point(172, 181), new egret.Point(153, 192), new egret.Point(137, 201), new egret.Point(123, 211), new egret.Point(112, 220), new egret.Point(99, 229), new egret.Point(90, 237), new egret.Point(80, 244), new egret.Point(73, 250), new egret.Point(69, 254), new egret.Point(69, 252)));
        this._myRec.addTemplate("pigtail", new Array(new egret.Point(81, 219), new egret.Point(84, 218), new egret.Point(86, 220), new egret.Point(88, 220), new egret.Point(90, 220), new egret.Point(92, 219), new egret.Point(95, 220), new egret.Point(97, 219), new egret.Point(99, 220), new egret.Point(102, 218), new egret.Point(105, 217), new egret.Point(107, 216), new egret.Point(110, 216), new egret.Point(113, 214), new egret.Point(116, 212), new egret.Point(118, 210), new egret.Point(121, 208), new egret.Point(124, 205), new egret.Point(126, 202), new egret.Point(129, 199), new egret.Point(132, 196), new egret.Point(136, 191), new egret.Point(139, 187), new egret.Point(142, 182), new egret.Point(144, 179), new egret.Point(146, 174), new egret.Point(148, 170), new egret.Point(149, 168), new egret.Point(151, 162), new egret.Point(152, 160), new egret.Point(152, 157), new egret.Point(152, 155), new egret.Point(152, 151), new egret.Point(152, 149), new egret.Point(152, 146), new egret.Point(149, 142), new egret.Point(148, 139), new egret.Point(145, 137), new egret.Point(141, 135), new egret.Point(139, 135), new egret.Point(134, 136), new egret.Point(130, 140), new egret.Point(128, 142), new egret.Point(126, 145), new egret.Point(122, 150), new egret.Point(119, 158), new egret.Point(117, 163), new egret.Point(115, 170), new egret.Point(114, 175), new egret.Point(117, 184), new egret.Point(120, 190), new egret.Point(125, 199), new egret.Point(129, 203), new egret.Point(133, 208), new egret.Point(138, 213), new egret.Point(145, 215), new egret.Point(155, 218), new egret.Point(164, 219), new egret.Point(166, 219), new egret.Point(177, 219), new egret.Point(182, 218), new egret.Point(192, 216), new egret.Point(196, 213), new egret.Point(199, 212), new egret.Point(201, 211)));
        console.log("gesture");
        this._stage = stage;
        this._stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this._stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this._stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }
    var d = __define,c=GestureController,p=c.prototype;
    p.onTouchBegin = function (e) {
        if (!this._start) {
            return;
        }
        if (this._record) {
            return;
        }
        this._record = true;
        this._recordedPoints = new Array();
        this._touchId = e.touchPointID;
        //console.log("gesture touch start")
        this._canvas.graphics.lineStyle(30, 0xff00ff, 0.5);
    };
    p.onTouchMove = function (e) {
        if (!this._start) {
            return;
        }
        if (e.touchPointID != this._touchId) {
            return;
        }
        this._recordedPoints.push(new egret.Point(e.stageX, e.stageY));
        //console.log("gesture touch move")
        if (this._recordedPoints.length == 1) {
            this._canvas.graphics.moveTo(e.stageX, e.stageY);
        }
        else {
            this._canvas.graphics.lineTo(e.stageX, e.stageY);
        }
    };
    p.onTouchEnd = function (e) {
        this._canvas.graphics.clear();
        if (!this._start) {
            return;
        }
        if (e.touchPointID != this._touchId) {
            return;
        }
        this._record = false;
        var myResult = this._myRec.recognize(this._recordedPoints);
        if (myResult) {
            console.log(myResult.name, myResult.score);
            this.dispatchEvent(new GestureEvent(GestureEvent.GESTURE, true, false, myResult.name));
        }
    };
    p.start = function () {
        this._start = true;
        this._stage.addChild(this._canvas);
    };
    p.stop = function () {
        this._start = false;
        this._record = false;
        if (this._recordedPoints) {
            this._recordedPoints.length = 0;
        }
        if (this._canvas.parent != null) {
            this._canvas.parent.removeChild(this._canvas);
        }
    };
    return GestureController;
})(egret.EventDispatcher);
egret.registerClass(GestureController,'GestureController');
//# sourceMappingURL=GestureController.js.map