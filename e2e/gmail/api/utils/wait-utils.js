/**
 *Function which wait until supplier result won't be undefined.
 * @param supplier {function} Any function which return something.
 * @param timeout {number} Timeout in seconds after which one it trows an Error if result is undefined;
 * @returns {Promise<any>} returns result of supplier if it is not undefined or throw an Error;
 */
function waitUntil(supplier, timeout = 10) {
    return new Promise(async (resolve, reject) => {
        const currentTime = Date.now();
        let executionTime = 0;
        while (executionTime < timeout) {
            const result = await supplier();
            if (result) {
                return resolve(result);
            } else {
                executionTime += (Date.now() / 1000) - (currentTime / 1000);
            }
        }
        reject(new Error(`Time ${timeout} is out`));
    });
}

export {waitUntil}