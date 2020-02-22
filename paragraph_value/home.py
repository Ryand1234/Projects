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
		para = request.form['para']
		child = fork()
		message = ""
		if child == 0:
			try:
				coded_message = check_output(['sudo','python3','strip_para.py',para])
				message = coded_message.decode('utf-8')
			except :
				os._exit(0)
			if message == '':
				os._exit(0)
			return render_template("talk.html",para=para,message=message)
		else:
			wait()
			return render_template("talking_error.html")
if __name__ == "__main__":
	app.run(debug=True,host='localhost')