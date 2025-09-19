# **Technical Homework — Full‑Stack Engineer**

Welcome\! This take‑home is designed to assess how you structure a small but real full‑stack app, and how you set up foundations for a codebase that can grow. It should not be hard — the goal is to test your ability to write clear code, follow good practices, and establish solid architecture. Technical questions will be asked in the second part of the interview process.

You should also make tests as part of this assignment. We care about correctness, clarity, and craft.

---

## **1\) Overview**

**Goal:** Implement a small web app based on a provided Figma design. Ship a working **frontend \+ backend \+ single API** with a Postgres database and deploy it.

* **Stack (required):** TypeScript, React (or other framework based on React), Tailwind, Express (or other [Node.js](http://Node.js) framework), PostgreSQL

* **Architecture:** one **backend service** (Express \+ Postgres), one **API layer**, and one **frontend** (React) consuming that API.

* **Deployment:** You are free to deploy however you prefer. For simplicity, **Vercel** (frontend \+ backend) together with **Neon Postgres** (integrated in Vercel) is a convenient option, but any equivalent setup is fine.

* **AI usage:** Strongly encouraged. Document where/how you used AI.

---

## **2\) What to Build**

Recreate the UI from the provided **Figma** file. The design is mostly static but includes:

* One **primary form** on the page

* A **footer newsletter subscription** field

Both forms should be functional with a minimal backend. Treat this as a **skeleton that could evolve into a bigger production system**.

### **Core User Story**

As a visitor, I can:

* View the page from Figma  
* Submit the **primary form** (contact/inquiry)  
* Subscribe to the **newsletter** from the footer

### **Core User Story**

As a visitor, I can view the page from Figma, submit the **primary form** (contact/inquiry) and subscribe to the **newsletter** from the footer. 

### **Required Screens**

1. **Main page** from Figma (static layout) with the **primary form** (mid‑page/section as per design)

### **Interactions**

* The layout follows Figma and is responsive

* **Primary form:**  
  * Client- and server-side validation  
  * Persist to Postgres  
  * Show success/error states

* **Newsletter subscription:**  
  * Single email input with validation  
  * Persist to Postgres  
  * Show success/error states

---

## **3\) Engineering Expectations**

We’re evaluating long‑term maintainability more than visual pixel‑perfection.

**Architecture & Code Quality**

* Clear module boundaries.  
* Type‑safe data models are shared where appropriate (DTOs/types). Avoid `any`.  
* Keep code **DRY**; extract reusable components/hooks.  
* Error handling strategy on client & server.

**Testing**

* Show the kinds of tests you would set up in a real project  
* Exhaustiveness is not required, but coverage of critical paths is expected

---

## **4\) Deliverables**

1. **GitHub repository(ies) (public)** containing:

   * Source code  
   * `README.md` with:  
     * Overview of your architecture  
     * Setup instructions (local \+ env vars)  
     * Migrations/seed steps  
     * Testing instructions  
     * Deployment notes

2. **Deployed app**

3. **Documentation of AI usage**: what AI tools did you use, where AI assisted, what you validated, what you kept/changed

---

## **5\) Evaluation Rubric**

We will evaluate on:

* **Architecture & Code Organization**— clear boundaries, types, layering, naming.  
* **Code Quality** — readability, DRY, error handling, tests.  
* **Correctness** — form \+ newsletter work end‑to‑end.  
* **UI/UX & Accessibility**— fidelity to Figma, responsive, a11y basics.  
* **DevEx & Tooling (10)** — scripts, linting, env mgmt, migrations, seeds.  
* **Security & Performance**— validation, no secrets, reasonable queries.  
* **Documentation** — clear README, setup, assumptions documented  
* **AI Usage** — we expect you to **use AI meaningfully** as part of your workflow. Treat AI as a junior pair-programmer: leverage it for speed, but review carefully.

---

## **6\) Constraints & Tips**

* Keep scope in check; prioritize depth over breadth.  
* Prefer **type‑safety** and compiler‑enforced contracts.  
* Seed realistic data.  
* If something is ambiguous, document your assumptions in the README.  
* **AI is strongly encouraged** — treat it as a junior pair-programmer whose code you review carefully

---

## **7\) Submission**

Submit:

* GitHub repo link(s)  
* Live app URL  
* Documentation of how you used AI

