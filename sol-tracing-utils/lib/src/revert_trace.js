"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRevertTrace = void 0;
const utils_1 = require("@0x/utils");
const ethereum_types_1 = require("ethereum-types");
const _ = require("lodash");
const constants_1 = require("./constants");
const utils_2 = require("./utils");
/**
 * Converts linear trace to a call stack by following calls and returns
 * @param structLogs Linear trace
 * @param startAddress The address of initial context
 */
function getRevertTrace(structLogs, startAddress) {
    const evmCallStack = [];
    const addressStack = [startAddress];
    if (_.isEmpty(structLogs)) {
        return [];
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < structLogs.length; i++) {
        const structLog = structLogs[i];
        if (structLog.depth !== addressStack.length - 1) {
            throw new Error("Malformed trace. Trace depth doesn't match call stack depth");
        }
        // After that check we have a guarantee that call stack is never empty
        // If it would: callStack.length - 1 === structLog.depth === -1
        // That means that we can always safely pop from it
        if (utils_2.utils.isCallLike(structLog.op)) {
            const currentAddress = _.last(addressStack);
            const newAddress = utils_2.utils.getAddressFromStackEntry(structLog.stack[structLog.stack.length - constants_1.constants.opCodeToParamToStackOffset[ethereum_types_1.OpCode.Call].to - 1]);
            // Sometimes calls don't change the execution context (current address). When we do a transfer to an
            // externally owned account - it does the call and immediately returns because there is no fallback
            // function. We manually check if the call depth had changed to handle that case.
            const nextStructLog = structLogs[i + 1];
            if (nextStructLog.depth !== structLog.depth) {
                addressStack.push(newAddress);
                evmCallStack.push({
                    address: currentAddress,
                    structLog,
                });
            }
        }
        else if (utils_2.utils.isEndOpcode(structLog.op) && structLog.op !== ethereum_types_1.OpCode.Revert) {
            // Just like with calls, sometimes returns/stops don't change the execution context (current address).
            const nextStructLog = structLogs[i + 1];
            if (nextStructLog === undefined || nextStructLog.depth !== structLog.depth) {
                evmCallStack.pop();
                addressStack.pop();
            }
            if (structLog.op === ethereum_types_1.OpCode.SelfDestruct) {
                // After contract execution, we look at all sub-calls to external contracts, and for each one, fetch
                // the bytecode and compute the coverage for the call. If the contract is destroyed with a call
                // to `selfdestruct`, we are unable to fetch it's bytecode and compute coverage.
                // TODO: Refactor this logic to fetch the sub-called contract bytecode before the selfdestruct is called
                // in order to handle this edge-case.
                utils_1.logUtils.warn("Detected a selfdestruct. We currently do not support that scenario. We'll just skip the trace part for a destructed contract");
            }
        }
        else if (structLog.op === ethereum_types_1.OpCode.Revert) {
            evmCallStack.push({
                address: _.last(addressStack),
                structLog,
            });
            return evmCallStack;
        }
        else if (structLog.op === ethereum_types_1.OpCode.Create) {
            // TODO: Extract the new contract address from the stack and handle that scenario
            utils_1.logUtils.warn("Detected a contract created from within another contract. We currently do not support that scenario. We'll just skip that trace");
            return [];
        }
        else {
            if (structLog !== _.last(structLogs)) {
                const nextStructLog = structLogs[i + 1];
                if (nextStructLog.depth === structLog.depth) {
                    continue;
                }
                else if (nextStructLog.depth === structLog.depth - 1) {
                    addressStack.pop();
                }
                else {
                    throw new Error('Malformed trace. Unexpected call depth change');
                }
            }
        }
    }
    if (evmCallStack.length !== 0) {
        utils_1.logUtils.warn('Malformed trace. Call stack non empty at the end. (probably out of gas)');
    }
    return [];
}
exports.getRevertTrace = getRevertTrace;
//# sourceMappingURL=revert_trace.js.map