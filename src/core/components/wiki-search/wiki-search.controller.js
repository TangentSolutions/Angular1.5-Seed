/**
 * Created by francois on 2016/08/20.
 */
class WikiSearchController {
    constructor(WikiSearchService) {
        'ngInject';
        this.wikiSearchService = WikiSearchService;

        this.onSearch = this.onSearch.bind(this);
        this.afterSearch = this.afterSearch.bind(this);
    }

    onSearch(value) {
        if (value !== '' && value !== undefined) {
            return this.wikiSearchService.get(value);
        }
        return Rx.Observable.from([undefined]);
    }

    afterSearch(response) {
        if (response) {
            this.results = response.data[1];
        } else {
            this.results = [];
        }
    }
}

export default WikiSearchController;