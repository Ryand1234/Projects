from subprocess import Popen,call,check_output
from flask import Flask,request,render_template
from os import fork,wait,kill
import os
import signal
app = Flask(__name__)
@app.route('/home/')
def home():
	return render_template("home.html")
@app.route('/home/',methods  = ['POST','GET'])
def para():
	if request.method == 'POST':
		para = str(request.form['para'])
		child = fork()
		message = ""
		if child == 0:
			try:
				message = check_output(['python3','strip_para.py',para])
				if message == '':
					os._exit(0)
				coded_propn = check_output(['python3','propn.py',message])
				propn = coded_propn.decode('utf-8')
				if propn =='':
					coded_noun = check_output(['python3','noun.py',message,"2"])
				else:
					coded_noun = check_output(['python3','noun.py',message,"1"])
				noun = coded_noun.decode('utf-8')
			except :
				os._exit(0)
			if noun == "" and propn == '':
				return render_template("no_info.html")
			else:
				return render_template("talk.html",noun=noun,propn=propn)
		else:
			wait()
			return render_template("talking_error.html")
if __name__ == "__main__":
	app.run(debug=True,host='localhost')