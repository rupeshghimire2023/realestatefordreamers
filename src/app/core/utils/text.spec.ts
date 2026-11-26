import { toPlainText } from './text';

describe('toPlainText', () => {
  it('strips Markdown syntax but keeps the words', () => {
    const md = '## Buying in 2026\n\nRates are **down** and _inventory_ is up. [Read more](https://example.com)\n\n- Tip one\n- Tip two';
    expect(toPlainText(md)).toBe('Buying in 2026 Rates are down and inventory is up. Read more Tip one Tip two');
  });

  it('drops images and HTML tags', () => {
    expect(toPlainText('Hello ![photo](a.jpg)<br>world')).toBe('Hello world');
  });

  it('keeps underscores inside words', () => {
    expect(toPlainText('pre_approval letter')).toBe('pre_approval letter');
  });

  it('handles plain text and empty values', () => {
    expect(toPlainText('Just a sentence.\nAnother one.')).toBe('Just a sentence. Another one.');
    expect(toPlainText(undefined)).toBe('');
  });
});
