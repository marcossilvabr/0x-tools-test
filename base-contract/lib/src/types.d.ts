import { BlockParam, CallData, LogEntryEvent, TransactionReceiptWithDecodedLogs, TxAccessListWithGas, TxData } from 'ethereum-types';
import { PromiseWithTransactionHash } from './index';
export declare type LogEvent = LogEntryEvent;
export interface ContractEvent<ContractEventArgs> {
    logIndex: number;
    transactionIndex: number;
    transactionHash: string;
    blockHash: string;
    blockNumber: number;
    address: string;
    type: string;
    event: string;
    args: ContractEventArgs;
}
export declare enum SubscriptionErrors {
    SubscriptionNotFound = "SUBSCRIPTION_NOT_FOUND",
    SubscriptionAlreadyPresent = "SUBSCRIPTION_ALREADY_PRESENT"
}
/**
 * Used with `sendTransactionAsync`
 * * shouldValidate: Flag indicating whether the library should make attempts to validate a transaction before
 * broadcasting it. For example, order has a valid signature, maker has sufficient funds, etc. Default=true.
 */
export interface SendTransactionOpts {
    shouldValidate?: boolean;
}
/**
 * Used with `awaitTransactionSuccessAsync`
 * * pollingIntervalMs: Determine polling intervals in milliseconds
 * * timeoutMs: Determines timeout in milliseconds
 */
export interface AwaitTransactionSuccessOpts extends SendTransactionOpts {
    pollingIntervalMs?: number;
    timeoutMs?: number;
}
export interface ContractFunctionObj<T> {
    selector: string;
    callAsync(callData?: Partial<CallData>, defaultBlock?: BlockParam): Promise<T>;
    getABIEncodedTransactionData(): string;
}
export interface ContractTxFunctionObj<T> extends ContractFunctionObj<T> {
    sendTransactionAsync(txData?: Partial<TxData>, opts?: SendTransactionOpts): Promise<string>;
    awaitTransactionSuccessAsync(txData?: Partial<TxData>, opts?: AwaitTransactionSuccessOpts): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>;
    estimateGasAsync(txData?: Partial<TxData>): Promise<number>;
    createAccessListAsync(txData?: Partial<TxData>, defaultBlock?: BlockParam, shouldOptimize?: boolean): Promise<TxAccessListWithGas>;
}
//# sourceMappingURL=types.d.ts.map