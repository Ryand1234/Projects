import sys
length = len(sys.argv)
name = str(sys.argv[1])
mobile = (sys.argv[2])
email = str(sys.argv[3])
contry = str(sys.argv[4])
password = str(sys.argv[5])
import MySQLdb

db = MySQLdb.connect(host="localhost",   
                     user="root",        
                     passwd="riyan1234",  
                     db="data")        
cur = db.cursor()
query = "INSERT INTO form (Name,Number,Email,Address,Password) values (%s,%s,%s,%s,%s)"
arg = (name,mobile,email,contry,password)
cur.execute(query,arg)
db.commit()
db.close()