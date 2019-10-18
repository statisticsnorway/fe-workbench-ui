export const lowerCaseFirst = (string) => {
  if (typeof string === 'string') {
    return string.charAt(0).toLowerCase() + string.slice(1)
  } else {
    return string
  }
}

/**
 * This function replaces placeholders with parameters in a string. Placeholders in format {x} where x is the
 * index in the supplied params array.
 *
 * Example: stringFormat('{0}, {1}!', 'Hello', 'World' returns 'Hello, World!'
 *
 * @param template string to format
 * @param params parameters to inject
 * @returns {string|boolean}
 */
export const stringFormat = (template, ...params) => {
  if (params instanceof Array && params.length === 0) {
    return template
  }
  if (typeof template === 'string' && (params instanceof Array)) {

    return template.replace(/({\d})/g, function(i) {
      return params[i.replace(/{/, '').replace(/}/, '')];
    });
  } else if (typeof template === 'string' && (params instanceof Object)) {

    if (Object.keys(params).length === 0) {
      return template;
    }

    params.forEach(function (element) {
      return template.replace(/({([^}]+)})/g, function (i) {
        i.replace(/{/, '').replace(/}/, '');
        if (!element) {
          return i;
        }

        return element;
      });
    });
  } else if (typeof template === 'string' && (!params instanceof Array  || !params instanceof Object)) {

    return template;
  } else {

    return false;
  }
}
