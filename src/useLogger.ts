// @ts-ignore
import { around } from 'aspectjs';
import { LoggerFactory } from './logger';


function isPromise(p: any) {
  return p !== null &&
    typeof p === 'object' &&
    typeof p.then === 'function' &&
    typeof p.catch === 'function';
}

function getFunctionName(func: any) {
  return func.name ?? func.toString();
}

function serializeArgs(args: any) {
  if (typeof args === 'object') {
    try {
      return JSON.stringify(args, null, 2);
    } catch (err) {
      return args.toString();
    }
  }
  return args;

}


function logInputs(func: any, args: any) {
  const logger = LoggerFactory.getInstance();

  let serializedArgs: string;
  serializedArgs = serializeArgs(args);
  let functionName = getFunctionName(func);
  logger.log(`Executing ${functionName} with args: ${serializedArgs}`);
}

function logOutputs(func: any, returnValue: any) {
  const logger = LoggerFactory.getInstance();

  const functionName = getFunctionName(func);
  if (isPromise(returnValue)) {
    returnValue.then((val: any) => logger.log(`Function ${functionName} returned: ${serializeArgs(val)}`));
  } else {
    logger.log(`Function ${functionName} returned: ${serializeArgs(returnValue)}`);
  }

}


export function useLogger(func: any) {
  return around(func).add((invocation: any) => {
    const args = invocation.args;
    logInputs(func, args);
    const returnValue = invocation.proceed();
    logOutputs(func, returnValue);
    return returnValue;
  });
}
