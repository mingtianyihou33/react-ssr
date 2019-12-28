const express = require('express')
const puppetter = require('puppeteer')
const path = require('path')
const app = new express()

async function test () {
  const browser = await puppetter.launch()
  const page = await browser.newPage()
  await page.goto('https://github.com/puppeteer/puppeteer')
  // await page.goto('http://localhost:3000/home')
  await page.screenshot({ path: 'screen/example.png' })
  await browser.close()
  console.log('success')
}

// test()
const htmlCache = {}
app.get('*', async function (req, res) {
  console.log(req.url)
  if (req.url === '/favicon.ico') {
    res.sendFile(path.resolve(process.cwd(), 'public/favicon.ico'))
  } else {
    if (htmlCache[req.url]) {
      return res.send(htmlCache[req.url])
    }
    const url = `http://localhost:3000${req.url}`
    const browser = await puppetter.launch()
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0' })
    const html = await page.content()
    htmlCache[req.url] = html
    res.send(html)
  }
})
app.listen(8080, () => {
  console.log('ssr server start at: ', 'http://localhost:8080/')
})
