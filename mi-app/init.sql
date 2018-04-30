create database mishop;
create table users
            (userId int(10) primary key auto_increment,
            passWords varchar(50),
            userName varchar(50),
            phoneNum varchar(40),
            email varchar(20)
);
create table goods
            (goodsId int(10) primary key auto_increment,
            goodsName varchar(50),
            goodsPrice double(20, 2),
            goodsIntro varchar(40),
            goodsImgUrl varchar(20),
            goodsModel varchar(20)
);
INSERT INTO `users`(`passWords`, `userName`, `phoneNum`, `email`) VALUES ('admin','admin','110','123@qq.com');

INSERT INTO `goods`(`goodsName`, `goodsPrice`, `goodsIntro`, `goodsImgUrl`, `goodsModel`) VALUES ('手机',23,'tetetet','https://i8.mifile.cn/b2c-mimall-media/bf1e585ccf509e12e584788d488571db.jpg','256G');