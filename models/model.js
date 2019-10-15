import { Model as BaseModel } from 'vue-api-query';

export default class Model extends BaseModel {
    baseURL() {
        return 'http://api.mofe.com/api/v1';
    }

    request(config) {
        return this.$http.request(config);
    }

    parameterNames() {
        return Object.assign(super.parameterNames(), {
            page: 'page[number]',
            limit: 'page[size]'
        });
    }
}
