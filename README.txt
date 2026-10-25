PRECIOUS MASHAWA — PORTFOLIO WEBSITE
====================================

PUT IT LIVE (cPanel)
1. cPanel > File Manager > public_html
2. Move all the OLD website files into a new folder called old-site
   (leave cgi-bin and .well-known alone). This stops the old site showing.
3. Upload this zip into public_html > right-click > Extract > delete the zip.
4. Turn on "Show Hidden Files" (Settings, top right) and check .htaccess is there.
5. Open https://preciousmashawa.co.zw in a private/incognito window.
   If LiteSpeed Cache is in cPanel, click "Flush All".

The services site stays separate at hub.preciousmashawa.co.zw.
Do NOT upload this into the hub folder.

UPDATE CONTENT — edit only js/data.js
- Social links (GitHub, LinkedIn...): paste URLs; empty ones are hidden.
- Projects: add "live" (website link) and "code" (GitHub link).
- Project screenshots: put images in assets/projects/ and set "image".
- Certificates: image or PDF in assets/certificates/ + one line in the list.
- CV: replace assets/Precious_Mashawa_CV.pdf (keep the same name).
