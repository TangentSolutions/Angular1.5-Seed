# Angular1.5-Seed

This AngularJS starter project comes with Mobx and RxJS to satisfy all reactive application needs, and is made to build AngularJS applications in such a way that they can be ported to Angular2 with minimal refactoring and still be production worthy.
 The core principal applied when structuring this starter project is to minimise the amount of refactoring required while keeping a reactive component based application structure in mind.

 There are a few basic examples laid out to understand the structure that was intended, and to put focus on certain limitations that AngularJS has when used in a "forward thinking" way. This is however not a optimal setup but one that caters for the learning curve and conversion from AngularJS to Angular2.

 The project was structured to use a module based approach (separated by functionality) in order to separate concerns providing a clear project layout for both new and experienced developers.


### Setup Dependencies
  1. [npm](https://nodejs.org)
  1. [jspm](http://jspm.io/)

### Getting Started
    $ npm install
    $ jspm install

### Gulp Tasks
    $ gulp build
    $ gulp serve:dev
    $ gulp serve:dist
