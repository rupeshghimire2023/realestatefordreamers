import { MarkdownPipe } from './markdown.pipe';

describe('MarkdownPipe', () => {
  const pipe = new MarkdownPipe();

  it('renders Markdown to HTML', () => {
    const html = pipe.transform('## Title\n\nSome **bold** text');
    expect(html).toContain('<h2>Title</h2>');
    expect(html).toContain('<strong>bold</strong>');
  });

  it('keeps line breaks in plain-text posts', () => {
    expect(pipe.transform('Line one\nLine two')).toContain('<br>');
  });

  it('returns an empty string for missing content', () => {
    expect(pipe.transform(undefined)).toBe('');
  });
});
