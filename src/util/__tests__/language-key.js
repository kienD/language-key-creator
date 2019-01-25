import {
  capitalizeTitle,
  replaceAmpersand,
  replaceHash,
  replaceSpaces,
  removeSpecialChars,
  removeTrailingPunctuation,
  replaceVariables,
  toLanguageKey,
} from '../language-key';

describe('language-key', () => {
  describe('capitalizeTitle', () => {
    it('should capitalize a title', () => {
      expect(capitalizeTitle('This and that')).toBe('This and That');
    });

    it('should not capitalize a sentence ending in a period', () => {
      const sentence = 'This and that.';

      expect(capitalizeTitle(sentence)).toBe(sentence);
    });

    it('should not capitalize a sentence ending in a question mark', () => {
      const sentence = 'This and that?';

      expect(capitalizeTitle(sentence)).toBe(sentence);
    });

    it('should not capitalize a sentence ending in a exclamation mark', () => {
      const sentence = 'This and that!';

      expect(capitalizeTitle(sentence)).toBe(sentence);
    });
  });

  describe('replaceAmpersand', () => {
    it.each`
      input              | output
      ${'&'}             | ${'and'}
      ${'This & that.'}  | ${'This and that.'}
      ${'This && that.'} | ${'This andand that.'}
    `('should replace & with "and" $input to be $output', ({input, output}) => {
      expect(replaceAmpersand(input)).toBe(output);
    });
  });

  describe('replaceHash', () => {
    it.each`
      input            | output
      ${'#'}           | ${'num'}
      ${'This is #1'}  | ${'This is num1'}
      ${'# of People'} | ${'num of People'}
    `('should replace # with "num" $input to be $output', ({input, output}) => {
      expect(replaceHash(input)).toBe(output);
    });
  });

  describe('replaceSpaces', () => {
    it.each`
      input                                        | output
      ${' '}                                       | ${'-'}
      ${'This is a sentence.'}                     | ${'This-is-a-sentence.'}
      ${'Testing this sentence. Second sentence.'} | ${'Testing-this-sentence.-Second-sentence.'}
    `(
      'should replace spaces with "-" $input to be $output',
      ({input, output}) => {
        expect(replaceSpaces(input)).toBe(output);
      },
    );
  });

  describe('removeSpecialChars', () => {
    it.each`
      input                        | output
      ${'"'}                       | ${''}
      ${'\\'}                      | ${''}
      ${'/'}                       | ${''}
      ${':'}                       | ${''}
      ${'('}                       | ${''}
      ${')'}                       | ${''}
      ${'%'}                       | ${''}
      ${'*'}                       | ${''}
      ${"I'm going to the store."} | ${"I'm going to the store."}
      ${'http://www.google.com'}   | ${'httpwww.google.com'}
    `(
      'should remove punctuation from $input to be $output',
      ({input, output}) => {
        expect(removeSpecialChars(input)).toBe(output);
      },
    );
  });

  describe('removeTrailingPunctuation', () => {
    it.each`
      input                         | output
      ${'Hello...'}                 | ${'Hello'}
      ${'I am going to the store.'} | ${'I am going to the store'}
      ${'Hello world!'}             | ${'Hello world'}
      ${'Is this a question?'}      | ${'Is this a question'}
    `(
      'should remove trailing punctuation from $input to be $output',
      ({input, output}) => {
        expect(removeTrailingPunctuation(input)).toBe(output);
      },
    );
  });

  describe('replaceVariables', () => {
    it.each`
      input                                             | output
      ${'{}'}                                           | ${'{}'}
      ${'{0}'}                                          | ${'x'}
      ${'{0} {1} {2} {3} {4} {5} {6} {7} {8} {9} {10}'} | ${'x x x x x x x x x x x'}
      ${'{0} is going to the store with {1}.'}          | ${'x is going to the store with x.'}
      ${'Hello world!'}                                 | ${'Hello world!'}
    `('should replace variables with x', ({input, output}) => {
      expect(replaceVariables(input)).toBe(output);
    });
  });

  describe('toLanguageKey', () => {
    it.each`
      input                      | output
      ${' This is a sentence. '} | ${'this-is-a-sentence'}
      ${'This is a sentence.'}   | ${'this-is-a-sentence'}
      ${'Test'}                  | ${'test'}
      ${'New {0} for List: {1}'} | ${'new-x-for-list-x'}
    `('should convert $input to be $output', ({input, output}) => {
      expect(toLanguageKey(input)).toBe(output);
    });
  });
});
