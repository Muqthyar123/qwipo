a) Problem Statement Reference

Problem Statement Chosen:
Building a web-based B2B marketplace for suppliers and retailers, focusing on inventory management, order tracking, and analytics.

Reason to Choose the Problem Statement:

Existing B2B shopping platforms lack seamless inventory control and product discovery.

Small and mid-level suppliers face challenges in managing stock and reaching retailers.

Retailers need an intuitive system for browsing, ordering, and tracking deliveries.

b) Solution Overview

Proposed Approach (2–3 lines):
Develop a React + TypeScript single-page web application that enables suppliers to manage products and inventory while customers can browse, order, and track deliveries. Future integration with Supabase backend and AI assistant is included for intelligent support.

Key Features / Modules:

Supplier Dashboard: Add/Edit Products, Inventory Management, View Analytics

Customer Dashboard: Product Search & Filters, Cart & Checkout, Order Tracking

AI Assistant: Provides quick product and system-related help

Account Management: Login, Registration, Profile, Settings

Support & Guides: Informational pages for problem context and technical guidance

c) System Architecture

Architecture Diagram / Workflow:

User → Landing Page → Role Selection

Supplier → Dashboard (Products, Inventory, Analytics)

Customer → Dashboard (Product List → Cart → Checkout → Orders → Track Order)

AI Assistant & Support Guide accessible across system

Future backend integration (Supabase/API) planned for persistence

Data Flow Explanation:

Front-end state managed via React hooks (useState).

Products, Cart, Orders maintained in memory (mock data).

Navigation controlled by App.tsx using currentPage state.

Future extension: API calls to backend (Supabase) for auth, DB operations, and analytics.

d) Technology Stack

Backend: Planned – Supabase or custom Node.js/Express APIs
Frontend: React (v18+), TypeScript, Tailwind CSS, Vite
Databases: Planned – Supabase Postgres (future integration)
ML/AI Frameworks: Basic AI Assistant (rule-based, expandable to NLP/ML)
APIs / Libraries: Lucide-React (icons), Supabase JS Client, Tailwind utilities

e) Algorithms & Models

Algorithm(s) Chosen:

Current AI Assistant: Rule-based response mapping

Planned: Product recommendation using ML models (Collaborative Filtering / Content-based filtering)

Reason for Choice:

Rule-based chatbot for simplicity during prototype stage

ML recommendations will improve personalization and supplier-customer engagement

Model Training & Testing Approach:

Future plan: Train models on product browsing & purchase datasets

Testing via A/B comparison of recommendations vs. baseline search

f) Data Handling

Data Sources Used:

Mock product datasets hardcoded into frontend

Placeholder analytics data for suppliers

Preprocessing Methods:

Minimal preprocessing in current prototype (manual mock data input)

Future: Cleaned datasets from Supabase DB or external APIs

Storage / Pipeline Setup:

Present: State variables within React components

Future: Supabase pipelines for structured data ingestion, storage, and retrieval

g) Implementation Plan

Initial Setup & Environment:

Vite project scaffolded with React + TS + Tailwind

ESLint + Prettier for code quality

Core Module Development:

Supplier & Customer dashboards

Product management (add/edit) and ordering workflows

AI Assistant component

Integration & Testing:

Component-level testing via React Testing Library (planned)

Manual workflow validation in dev server

Final Deployment-ready Build:

Vite build (npm run build) → deploy to Netlify / Vercel

h) Performance & Validation

Evaluation Metrics:

Page load speed (Lighthouse score)

Component responsiveness (UI/UX testing)

Mock transaction success (Cart → Checkout → Orders)

Testing Strategy:

Manual user flow testing

Planned: Unit testing & integration tests on React components

Post-backend: End-to-end API validation

i) Deployment & Scalability

Deployment Plan:

Deploy static frontend via Netlify or Vercel

Link with Supabase backend for authentication, database, and storage

Scalability Considerations:

Component-based modular structure allows adding new features without breaking flow

Supabase/Postgres backend supports scaling with real-time data sync

ML models can be containerized and deployed separately via cloud APIs
