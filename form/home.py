from os import fork,system
from sys import executable
from flask import Flask,render_template,request
from subprocess import call,Popen,PIPE,check_output
app = Flask(__name__)
@app.route('/home/')
def index():
	return render_template("home.html")
@app.route('/home/',methods=['POST','GET'])
def login():
	if request.method == 'POST':
		if len(request.form) >3:
			name = request.form['name']
			number = request.form['number']
			email = request.form['email']
			contry = request.form['contry']
			password = request.form['password']
			frk = fork()
			if frk == 0:
				Popen(['sudo','python3', 'insert.py',name,number, email,contry,password])
				return render_template("loadingins.html")
			else:
				return render_template("insert.html")
		else:
			email = request.form['email']
			password = request.form['password']
			k = check_output(['sudo','python3','/home/riyan/github/Bash_script/Project/form/log.py',email,password])
			k1 = k.decode('utf-8')
			k2 = int(k1[0])
			k3=''
			for i in range(2,len(k1)):
				k3 = k3+k1[i]
			if k2 == 1:
				return render_template('loging.html',value = k3)
			else:
				return render_template('login.html')
@app.route('/delete/')
def dele():
	return render_template('delete.html')
@app.route('/delete/',methods=['POST','GET'])
def delet():
	if request.method == 'POST':
		email = request.form['email']
		passwd = request.form['password']
		frk = fork()
		if frk == 0:
			Popen(['sudo','python3', 'delete.py',email,passwd])
			return render_template("loadingdel.html")
		else:
			return render_template("delete.html")
if __name__=="__main__":
	app.run(host="localhost",debug=True)
