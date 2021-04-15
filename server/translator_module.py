import sys
from translate import Translator
a=(sys.argv[1])
translator = Translator(to_lang="dutch")  # translate eng - french
translation_hindi = translator.translate(a)
print(translation_hindi)
sys.stdout.flush()
