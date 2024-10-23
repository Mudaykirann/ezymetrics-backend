# EzyMetrics Backend

This is the backend for **EzyMetrics**, a reporting and data integration service that fetches lead and campaign data from dummy CRM and marketing platforms, processes it, and provides reporting functionalities including PDF generation and email notifications.

## Features
- Fetch and store dummy lead and campaign data.
- Calculate metrics for each campaign including total leads, converted leads, and conversion rate.
- Generate PDF reports for campaign performance.
- Send email notifications for campaigns with a 100% conversion rate.
- Expose RESTful API endpoints to interact with lead, campaign, and report data.

## Tech Stack
- **Backend Framework**: Node.js, Express
- **Database**: MongoDB (with Mongoose)
- **PDF Generation**: PDFKit
- **Email Notifications**: Nodemailer
- **View Engine**: EJS

## Installation

1. Clone the repository:

    ```bash
    <a href="https://github.com/Mudaykirann/ezymetrics-backend">https://github.com/Mudaykirann/ezymetrics-backend</a>
    ```

3. Navigate into the project directory:

    ```bash
    cd ezymetrics-backend
    ```

4. Install dependencies:

    ```bash
    npm install
    ```

5. Set up your environment variables. Create a `.env` file in the root directory and add your MongoDB connection string and email credentials:

    ```plaintext
    PORT=<Your Port Adress>
    MONGO_URI=<Your MongoDB URI>
    EMAIL_USER=<Your Gmail Address>
    EMAIL_PASS=<Your Gmail Password>
    ```

## API Endpoints

### 1. Add Dummy Lead Data
- **Method**: `POST`
- **Endpoint**: `/ezy/leads`
- **Description**: Populates the database with dummy lead data.
- **Response**: Status 201 on success, status 500 on failure.

### 2. Fetch All Leads
- **Method**: `GET`
- **Endpoint**: `/ezy/leads`
- **Description**: Retrieves all leads from the database.
- **Response**: JSON array of lead data.

### 3. Add Dummy Campaign Data
- **Method**: `POST`
- **Endpoint**: `/ezy/campaigns`
- **Description**: Populates the database with dummy campaign data.
- **Response**: Status 201 on success, status 500 on failure.

### 4. Fetch All Campaigns
- **Method**: `GET`
- **Endpoint**: `/ezy/campaigns`
- **Description**: Retrieves all campaigns from the database.
- **Response**: JSON array of campaign data.

### 5. Generate Reports
- **Method**: `POST`
- **Endpoint**: `/ezy/reports`
- **Description**: Calculates metrics (total leads, converted leads, and conversion rate) for each campaign and stores them as reports in the database.
- **Response**: Status 201 on success, status 500 on failure.

### 6. Fetch All Reports
- **Method**: `GET`
- **Endpoint**: `/ezy/reports`
- **Description**: Retrieves all reports from the database. Automatically sends email notifications for any campaign with a 100% conversion rate.
- **Response**: JSON array of report data.

### 7. Download Reports as PDF
- **Method**: `GET`
- **Endpoint**: `/ezy/reports/pdf`
- **Description**: Generates and downloads a PDF report of all campaign metrics.
- **Response**: PDF file.

## How to Use

1. **Add Dummy Data**:
    - First, add the dummy leads and campaigns in the JSON files in data folder
    - Second, initialize the  `POST /ezy/leads` and `POST /ezy/campaigns` endpoints.

3. **Generate Reports**:
    - Use the `POST /ezy/reports` endpoint to calculate campaign metrics and store them in the database.

4. **Download PDF Reports**:
    - Use the `GET /ezy/reports/pdf` endpoint to download the campaign report as a PDF.

5. **Email Notifications**:
    - When a campaign achieves a 100% conversion rate, an email notification will automatically be sent to the configured email address.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14+)
- [MongoDB](https://www.mongodb.com/) (or a MongoDB Atlas instance)
- A Gmail account for email notifications (Nodemailer uses Gmail SMTP for sending emails)

## Run the Application

1. Start the server:

    ```bash
    npm start
    ```

2. The API will be running at:

    ```
    http://localhost:3100
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

