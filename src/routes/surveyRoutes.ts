import { Router } from "express";
import db from "../config/db.ts";
import {type Choice, type Question, type Section, type Survey} from "../interfaces/survey.interface.ts"

const router = Router();

// {
//   "title":"survey 1",
//   "description": "desc here",
//   "startDate":"20/02/2024",
//   "endDate":"30/02/2024",
//   "sections":[
//     {
//       "questions":[
//         {
//           "question_text": "Whats your name?",
//           "question_type": "essay"
//         },
//         {
//           "question_text": "Whats your gender?",
//           "question_type": "choice",
//           "choices": [
//             {
//               "answer_choice": "male"
//             },
//             {
//               "answer_choice": "female"
//             }
//           ]
//         },
//         {
//           "image": "image_url",
//           "question_text": "Choose a number",
//           "question_type": "scale"
//         }
//       ]
//     },
//     {
//       "questions":[
//         {
//           "question_text": "Whats your name? v2",
//           "question_type": "essay"
//         },
//         {
//           "question_text": "Whats your gender? v2",
//           "question_type": "choice",
//           "choices": [
//             {
//               "answer_choice": "male"
//             },
//             {
//               "answer_choice": "female"
//             }
//           ]
//         },
//         {
//           "image": "image_url secondo",
//           "question_text": "Choose a number v2",
//           "question_type": "scale"
//         }
//       ]
//     }
//   ]
// }

//for creation of survey


router.post("/create-survey", async (req, res) => {
  const { title, description, startDate, endDate, sections } = req.body;

  try {
    const surveyQuery = `insert into surveys (title, description, startDate, endDate) values (?, ?, ?, ?)`;

    db.query(
      surveyQuery,
      [title, description, startDate, endDate],
      (err, results) => {
        if (err) throw err;
        res.status(201).send("survey created succesfully");
      }
    );

    try {
      const survey: Survey = req.body;
      const sectionQuery = `insert into sections () values ();`;
      
      survey.sections.forEach((section) => {

        console.log(section);

        section.questions.forEach((question) => {

          console.log(question.question_text);

          if (question.question_type == "choice") {
            console.log("This is a choice!!!");
          }
        });
      });

      //   var sectionJSON = JSON.parse(JSON.stringify(req.body.sections));
      //   let sectionKeys = Object.keys(sectionJSON);
      //   let sectionValues = sectionKeys.map((k) => sectionJSON[k]);

      //   for (var key in sectionValues) {
      //     for (var key1 in sectionValues[key]) {
      //       console.log(sectionValues[key][key1]);
      //      console.log(sectionValues[key]['question_type']);
      //       if (sectionValues[key][key1]?.question_type == "choice") {
      //         console.log("this is a choice");
      //       } else {
      //         console.log("not a choice!");
      //       }
      //     }
      //   }
    } catch (error) {
      res.status(500).send(`error sending questions ${error}`);
    }
  } catch (error) {
    res.status(500).send("error creating survey");
  }
});

//for getting survey by id
router;

export default router;
