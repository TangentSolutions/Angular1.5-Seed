import 'angular-mocks';
import App from './app.controller';

describe('some test', () => {
    it('should expect something', function () {
        let app = new App();

        expect(app.member).toBe('Test');
    });
});
