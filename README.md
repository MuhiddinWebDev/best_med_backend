Readme ma'lumotlari

#migratsiya uchun
npm install -g db-migrate
npm install -g db-migrate-mysql

#sequelize-auto
npm install -g sequelize
npm install -g mysql2

#bazadan model hosil qilish uchun
sequelize-auto -o "./src/models" -d edu_app -h localhost -u root -p 3306 -e mysql --cm p"# maxsus_clinica" 
