/**
 * @module Stack
 * @description class to manage a stack data structure
 */
class Stack {
	constructor() {
		this.items = {};
		this.top = 0;
	}

	/**
	 * @name push
	 * @description push an item into the stack
	 * @memberOf Stack
	 * @example Stack.push('example') // this.items = { 0: 'example' }
	 */
	push(data) {
		this.top += 1;
		this.items[this.top] = data;
	}

	/**
	 * @name pop
	 * @description remove an item from the stack.
	 * The rule for removing is LIFO (Last In First Out).
	 * @memberOf Stack
	 * @return {*} return the deleted item
	 * @example Stack.pop() // 'example'
	 */
	pop() {
		if (!this.top) return null;

		const deletedData = this.items[this.top];
		delete this.items[this.top];
		this.top -= 1;

		return deletedData;
	}

	/**
	 * @name getSize
	 * @description method that returns the size of the stack based on top value
	 * @memberOf Stack
	 * @return {number} return the size of the stack
	 * @example Stack.getSize() // 1
	 */
	getSize() {
		return this.top;
	}

	/**
	 * @name isEmpty
	 * @description method that returns true if the stack is empty or false
	 * if the stack has items.
	 * @memberOf Stack
	 * @return {boolean} true || false
	 * @example Stack.isEmpty() // false
	 */
	isEmpty() {
		if (!this.getSize()) return true;
		return false;
	}

	/**
	 * @name peek
	 * @description method that returns the next value but does not remove it from the stack
	 * @memberOf Stack
	 * @return {*}
	 */
	peek() {
		if (this.isEmpty()) return null;
		return this.items[this.top];
	}

	/**
	 * @name print
	 * @description method that prints the items of the stack
	 * @memberOf Stack
	 * @return {string} - string of items
	 * @example Stack.print() // 'item, item2, item3'
	 */
	print() {
		let result = '';
		for (let i = this.top; i > 0; i -= 1) {
			result += `${this.items[i]}, `;
		}
		return result;
	}
}

export default Stack;
