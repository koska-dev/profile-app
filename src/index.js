import {App} from "./app";
import {ProfileService} from "./services/profile.service";
import {ProfileRepository} from "./services/profile-repository.service";

const profile = new ProfileService();
const profileRepository = new ProfileRepository();
const app = new App(profile, profileRepository);
app.initializeApp();
