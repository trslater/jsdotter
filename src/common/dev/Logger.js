import makeDebugger from 'debug'

makeDebugger.formatters.p = str => {
	return `${parseFloat(str) * 100} %`
}

export default Object.entries({
	info: 'cyan',
	warn: 'yellow',
	error: 'orange',
	fatal: 'red',
	debug: 'magenta',
}).reduce((debuggers, [name, color]) => {
	let currDebugger = makeDebugger(`JDotter:${name}`)
	currDebugger.color = color
	debuggers[name] = currDebugger
	return debuggers
}, {})
