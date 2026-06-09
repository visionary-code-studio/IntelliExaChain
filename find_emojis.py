import re
import sys
import glob

try:
    sys.stdout.reconfigure(encoding='utf-8')
except AttributeError:
    pass

emoji_pattern = re.compile(r'[\U00010000-\U0010ffff\u2600-\u27bf]')

def find_emojis(filename, out_f):
    out_f.write(f"=== Scanning {filename} ===\n")
    count = 0
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            for idx, line in enumerate(f, 1):
                matches = emoji_pattern.findall(line)
                if matches:
                    out_f.write(f"Line {idx:4d}: {' '.join(matches)} | {line.strip()[:120]}\n")
                    count += len(matches)
    except Exception as e:
        out_f.write(f"Error reading {filename}: {e}\n")
    out_f.write(f"Total emojis found in {filename}: {count}\n\n")

if __name__ == "__main__":
    out_path = r"C:\Users\user\.gemini\antigravity-ide\brain\75239202-c29c-41f9-9dde-294723609549\scratch\emoji_report_all.txt"
    with open(out_path, "w", encoding="utf-8") as out_f:
        for filepath in glob.glob(r"c:\Users\user\OneDrive\Desktop\IntelliExaChain\*.html"):
            find_emojis(filepath, out_f)
    print(f"Done! Report written to {out_path}")
