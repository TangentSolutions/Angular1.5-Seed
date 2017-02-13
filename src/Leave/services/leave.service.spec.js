import LeaveService from './leave.service';

describe('Class LeaveService', () => {


  beforeEach(angular.mock.module('app'));

  var $http, $httpBackend, PROJECT_SERVICE_BASE_URI, $q, $cookies, $filter, leaveService, $scope;

  beforeEach(angular.mock.inject(( _$http_, _$httpBackend_, _PROJECT_SERVICE_BASE_URI_, _$q_, _$cookies_, _$filter_, _$rootScope_) => {
    $httpBackend = _$httpBackend_;
    $http = _$http_;
    $scope = _$rootScope_.$new();
    PROJECT_SERVICE_BASE_URI = _PROJECT_SERVICE_BASE_URI_;
    $q = _$q_;
    $cookies = _$cookies_;
    $filter = _$filter_;
    leaveService = createService();
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  function getRandomToken() {
    return Math.random().toString(36).substring(10);
  }

  function createService(_$http = $http, _PROJECT_SERVICE_BASE_URI = PROJECT_SERVICE_BASE_URI, _$q = $q, _$cookies = $cookies, _$filter = $filter) {
    let service = new LeaveService(_$http, _PROJECT_SERVICE_BASE_URI, _$q, _$cookies, _$filter);
    return service;
  }

  describe('Constructor', () => {
    it('defines apiDates property', () => {
      expect(leaveService.apiDates).toBeDefined();
    });

    it('defines apiDateFormat property', () => {
      expect(leaveService.apiDateFormat).toBeDefined();
    })
  });

  describe('getNewLeaveDefaults', () => {
    it('returns a promise', () => {
      let promise = leaveService.getNewLeaveDefaults();
      expect(promise.constructor.name).toBe('Promise');
    });
  });

  describe('get()', () => {

    it('should pass searchQuery to $http call', () => {
      let defer = $q.defer();
      spyOn(leaveService, '$http').and.returnValue(defer.promise);
      leaveService.get({some: 'query'});
      expect(leaveService.$http).toHaveBeenCalledWith(jasmine.objectContaining({
        params: {some: 'query'}
      }));
    });

    it('should return a promise', () => {
      $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(200);
      let response = leaveService.get();
      expect(response.constructor.name).toBe('Promise');
      $httpBackend.flush();
    });

    it('should pass authentication header', () => {
      $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/', undefined, (headers) => {
        return typeof headers['Authorization'] !== 'undefined';
      }).respond(200);
      leaveService.get();
      $httpBackend.flush();
    });

    it('should use cookie token aith authentication headers', () => {
      let token = getRandomToken();
      leaveService.$cookies.put('token', token);
      $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/', undefined, (headers) => {
        return headers['Authorization'] === 'Token ' + token;
      }).respond(200);
      leaveService.get();
      $httpBackend.flush();
    });

    it('should return full response when promise resolves', () => {
      $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(200, '[{"pk": 1, "title": "test title 1"},{"pk": 2, "title": "test title 2"}]');
      leaveService.get()
      .then((response) => {
        expect(response.data).toEqual([{pk: 1, title: 'test title 1'},{pk: 2, title: 'test title 2'}]);
      }, () => {
        fail();
      });
      $httpBackend.flush();
    });

    it('should return full response when promise rejects', () => {
      $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(500, 'server error');
      leaveService.get()
      .then(() => {
        fail()
      }, (response) => {
        expect(response.status).toBe(500);
        expect(response.data).toBe('server error');
      });
      $httpBackend.flush();
    });

    it('should loop objects for passing to _dateStringsToObjects', () => {
      $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(200, '[{"pk": 3,"start_date": "2015-05-20"}]');
      spyOn(angular, 'forEach');
      leaveService.get();
      $httpBackend.flush();
      expect(angular.forEach).toHaveBeenCalled();
    });

    it('should call date conversion before resolve()', () => {
      $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(200, '[{"pk": 3,"start_date": "2015-05-20"}]');
      spyOn(leaveService, '_dateStringsToObjects');
      leaveService.get();
      $httpBackend.flush();
      expect(leaveService._dateStringsToObjects).toHaveBeenCalledWith({pk: 3, start_date: '2015-05-20'});
    });
  });

  describe('fetch()', () => {
    it('should return a promise', () => {
      $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200);
      let response = leaveService.fetch(2);
      expect(response.constructor.name).toBe('Promise');
      $httpBackend.flush();
    });

    it('should use authentication headers', () => {
      $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/2/', undefined, (headers) => {
        return typeof headers['Authorization'] !== 'undefined';
      }).respond(200, '');
      leaveService.fetch(2);
      $httpBackend.flush();
    });

    it('should use cookie token in authentication header', () => {
      let token = getRandomToken();
      leaveService.$cookies.put('token', token);
      $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/2/', undefined, (headers) => {
        return headers['Authorization'] === 'Token ' + token;
      }).respond(200, '');
      leaveService.fetch(2);
      $httpBackend.flush();
    });

    it('should return full response on success', () => {
      $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200, '{"pk": 2, "title": "test title"}');
      leaveService.fetch(2)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.data).toEqual({pk: 2, title: 'test title'});
      }, () => {
        fail();
      });
      $httpBackend.flush();
    });

    it('should return full HTTP response on failure', () => {
      $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(500, 'failure on server');
      leaveService.fetch(2)
      .then(() => {
        fail();
      }, (response) => {
        expect(response.status).toBe(500);
        expect(response.data).toBe('failure on server');
      });
      $httpBackend.flush();
    });

    it('should call date conversion before resolve()', () => {
      $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200, '{"pk": 2,"start_date": "2015-05-20"}');
      spyOn(leaveService, '_dateStringsToObjects');
      leaveService.fetch(2);
      $httpBackend.flush();
      expect(leaveService._dateStringsToObjects).toHaveBeenCalledWith({pk: 2, start_date: '2015-05-20'});
    });
  });

  describe('update()', () => {
    it('should return a promise', () => {
      $httpBackend.expectPUT(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200, '{"pk": 3, "title": "test title"}');
      let response = leaveService.update(2, {title: 'test title'});
      expect(response.constructor.name).toBe('Promise');
      $httpBackend.flush();
    });

    it('should use authentication headers', () => {
      $httpBackend.expectPUT(PROJECT_SERVICE_BASE_URI + 'leaves/2/', undefined, (headers) => {
        return typeof headers['Authorization'] !== 'undefined';
      }).respond(200, '{"pk": 3, "title": "test title"}');
      leaveService.update(2, {title: 'test title'});
      $httpBackend.flush();
    })

    it('should use token cookie in authentication headers', () => {
      let token = Math.random().toString(36).substring(7);
      leaveService.$cookies.put('token', token);
      $httpBackend.expectPUT(PROJECT_SERVICE_BASE_URI + 'leaves/2/', undefined, (headers) => {
        return headers['Authorization'] === 'Token ' + token;
      }).respond(200, '{"pk": 3, "title": "test title"}');
      leaveService.update(2, {title: 'test title'});
      $httpBackend.flush();
    });

    it('should resolve and return full response on 2xx http response', () => {
      $httpBackend.expectPUT(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200, '{"pk": 2, "title": "test title"}');
      leaveService.update(2, {title: "test title"})
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.data).toEqual({pk: 2, title: 'test title'});
      }, () => {
        fail();
      });
      $httpBackend.flush();
    });

    it('should reject and return full response on 4xx http response', () => {
      $httpBackend.expectPUT(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(404, 'not found');
      leaveService.update(2, {title: "test title"})
      .then(() => {
        fail();
      }, (response) => {
        expect(response.status).toBe(404);
        expect(response.data).toEqual('not found');
      });
      $httpBackend.flush();
    });

    it('should call date conversion before resolve()', () => {
      $httpBackend.expectPUT(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200, '{"pk": 2, "start_date": "2015-05-20"}');
      spyOn(leaveService, '_dateStringsToObjects');
      leaveService.update(2, {title: 'test title'});
      $httpBackend.flush();
      expect(leaveService._dateStringsToObjects).toHaveBeenCalledWith({pk: 2, start_date: '2015-05-20'});
    });

    it('should convert date objects to strings before http request ', () => {
      spyOn(leaveService, '_dateObjectsToStrings');
      $httpBackend.expectPUT(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200, '{"pk": 2, "start_date": "2015-05-20"}');
      leaveService.update(2, {start_date: new Date('2015-05-20')});
      expect(leaveService._dateObjectsToStrings).toHaveBeenCalledWith({start_date: new Date('2015-05-20')});
      $httpBackend.flush();
    });
  });

  describe('create()', () => {
    it('returns a promise', () => {
      $httpBackend.expectPOST(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(200);
      let promise = leaveService.create({title: 'the title'});
      expect(promise.constructor.name).toBe('Promise');
      $httpBackend.flush();
    });

    it('should pass authentication header', () => {
      $httpBackend.expectPOST(PROJECT_SERVICE_BASE_URI + 'leaves/', undefined, function(headers) {
        // check if the header was sent, if it wasn't the expectation won't
        // match the request and the test will fail
        return typeof headers['Authorization'] !== 'undefined';
      }).respond(201, '');
      leaveService.create({title: "test title"});
      $httpBackend.flush();
    });

    it('should use cookie token in auth header', () => {
      let token = Math.random().toString(36).substring(7);
      leaveService.$cookies.put('token', token);
      $httpBackend.expectPOST(PROJECT_SERVICE_BASE_URI + 'leaves/', undefined, function(headers) {
        // check if the header was sent, if it wasn't the expectation won't
        // match the request and the test will fail
        return headers['Authorization'] === 'Token ' + token;
      }).respond(201, '');
      leaveService.create({title: "test title"});
      $httpBackend.flush();
    });

    it('resolves if 201 status is returned', () => {
      $httpBackend.expectPOST(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(201, '{"pk": 3,"title": "test title"}');
      leaveService.create({title: "test title"})
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.data).toEqual({pk: 3,title: "test title"});
      }, () => {
        fail();
      })
      $httpBackend.flush();
    });

    it('rejects if 500 status is returned', () => {
      $httpBackend.expectPOST(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(500, 'erronous create');
      leaveService.create({title: "test title"})
      .then(() => {
        fail();
      }, (response) => {
        expect(response.status).toBe(500);
        expect(response.data).toEqual('erronous create');
      })
      $httpBackend.flush();
    });

    it('should call date conversion before resolve()', () => {
      $httpBackend.expectPOST(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(200, '{"pk": 2, "start_date": "2015-05-20"}');
      spyOn(leaveService, '_dateStringsToObjects');
      leaveService.create({title: 'test title'});
      $httpBackend.flush();
      expect(leaveService._dateStringsToObjects).toHaveBeenCalledWith({pk: 2, start_date: '2015-05-20'});
    });

    it('should convert date objects to strings before http request ', () => {
      spyOn(leaveService, '_dateObjectsToStrings');
      $httpBackend.expectPOST(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(200, '{"pk": 2, "start_date": "2015-05-20"}');
      leaveService.create({start_date: new Date('2015-05-20')});
      expect(leaveService._dateObjectsToStrings).toHaveBeenCalledWith({start_date: new Date('2015-05-20')});
      $httpBackend.flush();
    });
  });

  describe('delete()', () => {
    it('returns a promise', () => {
      $httpBackend.expectDELETE(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200);
      let promise = leaveService.delete(2);
      expect(promise.constructor.name).toBe('Promise');
      $httpBackend.flush();
    });

    it('should pass authentication header', () => {
      $httpBackend.expectDELETE(PROJECT_SERVICE_BASE_URI + 'leaves/2/', undefined, function(headers) {
        // check if the header was sent, if it wasn't the expectation won't
        // match the request and the test will fail
        return typeof headers['Authorization'] !== 'undefined';
      }).respond(201, '');
      leaveService.delete(2);
      $httpBackend.flush();
    });

    it('should use cookie token in auth header', () => {
      let token = Math.random().toString(36).substring(7);
      leaveService.$cookies.put('token', token);
      $httpBackend.expectDELETE(PROJECT_SERVICE_BASE_URI + 'leaves/2/', undefined, function(headers) {
        // check if the header was sent, if it wasn't the expectation won't
        // match the request and the test will fail
        return headers['Authorization'] === 'Token ' + token;
      }).respond(201, '');
      leaveService.delete(2);
      $httpBackend.flush();
    });

    it('should do a request to delete route', () => {
      $httpBackend.expectDELETE(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200, 'created response');
      leaveService.delete(2).then((response) => {
        expect(response.status).toBe(200);
        expect(response.data).toBe('created response');
      }, () => {
        fail();
      });
      $httpBackend.flush();
    });

    it('should reject on 400 statusses', () => {
      $httpBackend.expectDELETE(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(404, 'failed response');
      leaveService.delete(2).then(() => {
        fail();
      }, (response) => {
        expect(response.status).toBe(404);
        expect(response.data).toBe('failed response');
      });
      $httpBackend.flush();
    });
  });


  describe('_dateStringsToObjects()', () => {
    it('should convert date strings to objects', () => {
      let objectContainingDates = {
        start_date: '2015-05-20'
      };
      leaveService.apiDates = ['start_date'];
      let converted = leaveService._dateStringsToObjects(objectContainingDates);
      expect(converted.start_date).toEqual(new Date('2015-05-20'));
    });

    it('should convert only date string added in apiDates property', () => {
      let objectContainingDates = {
        start_date: '2015-05-20',
        end_date: '2015-04-03'
      };
      leaveService.apiDates = ['start_date'];
      let converted = leaveService._dateStringsToObjects(objectContainingDates);
      expect(typeof converted.end_date).toBe('string');
      expect(converted.end_date).toBe('2015-04-03');
      expect(converted.start_date).toEqual(new Date('2015-05-20'));
    });

    it('should continue silenty if apiDates property is not visible on object', () => {
      let objectContainingDates = {
        start_date: '2015-05-20'
      };
      leaveService.apiDates = ['end_date'];
      let converted = leaveService._dateStringsToObjects(objectContainingDates);
      expect(converted.end_date).toBeUndefined();
      expect(typeof converted.start_date).toBe('string');
      expect(converted.start_date).toBe('2015-05-20');
    });
  });

  describe('_dateObjectsToStrings()', () => {
    it('should convert dates to strings', () => {
      let dateContainingObject = {};
      angular.forEach(leaveService.apiDates, (dateProperty) => {
        dateContainingObject[dateProperty] = new Date('2015-05-20');
      });
      let converted = leaveService._dateObjectsToStrings(dateContainingObject);
      angular.forEach(converted, (stringValue) => {
        expect(stringValue).toBe('2015-05-20');
        expect(typeof stringValue).toBe('string');
      });
    });

    it('should not convert strings', () => {
      let dateContainingObject = {};
      angular.forEach(leaveService.apiDates, (dateProperty) => {
        dateContainingObject[dateProperty] = 'unconverted string';
      });
      let converted = leaveService._dateObjectsToStrings(dateContainingObject);
      angular.forEach(converted, (stringValue) => {
        expect(stringValue).toBe('unconverted string');
        expect(typeof stringValue).toBe('string');
      });
    });

    it('should only convert dates if they are in apiDates array', () => {
      let dateContainingObject = {
        'start_date': new Date('2015-05-20'),
        'end_date': new Date('2015-05-20')
      };
      leaveService.apiDates = ['end_date'];

      let converted = leaveService._dateObjectsToStrings(dateContainingObject);

      expect(converted.start_date).toEqual(new Date('2015-05-20'));
      expect(converted.start_date.constructor.name).toBe('Date');
      expect(converted.end_date).toBe('2015-05-20');
      expect(typeof converted.end_date).toBe('string');
    });

    it('should not convert anything if no apiDates are set', () => {
      let dateContainingObject = {
        'start_date': new Date('2015-05-20'),
        'end_date': new Date('2015-05-20')
      };
      leaveService.apiDates = [];

      let converted = leaveService._dateObjectsToStrings(dateContainingObject);

      expect(converted).toEqual(dateContainingObject);
    });

    it('should not freak out if it can\'t find apiDate on object', () => {
      let objectContainingDates = {
        start_date: new Date('2015-05-20')
      };
      leaveService.apiDates = ['end_date'];

      let converted = leaveService._dateObjectsToStrings(objectContainingDates);
      expect(converted).toEqual(objectContainingDates);
    });

    it('should convert to the correct format', () => {
      let date = '2015-05-20';
      let dateContainingObject = {
        start_date: new Date(date)
      };
      leaveService.apiDates = ['start_date'];
      leaveService.apiDateFormat = 'dd-MM-yyyy';

      let converted = leaveService._dateObjectsToStrings(dateContainingObject);
      expect(converted.start_date).toBe('20-05-2015');

      dateContainingObject = {
        start_date: new Date(date)
      };
      leaveService.apiDateFormat = 'MM-dd-yyyy';
      converted = leaveService._dateObjectsToStrings(dateContainingObject);
      expect(converted.start_date).toBe('05-20-2015');
    });
  });

  describe('_getAuthToken', () => {
    it('uses cookies to get current token', () => {
      spyOn(leaveService.$cookies, 'get').and.returnValue('123abc');
      let token = leaveService._getAuthToken();
      expect(token).toBe('123abc');
      expect(leaveService.$cookies.get).toHaveBeenCalledWith('token');
    });
  })
});

    beforeEach(angular.mock.module('app'));

    var $http, $httpBackend, PROJECT_SERVICE_BASE_URI, $q, $cookies, $filter, leaveService, $scope;

    beforeEach(angular.mock.inject((_$http_, _$httpBackend_, _PROJECT_SERVICE_BASE_URI_, _$q_, _$cookies_, _$filter_, _$rootScope_) => {
        $httpBackend = _$httpBackend_;
        $http = _$http_;
        $scope = _$rootScope_.$new();
        PROJECT_SERVICE_BASE_URI = _PROJECT_SERVICE_BASE_URI_;
        $q = _$q_;
        $cookies = _$cookies_;
        $filter = _$filter_;
        leaveService = createService();
    }));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    function getRandomToken() {
        return Math.random().toString(36).substring(10);
    }

    function createService(_$http = $http, _PROJECT_SERVICE_BASE_URI = PROJECT_SERVICE_BASE_URI, _$q = $q, _$cookies = $cookies, _$filter = $filter) {
        let service = new LeaveService(_$http, _PROJECT_SERVICE_BASE_URI, _$q, _$cookies, _$filter);
        return service;
    }

    describe('Constructor', () => {
        it('defines apiDates property', () => {
            expect(leaveService.apiDates).toBeDefined();
        });

        it('defines apiDateFormat property', () => {
            expect(leaveService.apiDateFormat).toBeDefined();
        })
    });

    describe('getNewLeaveDefaults', () => {
        it('returns a promise', () => {
            let promise = leaveService.getNewLeaveDefaults();
            expect(promise.constructor.name).toBe('Promise');
        });
    });

    describe('get()', () => {

        it('should pass searchQuery to $http call', () => {
            let defer = $q.defer();
            spyOn(leaveService, '$http').and.returnValue(defer.promise);
            leaveService.get({
                some: 'query'
            });
            expect(leaveService.$http).toHaveBeenCalledWith(jasmine.objectContaining({
                params: {
                    some: 'query'
                }
            }));
        });

        it('should return a promise', () => {
            $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(200);
            let response = leaveService.get();
            expect(response.constructor.name).toBe('Promise');
            $httpBackend.flush();
        });

        it('should pass authentication header', () => {
            $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/', undefined, (headers) => {
                return typeof headers['Authorization'] !== 'undefined';
            }).respond(200);
            leaveService.get();
            $httpBackend.flush();
        });

        it('should use cookie token aith authentication headers', () => {
            let token = getRandomToken();
            leaveService.$cookies.put('token', token);
            $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/', undefined, (headers) => {
                return headers['Authorization'] === 'Token ' + token;
            }).respond(200);
            leaveService.get();
            $httpBackend.flush();
        });

        it('should return full response when promise resolves', () => {
            $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(200, '[{"pk": 1, "title": "test title 1"},{"pk": 2, "title": "test title 2"}]');
            leaveService.get()
                .then((response) => {
                    expect(response.data).toEqual([{
                        pk: 1,
                        title: 'test title 1'
                    }, {
                        pk: 2,
                        title: 'test title 2'
                    }]);
                }, () => {
                    fail();
                });
            $httpBackend.flush();
        });

        it('should return full response when promise rejects', () => {
            $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(500, 'server error');
            leaveService.get()
                .then(() => {
                    fail()
                }, (response) => {
                    expect(response.status).toBe(500);
                    expect(response.data).toBe('server error');
                });
            $httpBackend.flush();
        });

        it('should loop objects for passing to _dateStringsToObjects', () => {
            $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(200, '[{"pk": 3,"start_date": "2015-05-20"}]');
            spyOn(angular, 'forEach');
            leaveService.get();
            $httpBackend.flush();
            expect(angular.forEach).toHaveBeenCalled();
        });

        it('should call date conversion before resolve()', () => {
            $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(200, '[{"pk": 3,"start_date": "2015-05-20"}]');
            spyOn(leaveService, '_dateStringsToObjects');
            leaveService.get();
            $httpBackend.flush();
            expect(leaveService._dateStringsToObjects).toHaveBeenCalledWith({
                pk: 3,
                start_date: '2015-05-20'
            });
        });
    });

    describe('fetch()', () => {
        it('should return a promise', () => {
            $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200);
            let response = leaveService.fetch(2);
            expect(response.constructor.name).toBe('Promise');
            $httpBackend.flush();
        });

        it('should use authentication headers', () => {
            $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/2/', undefined, (headers) => {
                return typeof headers['Authorization'] !== 'undefined';
            }).respond(200, '');
            leaveService.fetch(2);
            $httpBackend.flush();
        });

        it('should use cookie token in authentication header', () => {
            let token = getRandomToken();
            leaveService.$cookies.put('token', token);
            $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/2/', undefined, (headers) => {
                return headers['Authorization'] === 'Token ' + token;
            }).respond(200, '');
            leaveService.fetch(2);
            $httpBackend.flush();
        });

        it('should return full response on success', () => {
            $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200, '{"pk": 2, "title": "test title"}');
            leaveService.fetch(2)
                .then((response) => {
                    expect(response.status).toBe(200);
                    expect(response.data).toEqual({
                        pk: 2,
                        title: 'test title'
                    });
                }, () => {
                    fail();
                });
            $httpBackend.flush();
        });

        it('should return full HTTP response on failure', () => {
            $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(500, 'failure on server');
            leaveService.fetch(2)
                .then(() => {
                    fail();
                }, (response) => {
                    expect(response.status).toBe(500);
                    expect(response.data).toBe('failure on server');
                });
            $httpBackend.flush();
        });

        it('should call date conversion before resolve()', () => {
            $httpBackend.expectGET(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200, '{"pk": 2,"start_date": "2015-05-20"}');
            spyOn(leaveService, '_dateStringsToObjects');
            leaveService.fetch(2);
            $httpBackend.flush();
            expect(leaveService._dateStringsToObjects).toHaveBeenCalledWith({
                pk: 2,
                start_date: '2015-05-20'
            });
        });
    });

    describe('update()', () => {
        it('should return a promise', () => {
            $httpBackend.expectPUT(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200, '{"pk": 3, "title": "test title"}');
            let response = leaveService.update(2, {
                title: 'test title'
            });
            expect(response.constructor.name).toBe('Promise');
            $httpBackend.flush();
        });

        it('should use authentication headers', () => {
            $httpBackend.expectPUT(PROJECT_SERVICE_BASE_URI + 'leaves/2/', undefined, (headers) => {
                return typeof headers['Authorization'] !== 'undefined';
            }).respond(200, '{"pk": 3, "title": "test title"}');
            leaveService.update(2, {
                title: 'test title'
            });
            $httpBackend.flush();
        })

        it('should use token cookie in authentication headers', () => {
            let token = Math.random().toString(36).substring(7);
            leaveService.$cookies.put('token', token);
            $httpBackend.expectPUT(PROJECT_SERVICE_BASE_URI + 'leaves/2/', undefined, (headers) => {
                return headers['Authorization'] === 'Token ' + token;
            }).respond(200, '{"pk": 3, "title": "test title"}');
            leaveService.update(2, {
                title: 'test title'
            });
            $httpBackend.flush();
        });

        it('should resolve and return full response on 2xx http response', () => {
            $httpBackend.expectPUT(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200, '{"pk": 2, "title": "test title"}');
            leaveService.update(2, {
                    title: "test title"
                })
                .then((response) => {
                    expect(response.status).toBe(200);
                    expect(response.data).toEqual({
                        pk: 2,
                        title: 'test title'
                    });
                }, () => {
                    fail();
                });
            $httpBackend.flush();
        });

        it('should reject and return full response on 4xx http response', () => {
            $httpBackend.expectPUT(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(404, 'not found');
            leaveService.update(2, {
                    title: "test title"
                })
                .then(() => {
                    fail();
                }, (response) => {
                    expect(response.status).toBe(404);
                    expect(response.data).toEqual('not found');
                });
            $httpBackend.flush();
        });

        it('should call date conversion before resolve()', () => {
            $httpBackend.expectPUT(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200, '{"pk": 2, "start_date": "2015-05-20"}');
            spyOn(leaveService, '_dateStringsToObjects');
            leaveService.update(2, {
                title: 'test title'
            });
            $httpBackend.flush();
            expect(leaveService._dateStringsToObjects).toHaveBeenCalledWith({
                pk: 2,
                start_date: '2015-05-20'
            });
        });

        it('should convert date objects to strings before http request ', () => {
            spyOn(leaveService, '_dateObjectsToStrings');
            $httpBackend.expectPUT(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200, '{"pk": 2, "start_date": "2015-05-20"}');
            leaveService.update(2, {
                start_date: new Date('2015-05-20')
            });
            expect(leaveService._dateObjectsToStrings).toHaveBeenCalledWith({
                start_date: new Date('2015-05-20')
            });
            $httpBackend.flush();
        });
    });

    describe('create()', () => {
        it('returns a promise', () => {
            $httpBackend.expectPOST(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(200);
            let promise = leaveService.create({
                title: 'the title'
            });
            expect(promise.constructor.name).toBe('Promise');
            $httpBackend.flush();
        });

        it('should pass authentication header', () => {
            $httpBackend.expectPOST(PROJECT_SERVICE_BASE_URI + 'leaves/', undefined, function(headers) {
                // check if the header was sent, if it wasn't the expectation won't
                // match the request and the test will fail
                return typeof headers['Authorization'] !== 'undefined';
            }).respond(201, '');
            leaveService.create({
                title: "test title"
            });
            $httpBackend.flush();
        });

        it('should use cookie token in auth header', () => {
            let token = Math.random().toString(36).substring(7);
            leaveService.$cookies.put('token', token);
            $httpBackend.expectPOST(PROJECT_SERVICE_BASE_URI + 'leaves/', undefined, function(headers) {
                // check if the header was sent, if it wasn't the expectation won't
                // match the request and the test will fail
                return headers['Authorization'] === 'Token ' + token;
            }).respond(201, '');
            leaveService.create({
                title: "test title"
            });
            $httpBackend.flush();
        });

        it('resolves if 201 status is returned', () => {
            $httpBackend.expectPOST(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(201, '{"pk": 3,"title": "test title"}');
            leaveService.create({
                    title: "test title"
                })
                .then((response) => {
                    expect(response.status).toBe(201);
                    expect(response.data).toEqual({
                        pk: 3,
                        title: "test title"
                    });
                }, () => {
                    fail();
                })
            $httpBackend.flush();
        });

        it('rejects if 500 status is returned', () => {
            $httpBackend.expectPOST(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(500, 'erronous create');
            leaveService.create({
                    title: "test title"
                })
                .then(() => {
                    fail();
                }, (response) => {
                    expect(response.status).toBe(500);
                    expect(response.data).toEqual('erronous create');
                })
            $httpBackend.flush();
        });

        it('should call date conversion before resolve()', () => {
            $httpBackend.expectPOST(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(200, '{"pk": 2, "start_date": "2015-05-20"}');
            spyOn(leaveService, '_dateStringsToObjects');
            leaveService.create({
                title: 'test title'
            });
            $httpBackend.flush();
            expect(leaveService._dateStringsToObjects).toHaveBeenCalledWith({
                pk: 2,
                start_date: '2015-05-20'
            });
        });

        it('should convert date objects to strings before http request ', () => {
            spyOn(leaveService, '_dateObjectsToStrings');
            $httpBackend.expectPOST(PROJECT_SERVICE_BASE_URI + 'leaves/').respond(200, '{"pk": 2, "start_date": "2015-05-20"}');
            leaveService.create({
                start_date: new Date('2015-05-20')
            });
            expect(leaveService._dateObjectsToStrings).toHaveBeenCalledWith({
                start_date: new Date('2015-05-20')
            });
            $httpBackend.flush();
        });
    });

    describe('delete()', () => {
        it('returns a promise', () => {
            $httpBackend.expectDELETE(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200);
            let promise = leaveService.delete(2);
            expect(promise.constructor.name).toBe('Promise');
            $httpBackend.flush();
        });

        it('should pass authentication header', () => {
            $httpBackend.expectDELETE(PROJECT_SERVICE_BASE_URI + 'leaves/2/', undefined, function(headers) {
                // check if the header was sent, if it wasn't the expectation won't
                // match the request and the test will fail
                return typeof headers['Authorization'] !== 'undefined';
            }).respond(201, '');
            leaveService.delete(2);
            $httpBackend.flush();
        });

        it('should use cookie token in auth header', () => {
            let token = Math.random().toString(36).substring(7);
            leaveService.$cookies.put('token', token);
            $httpBackend.expectDELETE(PROJECT_SERVICE_BASE_URI + 'leaves/2/', undefined, function(headers) {
                // check if the header was sent, if it wasn't the expectation won't
                // match the request and the test will fail
                return headers['Authorization'] === 'Token ' + token;
            }).respond(201, '');
            leaveService.delete(2);
            $httpBackend.flush();
        });

        it('should do a request to delete route', () => {
            $httpBackend.expectDELETE(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(200, 'created response');
            leaveService.delete(2).then((response) => {
                expect(response.status).toBe(200);
                expect(response.data).toBe('created response');
            }, () => {
                fail();
            });
            $httpBackend.flush();
        });

        it('should reject on 400 statusses', () => {
            $httpBackend.expectDELETE(PROJECT_SERVICE_BASE_URI + 'leaves/2/').respond(404, 'failed response');
            leaveService.delete(2).then(() => {
                fail();
            }, (response) => {
                expect(response.status).toBe(404);
                expect(response.data).toBe('failed response');
            });
            $httpBackend.flush();
        });
    });


    describe('_dateStringsToObjects()', () => {
        it('should convert date strings to objects', () => {
            let objectContainingDates = {
                start_date: '2015-05-20'
            };
            leaveService.apiDates = ['start_date'];
            let converted = leaveService._dateStringsToObjects(objectContainingDates);
            expect(converted.start_date).toEqual(new Date('2015-05-20'));
        });

        it('should convert only date string added in apiDates property', () => {
            let objectContainingDates = {
                start_date: '2015-05-20',
                end_date: '2015-04-03'
            };
            leaveService.apiDates = ['start_date'];
            let converted = leaveService._dateStringsToObjects(objectContainingDates);
            expect(typeof converted.end_date).toBe('string');
            expect(converted.end_date).toBe('2015-04-03');
            expect(converted.start_date).toEqual(new Date('2015-05-20'));
        });

        it('should continue silenty if apiDates property is not visible on object', () => {
            let objectContainingDates = {
                start_date: '2015-05-20'
            };
            leaveService.apiDates = ['end_date'];
            let converted = leaveService._dateStringsToObjects(objectContainingDates);
            expect(converted.end_date).toBeUndefined();
            expect(typeof converted.start_date).toBe('string');
            expect(converted.start_date).toBe('2015-05-20');
        });
    });

    describe('_dateObjectsToStrings()', () => {
        it('should convert dates to strings', () => {
            let dateContainingObject = {};
            angular.forEach(leaveService.apiDates, (dateProperty) => {
                dateContainingObject[dateProperty] = new Date('2015-05-20');
            });
            let converted = leaveService._dateObjectsToStrings(dateContainingObject);
            angular.forEach(converted, (stringValue) => {
                expect(stringValue).toBe('2015-05-20');
                expect(typeof stringValue).toBe('string');
            });
        });

        it('should not convert strings', () => {
            let dateContainingObject = {};
            angular.forEach(leaveService.apiDates, (dateProperty) => {
                dateContainingObject[dateProperty] = 'unconverted string';
            });
            let converted = leaveService._dateObjectsToStrings(dateContainingObject);
            angular.forEach(converted, (stringValue) => {
                expect(stringValue).toBe('unconverted string');
                expect(typeof stringValue).toBe('string');
            });
        });

        it('should only convert dates if they are in apiDates array', () => {
            let dateContainingObject = {
                'start_date': new Date('2015-05-20'),
                'end_date': new Date('2015-05-20')
            };
            leaveService.apiDates = ['end_date'];

            let converted = leaveService._dateObjectsToStrings(dateContainingObject);

            expect(converted.start_date).toEqual(new Date('2015-05-20'));
            expect(converted.start_date.constructor.name).toBe('Date');
            expect(converted.end_date).toBe('2015-05-20');
            expect(typeof converted.end_date).toBe('string');
        });

        it('should not convert anything if no apiDates are set', () => {
            let dateContainingObject = {
                'start_date': new Date('2015-05-20'),
                'end_date': new Date('2015-05-20')
            };
            leaveService.apiDates = [];

            let converted = leaveService._dateObjectsToStrings(dateContainingObject);

            expect(converted).toEqual(dateContainingObject);
        });

        it('should not freak out if it can\'t find apiDate on object', () => {
            let objectContainingDates = {
                start_date: new Date('2015-05-20')
            };
            leaveService.apiDates = ['end_date'];

            let converted = leaveService._dateObjectsToStrings(objectContainingDates);
            expect(converted).toEqual(objectContainingDates);
        });

        it('should convert to the correct format', () => {
            let date = '2015-05-20';
            let dateContainingObject = {
                start_date: new Date(date)
            };
            leaveService.apiDates = ['start_date'];
            leaveService.apiDateFormat = 'dd-MM-yyyy';

            let converted = leaveService._dateObjectsToStrings(dateContainingObject);
            expect(converted.start_date).toBe('20-05-2015');

            dateContainingObject = {
                start_date: new Date(date)
            };
            leaveService.apiDateFormat = 'MM-dd-yyyy';
            converted = leaveService._dateObjectsToStrings(dateContainingObject);
            expect(converted.start_date).toBe('05-20-2015');
        });
    });

    describe('_getAuthToken', () => {
        it('uses cookies to get current token', () => {
            spyOn(leaveService.$cookies, 'get').and.returnValue('123abc');
            let token = leaveService._getAuthToken();
            expect(token).toBe('123abc');
            expect(leaveService.$cookies.get).toHaveBeenCalledWith('token');
        });
    })
});
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
