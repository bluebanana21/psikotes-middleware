import type { string } from "zod";

export default interface User {
    id: number;
  name: string;
  email: string;
  DoB: string;
  PoB: string;
  gender: string;
  role: string
}

export interface UserInput{
  name: string;
  email: string;
  password: string;
}