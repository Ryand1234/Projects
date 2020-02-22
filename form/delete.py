import sys
length = len(sys.argv)
email = str(sys.argv[1])
password = str(sys.argv[2])
import MySQLdb

db = MySQLdb.connect(host="localhost",   
                     user="root",        
                     passwd="riyan1234",  
                     db="data")        
cur = db.cursor()
query = "DELETE FROM form WHERE Email = %s and Password = %s"
arg = (email,password)
cur.execute(query,arg)
db.commit()
db.close()