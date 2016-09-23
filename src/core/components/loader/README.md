# Loader Component

## Usage

> Usage is quite simple as it should be. 

Just add the loader around the block you want to hide until loading is complete.
```html
<loader active="$ctrl.loading">
  <something-that-takes-a-while></something-that-takes-a-while>
</loader>
```
Then in your controller simply register a loading variable and change it once load is complete
```javascript
class YourClass {
  constructor() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}
```

## Changing the loader styling

If you would lke to change the styling of the loader you can checkout the `loader.template.html` and `loader.style.css` files. The most important part is that the following content stays intact
```html
<div class="loading-content" ng-if="!$ctrl.active">
  <ng-transclude></ng-transclude>
</div>
```
