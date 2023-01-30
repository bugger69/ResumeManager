# Server

Database design:


Users: email, name, password, date_of_birth, address (permanent and current), designation (student, tpr, prof, company-representative), Branch, Year, Course(btech, mtech or phd)

Batches/Class: branchName, Year, students[array of student ids]

Company: companyName, field, ...need more here

Intern: companyID ( work hours, pay and other stuff. Still figuring what to put here.) 