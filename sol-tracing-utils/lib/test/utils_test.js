"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const dirtyChai = require("dirty-chai");
require("mocha");
const utils_1 = require("../src/utils");
chai.use(dirtyChai);
const expect = chai.expect;
describe('utils', () => {
    describe('#compareLineColumn', () => {
        it('correctly compares LineColumns', () => {
            expect(utils_1.utils.compareLineColumn({ line: 1, column: 3 }, { line: 1, column: 4 })).to.be.lessThan(0);
            expect(utils_1.utils.compareLineColumn({ line: 1, column: 4 }, { line: 1, column: 3 })).to.be.greaterThan(0);
            expect(utils_1.utils.compareLineColumn({ line: 1, column: 3 }, { line: 1, column: 3 })).to.be.equal(0);
            expect(utils_1.utils.compareLineColumn({ line: 0, column: 2 }, { line: 1, column: 0 })).to.be.lessThan(0);
            expect(utils_1.utils.compareLineColumn({ line: 1, column: 0 }, { line: 0, column: 2 })).to.be.greaterThan(0);
        });
    });
    describe('#isRangeInside', () => {
        it('returns true if inside', () => {
            expect(utils_1.utils.isRangeInside({ start: { line: 1, column: 3 }, end: { line: 1, column: 4 } }, { start: { line: 1, column: 2 }, end: { line: 1, column: 5 } })).to.be.true();
        });
        it('returns true if the same', () => {
            expect(utils_1.utils.isRangeInside({ start: { line: 1, column: 3 }, end: { line: 1, column: 4 } }, { start: { line: 1, column: 3 }, end: { line: 1, column: 4 } })).to.be.true();
        });
        it('returns false if not inside', () => {
            expect(utils_1.utils.isRangeInside({ start: { line: 1, column: 3 }, end: { line: 1, column: 4 } }, { start: { line: 1, column: 4 }, end: { line: 1, column: 4 } })).to.be.false();
            expect(utils_1.utils.isRangeInside({ start: { line: 1, column: 3 }, end: { line: 1, column: 4 } }, { start: { line: 1, column: 4 }, end: { line: 1, column: 5 } })).to.be.false();
        });
    });
});
//# sourceMappingURL=utils_test.js.map