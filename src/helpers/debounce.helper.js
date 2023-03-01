/**
 * Returns a debounced function, so that the execution
 * of the given callback only occurs once the indicated
 * timeout runs out.
 *
 * @param {Function} func
 * @param {number} [timeout=500]
 * @returns {Function}
 */
function debounce(func, timeout = 500) {
	let timer;

	return (...args) => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

export default debounce;