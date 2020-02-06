import {App} from "./app";
import {ProfileService} from "./services/profile.service";
import {UtilsService} from "./services/utils.service";

const profile = new ProfileService();
const utils = new UtilsService();
const app = new App(profile, utils);
app.initializeApp();
