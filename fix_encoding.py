import os

replacements = {
    'â€”': '—',
    'â€™': "'",
    'â€œ': '"',
    'â€': '"',
    'â€“': '–',
    'COâ‚‚': 'CO₂',
    'â€\u009d': '"',
    'â€\u009c': '"',
    'â€\u0099': "'",
    'â€\u0093': '–',
    'â€\u0094': '—',
}

files_to_fix = [
    r'd:\HTML templates\ethical and sustainable\about.html',
    r'd:\HTML templates\ethical and sustainable\services.html'
]

for file_path in files_to_fix:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        for search, replace in replacements.items():
            content = content.replace(search, replace)
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed encoding issues in {file_path}")
        else:
            print(f"No encoding issues found in {file_path}")
    else:
        print(f"File not found: {file_path}")
