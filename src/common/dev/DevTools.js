/*
runDev

Usage:
If you want to call the function with the proper this obj, you can pass it in bound.
Example:
```js
runDev(this.myFunc.bind(this), a, b, c)
```
*/
export const runDev = function(fn, ...args) {
	if (typeof fn === 'function') {
		if (process.env.NODE_ENV === 'development') {
			fn.call(window, ...args)
		}
	}
}
