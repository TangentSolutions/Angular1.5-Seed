import App from './app.controller';

describe('some test', () => {
    beforeEach(angular.mock.module('app'));

    var $q;

    beforeEach(angular.mock.inject((_$q_) => {
        $q = _$q_;
    }))

    it('should expect something', function () {
        let app = new App();

        expect(app.member).toBe('Test');
    });
});
