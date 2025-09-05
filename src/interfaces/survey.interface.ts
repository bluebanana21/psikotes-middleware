export interface Choice {
  answer_choice: string;
}

export interface Question {
  question_text: string;
  question_type: "essay" | "choice" | "scale"; 
  choices?: Choice[];
  image?: string;
}

export interface Section {
  questions: Question[];
}

export interface Survey {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  sections: Section[];
}