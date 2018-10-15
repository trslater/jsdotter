export const runDev = (thisObj, fn, ...args) => {
	if (typeof fn === 'function') {
		if (process.env.NODE_ENV === 'development') {
			fn.call(thisObj, ...args)
		}
	}
}
