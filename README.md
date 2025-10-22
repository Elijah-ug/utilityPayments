# 🎓 Tuition Payment Platform

## 🌍 Impact on the African Community

This platform empowers students, parents, and institutions across Africa by digitizing and automating tuition payments. It removes the traditional barriers of distance, banking limits, and manual record-keeping promoting financial inclusion, transparency, and access to education for everyone.

## 💡 Problems Solved

- Unreliable Bank Systems: Traditional banking services have limited working hours and slow processing times.
- Cumbersome Payment Process: Paying tuition often requires standing in long queues or having a formal bank account.
- Lack of Transparency: Schools and parents struggle to track payments in real time.
- Missing Records: Lost paper receipts and inconsistent manual records cause frequent disputes.

## ⚙️ How the Platform Works

- Registration: Schools are registered by the platform admin to avoid froud on the platform. We require a school name and school wallet address

- Payment: Tuition is paid directly through the platform using stablecoins (like USDC or LINK), ensuring instant and borderless transactions. Though, for now we're using AfroBlocks (AFB) ERC20 token
  (Payers head to the client dashboard, there's Deposit, withdraw and pay tution)

Receipt Generation: After payment, users can download an instant PDF receipt for proof of payment.

Automation: At the start and end of each term, the platform automatically resets the academic period. the school just enters starting and end date, then when the term begins, payments are allowed, and the term automatically closes when time reaches

Transparency: Every transaction is recorded on-chain, allowing schools and payers to verify all payments anytime. On the platform, there's the Transactions Done page with tx hash which linkes to basescan sepolia. all the payments history from the platform are on this page

## 🚀 Vision & Future Goals

- Our vision is to build a fully automated, transparent, and borderless tution payment ecosystem for Africa and beyond.

- Auto Tuition Payments: Support fully automated tuition settlements processed at the start and end of education period

- Expansion to Other Services: Integrate utility payments (electricity, water, internet, TV) for families to manage all bills in one place.

- Institutional Integration: Provide schools with real-time dashboards to track payments and manage student records on-chain.

- Financial Inclusion: Empower unbanked families through secure, affordable digital payment options that simplify access to education.

## Tech Stack

- Solidity
- Js (React, Node, Express, ethers)
- Rainbowkit
- Wagmi
- Postgres(To store payment hashes and registered schools)

## Important

The tution payment project is in the following directories

- frontend ==> ./tution-ui
- contract ==> ./contract/contracts/Tution.sol
