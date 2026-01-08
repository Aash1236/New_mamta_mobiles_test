# 📱 New Mamta Mobiles - Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

## 🚀 Project Overview
This repository contains a robust **End-to-End (E2E) Test Automation Framework** built for the "New Mamta Mobiles" e-commerce application. It is designed to validate critical user journeys including Authentication, Product Search, Cart Management, and User Profile logic.

The framework leverages **Playwright** with **TypeScript** for high-speed execution and reliability, following the **Page Object Model (POM)** design pattern.

## 🛠 Tech Stack
* **Core Tool:** Playwright
* **Language:** TypeScript
* **Pattern:** Page Object Model (POM)
* **Reporting:** Monocart Reporter
* **CI/CD:** GitHub Actions
* **Package Manager:** NPM

## ✨ Key Features
* **Page Object Model (POM):** Structured codebase for easy maintenance and scalability.
* **Role-Based Access Control (RBAC):** Verified distinct flows for Admin vs. Normal users.
* **Resilient UI Interactions:** Handles complex Side Drawers, Overlays, and dynamic SVGs.
* **Data-Driven Testing:** Separation of test logic and test data (e.g., Search Scenarios).
* **CI/CD Integration:** Automated regression testing via GitHub Actions on every push.
* **Visual Reporting:** Rich HTML dashboards with Monocart for detailed failure analysis.

## 📂 Project Structure
```text
├── .github/workflows   # CI/CD Pipeline configurations
├── tests/
│   ├── data/           # Static test data (JSON/TS objects)
│   ├── pages/          # Page Object Classes (Locators & Methods)
│   ├── cart.spec.ts    # Cart & Checkout Logic
│   ├── profile.spec.ts # User Profile & RBAC Logic
│   ├── search.spec.ts  # Search & Filter Logic
│   └── ...
├── playwright.config.ts # Global configuration (Timeouts, Browsers)
├── .env                 # Environment variables (Secrets)
└── package.json         # Dependencies
```

## ⚙️ Setup & Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Mamta_Mobiles_Automation.git
cd Mamta_Mobiles_Automation
```

Install Dependencies

```bash
npm install
```

Install Playwright Browsers

```bash
npx playwright install
```

Configure Environment Variables  
Create a `.env` file in the root directory and add your credentials:

```ini
BASE_URL=https://newmamtamobiles-eight.vercel.app/
LOGIN_USER=admin@example.com
LOGIN_PASS=secret123
NORMAL_USER=user@example.com
NORMAL_PASS=user123
NORMAL_NAME=Your Full Name
```

## 🏃‍♂️ Running Tests

Run all tests (Headless Mode)

```bash
npx playwright test
```

Run tests in Headed Mode (Visible Browser)

```bash
npx playwright test --headed
```

Run a specific test file

```bash
npx playwright test tests/cart.spec.ts
```

View HTML Report

```bash
npx monocart show-report test-results/report.html
```

## 🔄 CI/CD Pipeline
This project is integrated with GitHub Actions.

Trigger: Pushes to main branch.

Jobs: Installs dependencies, runs all tests, and uploads the Monocart HTML report as a build artifact.

## 📝 Author
Ashutosh Fase - QA Automation Engineer
