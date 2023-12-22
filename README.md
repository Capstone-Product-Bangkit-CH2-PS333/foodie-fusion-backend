# foodie-fusion-backend
<br>

## Table of Contents
- [Program Description](#desc)
- [Infrastructure Description](#req)

## Program Description<a name = "desc"></a>
This is a backend service for our foodie-fusion application, built on express.js framwork. Other libraries used are the following:
- Sequelize : Object Relational Mapping
- JWT: JSON Web Token Authentication
- Axios: API Client for communication with our ML Prediction Service
<br>

## Infrastructure Description<a name="req"></a>
This backend service is deployed in Google Cloud Run by utilizing a CI/CD Pipeline that automatically builds a docker image and configures deployment in Cloud Run. We also utilize other services such as Cloud SQL for our main database support and Cloud Storage Bucket for our main asset management platform. You can see the details of our whole applicaiton including the way it communicates with our ML Service. 
![Capstone-Architecture drawio (1)](https://github.com/Capstone-Product-Bangkit-CH2-PS333/foodie-fusion-backend/assets/69229629/70feb8b1-1cde-401f-96d4-002107b34439)
