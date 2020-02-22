import urllib
from urllib import request ,error
from urllib.request import Request,urlopen
import webbrowser
from flask import Flask , request,render_template
from subprocess import call,Popen,check_call
from selenium import webdriver
from os import fork
app = Flask(__name__)

@app.route('/')
def index():
	return render_template('home.html')
@app.route('/',methods=['POST'])
def input():
	url = request.form['Link']
	req = Request(url)
	try:
		req1=urlopen(req)
	except (error,e):
		if hasattr(e,'reason'):
			return render_template('error.html',error=e.reason);
		elif hasattr(e,'code'):
			return render_template("error1.html",error=e.code)
	else:
		f = fork()
		if f == 0:
			return render_template('downloading_video.html')
		else:
			call(["bash download.sh "+url ],shell=True)
			return render_template('download_video.html');
		
	
if __name__=="__main__":
	app.run(host='localhost')