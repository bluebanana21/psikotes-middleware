import db from "../config/db.ts";

const sql = `
create table if not exists surveys (
    id int PRIMARY KEY AUTO_INCREMENT,
    title varchar(255),
    description varchar(255),
    startDate DATETIME,
    endDate DATETIME
);

create table if not exists sections (
    id int PRIMARY KEY AUTO_INCREMENT,
    surveyId int,
    FOREIGN KEY(surveyId) references surveys(id)

);

create table if not exists questions(
    id int PRIMARY KEY AUTO_INCREMENT,
    questionText varchar(255),
    questionType ENUM('essay', 'choice', 'scale'),
    imagePath varchar(255) ,
    sectionId int,
    FOREIGN KEY(sectionId) references sections(id)
);

create table if not exists questionChoices(
    id int PRIMARY KEY AUTO_INCREMENT,
    choiceText varchar(255),
    status boolean,
    questionId int,
    FOREIGN KEY (questionId) references questions(id) 
);

`;

db.query(sql, function(err){
    if(err) throw err;
    console.log("survey tables successfully created");
})