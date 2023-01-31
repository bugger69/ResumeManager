# Server

Database design:


Users: email, name, password, date_of_birth, address (permanent and current), designation (student, tpr, prof, company-representative), Branch, Year, Course(btech, mtech or phd), resume(s)

resume: fileId, fileName

Batches/Class: branchName, Year, students[array of student ids]

Company: companyName, field, location, size, description

Intern: companyID, description, start_date, end_date, Requirements, stipend, compensation(optional), application_deadline, supervision_and_mentorship, evaluation_and_feedback, hiring_process_info, eligiblity_for_fulltime_employment