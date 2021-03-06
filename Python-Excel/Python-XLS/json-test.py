import openpyxl
from collections import OrderedDict
import json

#Open the workbook and select the first worsheet
wb = xlrd.open_workbook('O2KL_U500_AND_O500_TELEMARKETING_ToFrank.xlsx')
sh = wb.sheet_by_index(0)

#List to hold dictionaries
cat_list = []

#Iterate through each row in worksheet and fetch values into dict
for rownum in range(1,sh.nrows):
  cats = OrderedDict()
  row_values = sh.row_values(rownum)

  cats['Ultimage DUNS Number'] = row_values[0]
  cats['SIC Code ID'] = row_values[1]
  cats['D & B Total Employees'] = row_values[2]
  cats['Buyer Group'] = row_values[3]
  cats['Company'] = row_values[4]
  cats['First Name'] = row_values[5]
  cats['Last Name'] = row_values[6]
  cats['Title'] = row_values[7]
  cats['Role Bucket'] = row_values[8]
  cats['Address'] = row_values[9]
  cats['City'] = row_values[10]
  cats['State'] = row_values[11]
  cats['ZIP Code'] = row_values[12]
  cats['Email'] = row_values[13]
  cats['Phone'] = row_values[14]

  cat_list.append(cats)

  #Serialize the list of dicts to JSON
  j = json.dumps("id" + cat_list)
  # print(rownum)


  #Write to file
  with open('data.json', 'w') as f:
    f.write(j)

    