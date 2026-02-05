import { createGlobalStyle } from 'styled-components';

export const TiptapContent = createGlobalStyle`
  /* TipTap Content View Styles - Applied to elements displaying TipTap HTML content */
  .tiptap-content-view {

    white-space: pre-wrap; /* Preserve whitespace from editor */
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    
    /* Typography */
    p {
      margin: 0.5em 0;
      line-height: 1.6;
    }

    h1 {
      font-size: 2em;
      font-weight: bold;
      margin: 0.67em 0;
      line-height: 1.2;
    }

    h2 {
      font-size: 1.5em;
      font-weight: bold;
      margin: 0.75em 0;
      line-height: 1.3;
    }

    h3 {
      font-size: 1.17em;
      font-weight: bold;
      margin: 0.83em 0;
      line-height: 1.4;
    }

    h4 {
      font-size: 1em;
      font-weight: bold;
      margin: 1em 0;
      line-height: 1.5;
    }

    h5 {
      font-size: 0.83em;
      font-weight: bold;
      margin: 1.17em 0;
      line-height: 1.6;
    }

    h6 {
      font-size: 0.67em;
      font-weight: bold;
      margin: 1.33em 0;
      line-height: 1.7;
    }

    /* Lists */
    ul.bullet-list,
    ol.ordered-list,
    ul,
    ol {
      padding-left: 40px;
      margin: 1em 0;
      display: block;
      list-style-position: outside;
    }

    ul.bullet-list,
    ul {
      list-style-type: disc;
    }

    ol.ordered-list,
    ol {
      list-style-type: decimal;
    }

    ul.bullet-list ul,
    ul ul {
      list-style-type: circle;
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }

    ul.bullet-list ul ul,
    ul ul ul {
      list-style-type: square;
    }

    li.list-item,
    li {
      margin: 0.25em 0;
      display: list-item;
      list-style-position: outside;
      padding-left: 0.25em;
      line-height: 1.6;
    }

    li.list-item p,
    li p {
      margin: 0;
      display: inline-block;
      width: 100%;
    }

    li.list-item > p:first-child,
    li > p:first-child {
      margin-top: 0;
    }

    li.list-item > p:last-child,
    li > p:last-child {
      margin-bottom: 0;
    }

    /* Ensure lists are properly rendered */
    ul.bullet-list > li,
    ul > li {
      display: list-item;
      list-style-type: disc;
    }

    ol.ordered-list > li,
    ol > li {
      display: list-item;
      list-style-type: decimal;
    }

    /* Blockquote */
    blockquote {
      border-left: 4px solid #d9d9d9;
      padding-left: 1em;
      margin: 1em 0;
      color: #666;
      font-style: italic;
    }

    /* Code */
    code {
      background-color: #f5f5f5;
      padding: 2px 4px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }

    pre {
      background-color: #f5f5f5;
      padding: 1em;
      border-radius: 4px;
      overflow-x: auto;
      margin: 1em 0;

      code {
        background-color: transparent;
        padding: 0;
      }
    }

    /* Links */
    a.editor-link,
    a {
      color: #1890ff;
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        color: #40a9ff;
      }
    }

    /* Images */
    img.editor-image,
    img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      margin: 1em 0;
      display: block;
    }

    img.editor-image[style*='width'],
    img[style*='width'] {
      height: auto !important;
    }

    img.editor-image[style*='height'],
    img[style*='height'] {
      width: auto !important;
    }

    /* Tables */
    table.editor-table,
    table {
      border-collapse: collapse;
      margin: 1em 0;
      width: 100%;
      table-layout: fixed;

      td,
      th {
        border: 1px solid #ccc;
        padding: 8px;
        min-width: 100px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;

        > * {
          margin-bottom: 0;
        }
      }

      th {
        background-color: #fafafa;
        font-weight: bold;
      }
    }

    /* Horizontal Rule */
    hr {
      border: none;
      border-top: 2px solid #d9d9d9;
      margin: 1em 0;
      display: block;
      height: 1px;
      width: 100%;
    }

    /* Text alignment */
    [style*='text-align: left'] {
      text-align: left;
    }

    [style*='text-align: center'] {
      text-align: center;
    }

    [style*='text-align: right'] {
      text-align: right;
    }

    [style*='text-align: justify'] {
      text-align: justify;
    }
  }
`;
