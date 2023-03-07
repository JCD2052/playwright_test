/**
 *
 * @param string{string}
 * @param char{string}
 */

function substringAfterChar(string, char) {
    return string.slice(string.indexOf(char) + 1);
}

export {substringAfterChar}