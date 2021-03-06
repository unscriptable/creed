// Unfortunately, jscs indentation does weird things to the TaskQueue
// method bodies.  Have to disable for now.
// jscs:disable

'use strict';

import makeAsync from './async';

export default class TaskQueue {
	constructor() {
		this.tasks = new Array(2 << 15);
		this.length = 0;
		this.drain = makeAsync(() => this._drain());
	}

	add(task) {
		if (this.length === 0) {
			this.drain();
		}

		this.tasks[this.length++] = task;
	}

	_drain() {
		let q = this.tasks;
		for (let i = 0; i < this.length; ++i) {
			q[i].run();
			q[i] = void 0;
		}
		this.length = 0;
	}
}
