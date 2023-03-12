/**
 *Method to extract string after some character.
 * @param string{string} Original string.
 * @param char{string} character after which need to extract.
 */

function substringAfterChar(string, char) {
    return string.slice(string.indexOf(char) + 1);
}

export {substringAfterChar}