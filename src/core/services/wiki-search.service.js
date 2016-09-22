/**
 * Created by francois on 2016/08/20.
 */
class WikiSearchService {
    constructor($http) {
        'ngInject';
        this.$http = $http;
    }

    get(term) {
        return Rx.Observable.fromPromise(() => {
            return this.$http.get(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${term}&limit=10&namespace=0&format=json`);
        });
    }
}

export default WikiSearchService;
