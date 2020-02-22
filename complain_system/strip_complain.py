import sys
comp = str(sys.argv[1])
import spacy
from collections import Counter
nlp = spacy.load('en_core_web_sm')
stop = spacy.lang.en.stop_words.STOP_WORDS
complain_with_stop = nlp(comp)
complain = ([token for token in complain_with_stop if not token.is_stop])
complain = ([token.text for token in complain if not token.is_punct])
high_priority = ['double','multiple','wrong','Double','Wrong','Multiple']
low_priority = ['bad','experience','Bad','Experience']
for word in complain:
	if word in list(high_priority):
		print("1")
		break;
	elif word in list(low_priority):
		print("2")
		break