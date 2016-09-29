#!/bin/bash
mysql --local-infile=1 -D Scheduler -u root -ppassword -e "LOAD DATA LOCAL INFILE '/var/www/html/Scheduler/Data/fall.txt' INTO TABLE courses FIELDS TERMINATED BY ';' LINES TERMINATED BY '\n' (term, subterm, college, department, subject, course, section, crn, status_code, title, n1, n2, capacity, enrolled, remaining, start_date, end_date, start_time, end_time, monday, tuesday, wednesday, thursday, friday, saturday, sunday, building, room, instructor, n3, n4)"

mysql --local-infile=1 -D Scheduler -u root -ppassword -e "DELETE FROM courses WHERE search_date < UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 730 DAY))""
