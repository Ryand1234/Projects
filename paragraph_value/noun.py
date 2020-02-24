import spacy
import sys
from collections import Counter
para = sys.argv[1]
nu = sys.argv[2]
nlp = spacy.load('en_core_web_sm')
para_init = nlp(para)
noun = [word for word in para_init if word.pos_ == 'NOUN']
if nu == "2":
	if len(noun) > 1:
		print(noun[0],noun[1])
	else:
		pass
elif len(noun) > 1:
	print(noun[0])
else:
	pass