'use strict';

import { isSettled, isNever } from './inspect';

export default function min(Future, a, b) {
    if(a === b) {
        return a;
    }

    if(isSettled(a) || isNever(b)) {
        return a;
    }

    if(isSettled(b) || isNever(a)) {
        return b;
    }

    let p = new Future();
    a._runAction(new Become(p));
    a._runAction(new Become(p));

    return p;
}

class Become {
    constructor(promise) {
        this.promise = promise;
    }

    fulfilled(p) {
        this.promise._become(p);
    }

    rejected(p) {
        this.promise._become(p);
    }
}