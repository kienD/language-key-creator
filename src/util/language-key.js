import {flow, toLower, trim} from 'lodash/fp';

/**
 * Replaces ampersand with "and".
 */
export function replaceAmpersand(languageKey) {
  return languageKey.replace(/&/gi, 'and');
}

/**
 * Replaces hash "#" with "num".
 */
export function replaceHash(languageKey) {
  return languageKey.replace(/#/gi, 'num');
}

/**
 * Replace spaces with "-".
 */
export function replaceSpaces(languageKey) {
  return languageKey.replace(/\s/gi, '-');
}

/**
 * Replaces variable markers "{0}" with "x".
 */
export function replaceVariables(languageKey) {
  return languageKey.replace(/({\d+})/gi, 'x');
}

/**
 * Remove the following special characters: ", \, /, :, (, ), %, *
 */
export function removeSpecialChars(languageKey) {
  return languageKey.replace(/(["\\/:()%\*])/gi, '');
}

/**
 * Remove trailing punctuation.
 */
export function removeTrailingPunctuation(languageKey) {
  return languageKey.replace(/([.!?]+$)/gi, '');
}

/**
 * Format a String to a language key.
 */
export function toLanguageKey(languageKey) {
  return flow(
    toLower,
    trim,
    removeSpecialChars,
    replaceAmpersand,
    replaceHash,
    replaceSpaces,
    replaceVariables,
    removeTrailingPunctuation,
  )(languageKey);
}
