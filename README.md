# valdurstudios.com

The website for Valdur Studios: a plain static site (HTML, CSS, JS), so there's no build step.

## Structure

```
index.html        Page layout and copy
css/style.css     Styles
js/data.js        Projects and team members (edit this to add work)
js/main.js        Renders projects, filters, and team
assets/           Favicon, images (put project screenshots in assets/projects/)
```

## Adding a project

Open `js/data.js` and add an entry to `PROJECTS`. To use a screenshot, drop it in
`assets/projects/` and set `image: "assets/projects/your-file.png"`. If you leave the image out,
the card gets a generated cover.

## Previewing locally

Open `index.html` in a browser, or run a local server:

```
python -m http.server 8000
```

Then go to http://localhost:8000.

## Deploying

Any static host will work. Some options:

- **Porkbun Static Hosting**: free with the domain. Upload these files, or connect a GitHub repo.
- **GitHub Pages / Cloudflare Pages / Netlify**: push to a GitHub repo, connect it to the host,
  then point the domain at it from Porkbun's DNS settings.
