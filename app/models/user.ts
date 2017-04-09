import {Plan} from "./Plan";

export class WebUser {
  id: number;
  ime: string;
  email: string;
  plans: Plan[];
  redirect: string = "";
}
