# Trackify

**Trackify** is a smart web application that helps users automatically **track, manage, and visualize their financial transactions** — all in one place.  
It seamlessly integrates with **Gmail API** and **Google Pub/Sub** to automatically detect new financial transactions from emails, while also allowing users to manually manage their records and visualize insights through interactive charts.

---

##  Key Features

-  **Automated Tracking:** Integrates with Gmail API and Pub/Sub to automatically detect, parse, and record financial transactions from new emails in real time.  
-  **Manual Management:** Users can manually add, edit, or delete transactions directly from the dashboard.  
-  **Visual Insights:** Interactive charts and graphs (Recharts) display spending trends, income distribution, and balance summaries.  
-  **Real-Time Updates:** New transactions instantly reflect in charts and balance overview.  
-  **Smart Categorization:** Automatically classifies transactions into income or expense.  
-  **Responsive Design:** Optimized for desktop and mobile experiences.  

---

## Installation 

## Prerequisites

- Docker & Docker Compose installed  
- Google Cloud project with Gmail API and Pub/Sub configured (PubSub topic must contain role as Pub/Sub Editor)
- ngrok to make local port public
- `.env` file with required environment variables:

```env
PORT=8000
JWT_SECRET=your_jwt_secret
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
REDIRECT_URI=your_redirect_uri
TOPIC_NAME=your_pubsub_topic
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URI=mongdb_database_uri
```

**Note** : REDIRECT_URI=ngrok_generated_url/api/v1/gmail/callback
**Note** : DATABASE_URI=mongodb://db:27017

## Configure ngrok

```
ngrok http 8000
```

## Clone Repository

```
git clone https://github.com/AvesekShrestha/Trackify
```

## Create .env file

```
touch .env
```

**Note** : Add above mentioned env content inside the .env file

## Run project 

```
docker-compose up
```

## Stop Project

```
docker-compose down
```

