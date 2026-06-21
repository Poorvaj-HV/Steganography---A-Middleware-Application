# STEGOHIDE — SECTION-WISE READ-ALONG SCRIPT
Total time: 5:00 — Read each section at the indicated pace.

---

## SECTION 1 — INTRODUCTION (0:00 - 0:45)

"Hi, I'm Poorvaj. I built StegoHide — a full-stack MERN application that hides secret messages inside ordinary images using an LSB steganography algorithm. StegoHide conceals messages so well that no one can tell a message exists, while allowing reliable extraction by the intended recipient. I designed and implemented the full stack, wrote the custom LSB logic, and deployed the app to production. Right now I'll show the homepage and a quick demo link."

---

## SECTION 2 — PROBLEM & SOLUTION (0:45 - 1:30)

"Traditional encryption hides the content but not the existence of a message — an observer still knows a message is being sent. That creates a risk: attackers can hide malware or trojans inside images shared on messaging platforms. Users may download these images and unknowingly trigger malicious code. Current messaging apps offer no defense specifically for this vector. My solution, StegoHide, hides messages invisibly in image pixels using LSB. The image looks identical to the human eye but contains a hidden payload. The long-term plan is to add a machine-learning layer that checks images for unsafe hidden payloads before any extraction happens."

---

## SECTION 3 — HOW LSB ALGORITHM WORKS (1:30 - 2:00)

"LSB stands for Least Significant Bit. Each pixel has three color channels — red, green, and blue — each represented by 8 bits. I embed message bits into the least significant bit of those channels. For example, if a red channel is 11010101 and the message bit is 0, we change it to 11010100; this single-bit change is imperceptible. Capacity is roughly (width × height × 3) / 8 characters. For a 300 by 300 image this is about 33,750 characters. The method is fast, simple to implement, and recovers the exact message on decoding."

---

## SECTION 4 — TECH STACK (2:00 - 2:45)

"Front-end: HTML5, Bootstrap, Tailwind for the homepage, JavaScript, and EJS templates for server-side rendering. Back-end: Node.js and Express, with a custom LSB module, Multer for file uploads, Sharp for image processing, Nodemailer for email OTPs, and Bcrypt for hashing passwords. Database and cloud: MongoDB Atlas with Mongoose for schema modeling, Cloudinary for image storage and CDN delivery, and Connect-Mongo for session persistence. Deployment: the app is hosted on Render and configured to run in production."

---

## SECTION 5 — FEATURES BUILT (2:45 - 3:30)

"Key features include: Encode — the user uploads an image, types a secret message, and the backend encodes the message into the image and returns a downloadable stego image. Decode — upload a stego image and the backend reconstructs and displays the hidden text with 100% accuracy in tests. Authentication — user registration with 6-digit email OTP verification, secure password storage with bcrypt, and environment-variable driven secrets. Cloud integration — after encoding, images are uploaded to Cloudinary and stored as metadata in MongoDB. Admin dashboard — view encoded images, track basic usage statistics, and manage stored data."

---

## SECTION 6 — ML-BASED SECURITY LAYER (3:30 - 4:15)

"The identified threat is image-based malware distribution through messaging apps. My planned ML layer analyzes an uploaded image before decoding for indicators of malicious embedded payloads, suspicious code-like patterns, or anomaly signatures. The flow: image received → ML scans for threats → if the image is SAFE, extract and display the message; if UNSAFE, block extraction and alert the user. The long-term goal is middleware that can be integrated with messaging platforms to vet images at scale."

---

## SECTION 7 — REAL-WORLD USE CASES (4:15 - 4:45)

"Use cases include: Secure messaging — journalists or whistleblowers hiding sensitive text; Digital watermarking — photographers embedding copyright or ownership metadata invisibly; Forensics — recovering hidden evidence or verifying image authenticity; Authentication — embedding verification tokens or metadata into images; Healthcare — hiding patient metadata in medical images to enable secure HIPAA-compliant transfers."

---

## SECTION 8 — CLOSING & ROADMAP (4:45 - 5:00)

"Roadmap items: add AES-256 encryption layered on top of LSB for dual-layer security; integrate the ML-based malware detection middleware; modernize the frontend by migrating from EJS to React/Next.js and support PWA features; expand to video and audio steganography in future phases. In summary: StegoHide is a production-ready foundation that solves a real security problem and has a clear path to enterprise-grade protection. I built the entire stack and can walk through the code or demo the encode/decode flow now."

---

## SHORT FAQ (if asked)

- **"How do you reduce detectability by steganalysis?"** — "Planned measures include encryption before embedding, randomized embedding patterns, and ML-based checks to avoid suspicious payload structures."

- **"Which formats work best?"** — "PNG (lossless) is ideal; JPG works but is susceptible to compression artifacts — use higher-quality settings."

- **"What are the limits on payload size?"** — "Use the capacity formula to compute limits; warn users when messages are too large for the chosen image."

---

## DEMO CHECKLIST (quick)

"Have a sample image ready (300×300 or 800×600). Prepare a 1–2 sentence secret message. Steps: Upload → Enter message → Encode → Download. Then Upload stego image → Decode → Show recovered text. Optionally open Cloudinary or admin view to show metadata."

---

## FIN

"Thank you — I can now demo the app or answer technical questions about the algorithm, deployment, or the planned ML middleware."

---

**Created by:** Poorvaj-HV  
**Date:** June 2026  
**Use this file as your presentation script — read each section aloud at the timed intervals.**
