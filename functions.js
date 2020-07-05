const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');

const message = `# Convert Funretro Public to Text

## Usage

Add FunRetro Public URL to url query parameter in current url.

http://localhost:3000/?url=FUNRETRO_PUBLIC_URL`;

const waitRender = 5000; // wait 5 seconds to render

const convert = async (req, res) => {
  const url = req.query.url;
  if (!url) return res.send(`<pre><code>${message}</code></pre>`);

  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto(url);
  await page.waitFor(waitRender);

  const responseText = await page.content();
  const dom = new JSDOM(responseText);
  const domColumns = dom.window.document.querySelectorAll('.column');

  if (!domColumns.length) return res.send('error occured, might be wrong url');

  let listHtml = `<ul>`;
  domColumns.forEach((domColumn) => {
    listHtml += `<br><br><br>`;
    domColumn.querySelectorAll('.text').forEach((domCard) => {
      listHtml += `<li>${domCard.textContent}</li>`;
    });
  });
  listHtml += `</ul>`;

  await browser.close();

  return res.status(200).send(listHtml);
};

module.exports = convert;
