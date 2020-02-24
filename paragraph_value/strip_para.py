import spacy
import sys
from collections import Counter
para = sys.argv[1]
nlp = spacy.load('en_core_web_sm')
stop = spacy.lang.en.stop_words.STOP_WORDS
para_init = nlp(para)
para_init = [words for words in para_init if not words.is_stop]
para_init = [words for words in para_init if not words.is_punct]
para_init = [words.lemma_ for words in para_init]
word_freq = Counter(para_init)
unique = ' '.join(words for (words,freq) in word_freq.items() if freq > 3)
print(unique)