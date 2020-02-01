import ServiceStorage from "./ServiceStorage";
import SecurityService from "../security/SecurityService";
import {LoginService} from "../security/LoginService";

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
        LOGIN_SERVICE: "login_service"
    };

    registerServices() {
        this.serviceStorage.register(this.service.SECURITY_SERVICE, new SecurityService());
        this.serviceStorage.register(this.service.LOGIN_SERVICE, new LoginService());
    }

    getService(service) {
        return this.serviceStorage.get(service);
    }
}
