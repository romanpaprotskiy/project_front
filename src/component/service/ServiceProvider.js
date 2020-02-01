import ServiceStorage from "./ServiceStorage";
import SecurityService from "../security/SecurityService";
import {LoginService} from "../login/LoginService";
import {ProfileService} from "../profile/ProfileService";

export class ServiceProvider {

    static serviceProvider = new ServiceProvider();

    static provider() {
        return this.serviceProvider;
    }

    constructor() {
        this.registerServices = this.registerServices.bind(this);
        this.registerServices();
    }

    serviceStorage = new ServiceStorage();

    service = {
        SECURITY_SERVICE: "security_service",
        LOGIN_SERVICE: "login_service",
        PROFILE_SERVICE: "profile_service"
    };

    registerServices() {
        this.serviceStorage.register(this.service.SECURITY_SERVICE, new SecurityService());
        this.serviceStorage.register(this.service.LOGIN_SERVICE, new LoginService());
        this.serviceStorage.register(this.service.PROFILE_SERVICE, new ProfileService());
    }

    getService(service) {
        return this.serviceStorage.get(service);
    }
}
