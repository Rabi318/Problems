# 🚗 Parking Lot System Design

A modular, extensible Parking Lot System built in **TypeScript** supporting various vehicle types, parking strategies, and hourly billing. This was designed to simulate real-world parking scenarios using clean OOP and SOLID principles.

---

## 📁 Folder Structure

```
parking-lot-system/
├── src/
│   ├── models/
│   │   ├── Vehicle.ts
│   │   ├── ParkingSlot.ts
│   │   ├── Floor.ts
│   │   └── Ticket.ts
│   ├── services/
│   │   ├── ParkingLot.ts
│   │   └── ParkingStrategy.ts
│   ├── strategies/
│   │   ├── DefaultParkingStrategy.ts
│   │   └── NearestFirstStrategy.ts
│   ├── utils/
│   │   └── TimeUtils.ts
│   └── index.ts
├── README.md
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## ✅ Features

### 1. **New Parking Strategy**

- Custom strategies are supported by implementing the `ParkingStrategy` interface.
- Included strategies:
  - `DefaultParkingStrategy` – first available slot.
  - `NearestFirstStrategy` – prioritizes nearest floor and lowest slot number.

### 2. **New Vehicle Types**

- Added `EV_CAR` and `CAR` to supported types.
- All vehicles extend the `Vehicle` class and are validated before assignment.

### 3. **Reserved EV Slot**

- Each floor reserves its **first slot** exclusively for EV cars.
- Non-EV vehicles cannot use EV-reserved slots.

### 4. **Hourly Parking Charges**

- Charges calculated on unpark using entry/exit timestamps:
  - `BIKE` → ₹10/hour
  - `CAR` → ₹20/hour
  - `EV_CAR` → ₹25/hour
  - `TRUCK` → ₹30/hour

---

## 💡 Assumptions

- First slot on each floor is always reserved for `EV_CAR`.
- A ticket is issued when parking, and required to unpark.
- Slot assignment is based on the chosen parking strategy.
- All times are treated as server times (local `Date` object).
- Billing is rounded up to the nearest full hour.

---
