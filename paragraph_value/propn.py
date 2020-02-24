import spacy
import sys
from collections import Counter
para = sys.argv[1]
nlp = spacy.load('en_core_web_sm')
para_init = nlp(para)
propn = [word for word in para_init if word.pos_ == 'PROPN']
if len(propn) != 0:
	print(propn[0])