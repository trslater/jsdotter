export const runDev = (fn, ...args) => {
	if (typeof fn === 'function') {
		if (process.env.NODE_ENV === 'development') {
			fn.call(this, ...args)
		}
	}
}
