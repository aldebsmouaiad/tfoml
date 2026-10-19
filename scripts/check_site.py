"""Check local targets, fragments and assets in the actual MkDocs build."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import yaml

root = Path(__file__).resolve().parents[1] / 'site'
config = yaml.safe_load((root.parent / 'mkdocs.yml').read_text(encoding='utf-8'))
base_path = urlsplit(config['site_url']).path.rstrip('/') + '/'

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids, self.refs = set(), []
        self.feed(path.read_text(encoding='utf-8'))

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        for attr in ('href', 'src'):
            if attrs.get(attr):
                self.refs.append(attrs[attr])

pages = {path: Page(path) for path in sorted(root.rglob('*.html'))}
errors = []
checked = 0
for source, page in pages.items():
    for ref in page.refs:
        parts = urlsplit(ref)
        if parts.scheme or parts.netloc or ref.startswith('//'):
            continue
        if parts.path.startswith('/'):
            # MkDocs correctly uses the configured project prefix on its 404 page.
            if not parts.path.startswith(base_path):
                errors.append(f'{source.relative_to(root)}: URL outside Pages project prefix: {ref}')
                continue
            target = (root / unquote(parts.path[len(base_path):])).resolve()
        else:
            target = (source.parent / unquote(parts.path)).resolve() if parts.path else source
        if target.is_dir():
            target = target / 'index.html'
        if not target.exists():
            errors.append(f'{source.relative_to(root)}: missing {ref}')
            continue
        if parts.fragment and target.suffix == '.html':
            target_page = pages.get(target)
            if target_page and unquote(parts.fragment) not in target_page.ids:
                errors.append(f'{source.relative_to(root)}: missing fragment {ref}')
        checked += 1
index = json.loads((root / 'search/search_index.json').read_text(encoding='utf-8'))
if len(index['docs']) < 10:
    errors.append('Search index has too few entries.')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'OK: {len(pages)} HTML pages, {checked} local references, {len(index["docs"])} search entries.')
