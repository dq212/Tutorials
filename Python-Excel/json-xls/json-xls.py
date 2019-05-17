import simplejson as json
import xlwt

u = dict
s = []
headers = ()
with open('./match-game-7696b-export.json') as json_data:
  d = json.load(json_data)

u = d['users']

myList = list(u.values())
# print(myList)
wb = xlwt.Workbook()
ws = wb.add_sheet('Names And Emails - MetLife')

headers = () 
data = []
for i in range(len(myList)):
  # headers = (myList[i]['email'], myList[i]['firstName'], myList[i]['lastName'], myList[i]['serial'])
  # h = myList[i]['email']
  ws.write(i, 0, myList[i]['email'])
  ws.write(i, 1, myList[i]['firstName'])
  ws.write(i, 2, myList[i]['lastName'])
  ws.write(i, 3, myList[i]['serial'])

# with open('people.xls', 'wb') as f:
#   f.write(headers.export('xls'))
wb.save('export-2-19-2019.xls')