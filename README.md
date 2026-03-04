# hackathon
# Analytics Dashboard

A real-time, interactive analytics dashboard transforming business data into actionable insights. Track revenue, company activity, certificates, and churn at a glance. Drill down with filters, clickable cards, and tables to enable faster, smarter decisions.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Setup & Run](#setup--run)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Interactive Dashboard:** Key metrics like Total Revenue, Active Companies, Total Certificates, Renewed Certificates.
- **Drill-Down Cards:** Clickable cards to explore detailed tables of new and churned companies.
- **Filterable Views:** Filter data by date range (6 months, 1 year, 2 years, 3 years) and country (US, BE, JA, IN).
- **Companies Page:** Sortable and searchable table with detailed company information.
- **Certificates Page:** Pie charts and revenue tables for certificate analysis.
- **Revenue Analytics:** Line chart displaying revenue growth over time.
- **Export & Search:** Export certificate reports and search across table columns.

---

## Tech Stack
- **Frontend:** React.js, Recharts  
- **Backend:** Java (Spring Boot)  
- **Databases:** Cassandra, MariaDB  
- **DevOps:** Docker, Jenkins (for pipeline automation)  

---

## Screenshots
*Include screenshots of your Dashboard, Companies Page, Certificates Page, and Revenue Analytics chart here.*

---

## Setup & Run

### Backend
mvn clean install
mvn spring-boot:run

### Frontend
npm start
