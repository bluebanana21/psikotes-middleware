import db from "../config/db.ts";

const sql = `
create table users (
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(255),
    email varchar(255),
    DoB date,
    PoB varchar(255),
    gender ENUM('Laki-laki','Perempuan')
);

create table surveys (
    id int PRIMARY KEY AUTO_INCREMENT,
    title varchar(255),
    description varchar(255),
    startDate date,
    endDate date
);

create table sections(
    id int PRIMARY KEY AUTO_INCREMENT,
    surveyId int,
    CONSTRAINT FK_sectionSurvey FOREIGN KEY (surveyId) REFERENCES surveys(id)
);

create table questions(
    id int PRIMARY KEY AUTO_INCREMENT,
    question_text varchar(255),
    question_type ENUM('choice', 'essay'),
    sectionId int,
    CONSTRAINT FK_questionSection FOREIGN KEY (sectionId) REFERENCES sections(id)    
);

create table questionChoices(
    id int PRIMARY KEY AUTO_INCREMENT,
    choiceText varchar(255),
    questionId int,
    CONSTRAINT FK_questionChoiceQuestion FOREIGN KEY (questionId) REFERENCES questions(id)
);

create table answer(
    id int PRIMARY KEY AUTO_INCREMENT,
    takerId int,
    answerText varchar(255),
    questionId int,
    CONSTRAINT FK_answerUser FOREIGN KEY (takerId) REFERENCES users(id),
    CONSTRAINT FK_answerQuestions FOREIGN KEY (questionId) REFERENCES questions(id)

);

create table answerChoices(
    id int PRIMARY KEY AUTO_INCREMENT,
    takerId int,
    questionChoiceId int,
    CONSTRAINT FK_ACQC FOREIGN KEY (questionChoiceId) REFERENCES questionChoices(id)
);

create table results(
    id int PRIMARY KEY AUTO_INCREMENT,
    takerId int,
    surveyId int,
    results longtext,
    CONSTRAINT FK_resultsUser FOREIGN KEY (takerId) REFERENCES users(id),
    CONSTRAINT FK_resultsSurvey FOREIGN KEY (surveyId) REFERENCES surveys(id)
);

create table review(
    id int PRIMARY KEY AUTO_INCREMENT,
    resultId int,
    keterangan ENUM('disarankan', 'dipertimbangkan', 'tidak disarankan'),
    score int,
    CONSTRAINT FK_reviewResult FOREIGN KEY (resultId) REFERENCES results(id)
);

`;

db.query(sql, function(err: any,result: any) {
    if (err) throw err;
    console.log("Table created")
})