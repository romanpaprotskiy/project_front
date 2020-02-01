export class ServiceStorage {

    _storage = new Map();

    get(service) {
        return this._storage.get(service);
    }

    register(serviceName, service) {
        this._storage.set(serviceName, service);
    }
}

export default ServiceStorage;
