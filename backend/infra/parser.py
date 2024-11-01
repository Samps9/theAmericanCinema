import os
import re
import markdown

class Parser:
    def __init__(self, path):
        self.path = path
        self.roman_num_map = {
            'I': 1,
            'II': 2,
            'III': 3,
            'IV': 4,
            'V': 5,
            'VI': 6,
            'VII': 7,
            'VIII': 8,
            'IX': 9,
            'X': 10,
            'XI': 11,
        }
        self.data = {}

    def run(self):
        if os.path.isfile(self.path):
            basename = os.path.basename(self.path)
            # check the file name to determine if it is a chapter or not:
            roman_num = basename.split('.')[0].strip()
            # if the file name has a roman numeral, then it is a chapter, and this will return true
            if roman_num in list(self.roman_num_map):
                self.data['chapter_roman_num'] = roman_num
                self.data['chapter_num'] = self.roman_num_map[roman_num]
                self.data['directors'] = {}
                self.parse_chapter()
            elif 'Homepage' in basename:
                self.parse_homepage()
            elif 'CHRONOLOGY' in basename:
                title = basename.split('.')[0]
                self.data['title'] = title
                self.data['slug'] = re.sub(' ', '-', title.lower())
                self.parse_chronology()
        elif os.path.isdir(self.path):
            print(self.path + ' is a directory. Please use a filepath.')
        else:
            print(self.path + ' is not a valid path. Please use a valid filepath.')

    def parse_chapter(self):

        with open(self.path, 'r', encoding='utf-8-sig') as file:
            line_number = 0
            director_line_number = 0
            for line in file:
                line_number = line_number + 1
                # skip blank lines
                if not line.strip():
                    continue
                # get the chapter title:
                elif line_number == 1:
                    title = line.split('**')[1]
                    self.data['title'] = title
                    self.data['slug'] = re.sub(' ', '-', title.lower())
                    self.data['nav_position'] = self.data['chapter_num'] + 1
                # get the chapter blurb:
                elif line_number == 2:
                    self.data['blurb'] = line.split('*')[1]
                # get the directors
                elif line.isupper():
                    director_line_number = line_number
                    self.data['directors'][director_line_number] = {
                        'name': re.sub(re.escape('**'), '', line.strip()),
                        'films': '',
                        'about': []
                    }
                # get the films:
                elif line.startswith('**FILMS:**'):
                    self.data['directors'][director_line_number]['films'] = markdown.markdown(line)
                # get the text about the director:
                else:
                    text = markdown.markdown(line.strip())
                    self.data['directors'][director_line_number]['about'].append(text)
        # simplify directors:
        directors = []
        for key in self.data['directors']:
            directors.append(self.data['directors'][key])

        self.data['directors'] = directors

    def parse_homepage(self):
        self.data['body'] = ''
        self.data['nav_position'] = 1
        with open(self.path, 'r', encoding='utf-8-sig') as file:
            line_number = 0
            for line in file:
                line_number = line_number + 1
                # skip blank lines
                if not line.strip():
                    continue
                # get the page title:
                elif line_number == 1:
                    self.data['title'] = line.strip()
                    self.data['slug'] = re.sub(' ', '-', line.strip().lower())
                elif line_number == 2:
                    self.data['subheaders'] = []
                    self.data['subheaders'].append(line.strip())
                elif line_number == 3:
                    self.data['subheaders'].append(''.join(line.strip().split('\\')))
                elif 'Sweltz' in line:
                    self.data['author_signature'] = line.strip()
                elif '*note' in line:
                    self.data['authors_note'] = line.lstrip('\\')
                else:
                    self.data['body'] = self.data['body'] + markdown.markdown(line.strip())

    def parse_chronology(self):
        # pick a high nav_position to keep it at the bottom:
        self.data['nav_position'] = 100
        self.data['body'] = ''
        with open(self.path, 'r', encoding='utf-8-sig') as file:
            year = None
            for line in file:
                # skip blank lines
                if not line.strip():
                    continue
                elif line.startswith('**'):
                    year = line.strip().split('**')[1]
                    self.data[year] = ''
                else:
                    self.data[year] = self.data[year] + markdown.markdown(line.strip())

    def dump(self):
        return self.data



# parser = Parser('your_file_path_:)')
# parser.run()
# print(parser.dump())

