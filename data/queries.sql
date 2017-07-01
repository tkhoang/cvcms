SELECT 
type, 
to_char(start_date, 'MM') as start_month, 
to_char(start_date, 'MM') as start_year, 
to_char(end_date, 'MM') as end_month, 
to_char(end_date, 'MM') as end_year, 
establishment, 
location, 
title, 
description 
FROM 
experiences  
INNER JOIN experiences_values on experiences.id = experiences_values.id 
WHERE 
language = 'en' 
order by start_date desc;