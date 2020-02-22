import sys
from subprocess import Popen,call
import webbrowser
length = len(sys.argv)
email = str(sys.argv[1])
password = str(sys.argv[2])
import MySQLdb
db = MySQLdb.connect(host="localhost",   
                     user="root",        
                     passwd="riyan1234",  
                     db="data")        
cur = db.cursor()
query = "SELECT COUNT(*) FROM form WHERE Email = %s and Password = %s"
arg = (email,password)
cur.execute(query,arg)
exist = cur.fetchone()[0]
exist = int(exist)
if exist == 1:
	print("1")
	query = "SELECT * FROM form WHERE Email = %s and Password = %s"
	arg = (email,password)
	cur.execute(query,arg)
	val = cur.fetchone()[0]
	print(val)
else:
	print("0")
db.commit()
'''for row in cur.fetchall():
    for i in range(0,4):
    	print (str(row[i])+ " ")
'''
db.close()