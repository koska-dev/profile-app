import {App} from "./app";
import {ProfileRepository, ProfileService} from "./services";

const profile = new ProfileService();
const profileRepository = new ProfileRepository();
const app = new App(profile, profileRepository);
app.initializeApp();
