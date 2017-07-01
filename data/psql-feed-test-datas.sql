insert into infos (key, language, value) values ('NAME','no-local','Thomas HOANG-GIA');
insert into infos (key, language, value) values ('AGE','no-local','28');
insert into infos (key, language, value) values ('LOCATION','no-local','Paris, France');
insert into infos (key, language, value) values ('POSITION','en','Software engineer');
insert into infos (key, language, value) values ('EMAIL','no-local','thomas.hoanggia@gmail.com');
insert into infos (key, language, value) values ('LINKEDIN','no-local','http://linkedin/in/thomashoanggia');
insert into infos (key, language, value) values ('VIADEO','no-local','http://us.viadeo.com/fr/profile/thomas.hoang.gia');
insert into infos (key, language, value) values ('GITHUB','no-local','https://github.com/tkhoang');
insert into infos (key, language, value) values ('STACKOVERFLOW','no-local','http://stackoverflow.com/users/2814240/tom-k');
insert into infos (key, language, value) values ('SKYPE','no-local','thoanggia');
insert into infos (key, language, value) values ('SUMMARY','en','I have just successfully completed a VIE program (<a href="http://www.diplomatie.gouv.fr/en/french-foreign-policy/economic-diplomacy-foreign-trade/supporting-french-businesses-7569/volunteering-for-international">Volunteer for International Experience</a>) of 18 months based in NYC for Lacoste and am looking for a new challenge to continue my career. During my VIE, I was involved into the deployment of the Omni-channel strategy for Lacoste in North America as an IT project manager. I worked previously for Capgemini on strategic IS transformation for Orange Telecom and La Poste mobile, as a developer.');
insert into infos (key, language, value) values ('PROFILEPIC', 'no-local','/images/THoanggia.jpg');

insert into experiences
(id,type, start_date,end_date, establishment, location)
values
(1,'education', date('2006-07-01'), date('2006-07-01'), 'Lycée Jean Mermoz','Dakar, Sénégal'),
(2,'education', date('2006-09-01'), date('2008-05-01'), 'IUT Toulouse II','Toulouse, France'),
(3,'education', date('2008-09-01'), date('2011-05-01'), 'Toulouse I/III and Linköping University','Toulouse/Linköping, France'),
(4,'professionnal', date('2008-04-01'), date('2008-07-01'), 'CDM Informatique','Saint-Joseph, Quebec'),
(5,'professionnal', date('2011-04-01'), null, 'XI Ingénierie','Toulouse, France');

insert into experiences_values
(id, language, title, description)
values
(1,'en', 'Highscool graduation', NULL),
(2,'en', 'US', NULL),
(3,'en', 'Master MIAGE','Computer science apply to business process'),
(4,'en', 'Intern',NULL),
(5,'en', 'Intern',
'Java Developer on a DB Migration Project from OS commerce to Magento.
<ul><li>Did the study of both Magento and Os commerce DB model, propose an intermediate DB model. </li>
<li>Developed batch with Talend to migrate e-commerce data to Magento scalable and reusable for </li></ul>
different source of data.');

insert into key_skills
(id)
values
(1),
(2),
(3);

insert into key_skills_values
(id,language,name,description)
values
(1,'en', 'Software Engineering', '<ul><li>Java EE</li><li>Web GWT</li><li>ETL Talend IS</li><li>SQL/Database</li><li>Webservices SOAP et REST</li></ul>'),
(2,'en', 'Project Management', '<ul><li>Internal and external</li><li>coordination</li><li>Planning follow-up</li><li>Integration testing</li></ul>'),
(3,'en', 'Omni-Channel', '<ul><li> E-commerce Operations</li><li> Front DemandWare</li><li> OMS Manhattan DOM</li><li> PSP Cybersource</li><li> Application Store to web</li><li> CRM</li><li> Micros Retail-j</li></ul>');


