import os
import markdown
import jinja2
import json
import datetime
import watchfiles
from feedgen.feed import FeedGenerator
from slugify import slugify

def build():
    posts = []
    themes = jinja2.Environment(loader=jinja2.FileSystemLoader('themes'))
    base = themes.get_template('base.html')
    files = os.listdir('content')
    fg = FeedGenerator()
    fg.id("https://clearwind.ca")
    fg.title("Clearwind Consulting")
    fg.logo("https://clearwind.ca/static/logo.png")
    fg.language("en")

    for file in files:
        if file.endswith(".md"):
            with open(f"content/{file}", "r") as fh:
                markdown_content = fh.read()

                metadata_file = file.replace(".md", ".json")
                with open(f"content/{metadata_file}", "r") as metadata_file:
                    metadata = json.load(metadata_file)
                post={
                    "slug": slugify(f"{metadata['date']} {metadata['title']}"),
                    "title": metadata["title"],
                    "date": datetime.datetime.strptime(metadata["date"], "%Y-%m-%d"),
                    "filename": file,
                    "markdown": markdown_content,
                    "html": markdown.markdown(markdown_content)
                }
                posts.append(post)
                fe = fg.add_entry()
                fe.id(post["slug"])
                fe.title(post["title"])
                fe.link(href=f"https://clearwind.ca/#{post['slug']}")
                fe.content(post["html"], type="html")
                

    html_content = base.render({"posts": posts})
    with open(f"docs/index.html", "w") as html_fh:
        print("Writing docs/index.html")
        html_fh.write(html_content)

    print("Writing docs/atom.xml")
    fg.atom_file("docs/atom.xml")

build()
for changes in watchfiles.watch("content", "themes"):
    print('Rebuilding due to changes')
    build()