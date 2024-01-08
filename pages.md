---
---
*8 Jan 2024* 
## GitHub Pages:&nbsp; Jekyll Installation How-(not)-To
**[Windows](GitHubPages)** with **GitHub Desktop**
**[Windows 10](GitHubW10)**
**[Windows 11](/static/GitHubW11/)**
**[Ubuntu on Windows (WSL)](GitHubWSL) (or NOT)** with **SmartGit**  and its `git-bash.exe`
**[macOS](GitHubMac) High Sierra** with **MacPorts** and **SmartGit**
 - [**Git-Cola installed from MacPorts**](GitColaMacPorts)
 - **macOS local [gitolite](MacGit) server**

*Notes:*
1. Far easier to *instead* install [Chrome extension **Markdown
   Viewer**](https://chrome.google.com/webstore/detail/markdown-viewer/ckkdlimhmcjmikdlpkmbgfkaikojcbjk?hl=en)
2. Unlike html pages, markdown pages (`.md` files) get URLs *without* `.md`
3. If no [`index.md`](/), then Jekyll uses `README.md` for landing page
   **Workaround**:&nbsp;  Create `index.md`, which Jekyll will use instead
4. Jekyll expects UTF-8 character encoding, fails for BOM (Byte Order Mark)
   This was especially problematic with Jekyll style gem files on WSL...
   **Workaround** (using `vim`):
```
   :set nobomb
   :wq
```
5. **IPv6** tends to be problematic, requiring Windows reboots:&nbsp;
   [Disabling IPv6 on Windows 10](https://help.my-private-network.co.uk/support/solutions/articles/6000158531-how-to-disable-ipv6-on-windows-10)
6. Helpful URLs:
  [GitHub Pages Documentation](https://docs.github.com/en/pages) &nbsp; Jekyll is only one way to generate GitHub Pages...
  [GitHub Pages community](https://github.com/orgs/community/discussions/categories/pages)
  [Jekyll Resources](https://jekyllrb.com/resources/)
  [Jekyll Talk! forum](https://talk.jekyllrb.com/)
  [Jekyll github](https://github.com/jekyll) and [github-metadata](https://github.com/jekyll/github-metadata/issues)
7.  **GitHub Page's [default welcome page - Markup tutorial](Welcome)**
