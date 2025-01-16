import DataAccess from "./basic";
import { userDB, historyDB, courseDB } from "../models";

const userDA = new DataAccess(userDB);
const historyDA = new DataAccess(historyDB);
const courseDA = new DataAccess(courseDB);

export { userDA, historyDA, courseDA };

