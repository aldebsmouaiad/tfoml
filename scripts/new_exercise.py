"""Create one exercise from the shared template; never replace existing content."""
import argparse
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--sheet', type=int, required=True)
parser.add_argument('--task', type=int, required=True)
parser.add_argument('--title', required=True)
args = parser.parse_args()
if args.sheet < 1 or args.task < 1 or not args.title.strip():
    parser.error('Blatt, Aufgabennummer und Titel müssen gültig sein.')
root = Path(__file__).resolve().parents[1]
destination = root / 'docs' / f'blatt-{args.sheet:02d}' / f'aufgabe-{args.task}.md'
template = (root / 'templates/aufgabe.md').read_text(encoding='utf-8')
content = template.replace('{{SHEET}}', f'{args.sheet:02d}').replace('{{TASK}}', str(args.task)).replace('{{TITLE}}', args.title.strip())
destination.parent.mkdir(parents=True, exist_ok=True)
with destination.open('x', encoding='utf-8') as stream:
    stream.write(content)
print(f'Erstellt: {destination.relative_to(root)}')
print('In mkdocs.yml als Navigationsziel ergänzen:', destination.relative_to(root / 'docs'))
