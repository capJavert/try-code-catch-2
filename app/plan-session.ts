import {Plan} from "./models/plan";
import './rxjs-operators';
'use strict';
import {WebUser} from "./models/user";

export let plan: Plan = new Plan();
export let activities: number[] = [];
export let user: WebUser = new WebUser();

