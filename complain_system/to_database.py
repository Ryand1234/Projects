import sys
import MySQLdb
'''name,mob,email,k,bank,complain'''
name = str(sys.argv[1])
mob = sys.argv[2]
email = str(sys.argv[3])
priority = sys.argv[4]
bank = str(sys.argv[5])
complain = str(sys.argv[6])
db = MySQLdb.connect(
					user='root',
					host='localhost',
					password='riyan123',
					db=bank)
cur = db.cursor()
query1 = "INSERT INTO "+bank+" (Priority,Name,Email,Mobile,Complain) values (%s,%s,%s,%s,%s)"
arg = (priority,name,email,mob,complain)
cur.execute(query1,arg)
db.commit()
db.close()