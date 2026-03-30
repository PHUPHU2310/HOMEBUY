# Database Management Guide

## Overview

This guide provides instructions for managing the real estate database, including backups, cleanup operations, and data recovery procedures.

---

## Prerequisites

- Node.js installed
- MongoDB running locally or connection string configured in `.env`
- Backend dependencies installed (`npm install` in `backend/`)

---

## Quick Reference

| Command | Effect | Risky? | Backup Created? |
|---------|--------|--------|-----------------|
| `node restore-database.js` | Restore from backup file | ✓ (Safe - requires manual selection) | ✗ (No) |
| `node clear-all-data.js` | Delete ALL data | ⚠️ VERY RISKY | ✓ Yes |
| `node clear-properties.js` | Delete properties only | ⚠️ Risky | ✓ Yes |
| `node clear-transactions.js` | Delete transactions only | ⚠️ Risky | ✓ Yes |

---

## Backup Operations

### Automatic Backups

When you run any deletion script, a backup is **automatically created** before deletion:

```
backend/backups/
├── backup-YYYY-MM-DDTHH-mm-ss-mmmmZ.json          (full backup)
├── backup-properties-YYYY-MM-DDTHH-mm-ss-mmmmZ.json
└── backup-transactions-YYYY-MM-DDTHH-mm-ss-mmmmZ.json
```

**Important:** Backup files are created in `/backend/backups/` - Keep this directory safe!

---

## Database Cleanup Scripts

### 1. Clear All Data

**⚠️ WARNING: This deletes EVERYTHING - properties, transactions, AND users**

```bash
cd backend
node clear-all-data.js
```

**What happens:**
1. Displays count of items to be deleted
2. **Automatically creates a full backup**
3. Asks for confirmation: `DELETE_ALL`
4. Deletes all properties, transactions, and users
5. Creates log file in `backups/` directory

**Recovery:**
If you accidentally confirmed, restore with:
```bash
node restore-database.js
```
Select the most recent backup file.

---

### 2. Clear Properties Only

**⚠️ WARNING: Deletes all properties but keeps transactions and users**

```bash
cd backend
node clear-properties.js
```

**Steps:**
1. Shows property count
2. **Creates property backup**
3. Asks for confirmation: `DELETE_PROPERTIES`
4. Deletes all properties
5. Creates log file

---

### 3. Clear Transactions Only

**⚠️ WARNING: Deletes all transactions but keeps properties and users**

```bash
cd backend
node clear-transactions.js
```

**Steps:**
1. Shows transaction count
2. **Creates transaction backup**
3. Asks for confirmation: `DELETE_TRANSACTIONS`
4. Deletes all transactions
5. Creates log file

---

## Recovery & Restoration

### Restore from Backup

```bash
cd backend
node restore-database.js
```

**Process:**
1. Lists all available backups (most recent first)
2. Select backup by number
3. Shows what will be restored:
   - Number of properties
   - Number of transactions
   - Number of users
4. Ask if you want to clear existing data first
5. Restores data from selected backup

**Example:**
```
📋 Danh sách backup:
1. backup-2024-01-15T14-30-45-123Z.json
2. backup-2024-01-15T13-20-30-456Z.json
3. backup-2024-01-14T09-15-10-789Z.json

Chọn số backup (1-3): 1
```

---

## Backup File Format

Backup files are JSON with complete data export:

```json
{
  "timestamp": "2024-01-15T14:30:45.123Z",
  "properties": [...],
  "transactions": [...],
  "users": [...],
  "counts": {
    "properties": 25,
    "transactions": 10,
    "users": 5
  }
}
```

---

## Common Scenarios

### Scenario 1: Accidental Full Wipe

**What happened:**
```
node clear-all-data.js
# Accidentally typed "DELETE_ALL"
```

**Recovery:**
```bash
node restore-database.js
# Select the backup from before the deletion
```

---

### Scenario 2: Need to Remove Old Listings

**Goal:** Delete properties but keep user accounts and transactions

```bash
node clear-properties.js
# Type: DELETE_PROPERTIES
```

After deletion, you can add new properties through the app UI.

---

### Scenario 3: Backup Before Major Changes

**Best practice:** Always backup before making changes

```bash
# Run a clear script to trigger a backup (then cancel)
# OR manually copy the backup directory

# The last backup will be in:
# backend/backups/backup-*.json
```

---

## Troubleshooting

### MongoDB Connection Error

```
❌ Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Ensure MongoDB is running
- Check `.env` file has correct `MONGODB_URI`
- For local MongoDB, run: `mongod` or check Docker container

---

### Backup File Not Found

```
❌ Không tìm thấy backup nào
```

**Solution:**
- Check `backend/backups/` directory exists
- Backup files start with `backup-` and end with `.json`
- Upload data through the app first if no backups exist

---

### Cannot Restore Data

```
❌ Error: insertMany failed
```

**Possible causes:**
- Duplicate _id values in backup
- Schema mismatch between old and new
- MongoDB connection lost

**Solution:**
- Try clearing data first with `restore-database.js` → choose `yes` for clear
- Check MongoDB is running

---

## Best Practices

✅ **DO:**
- Regularly backup important data
- Test restores in a safe environment
- Keep backup directory secure
- Read confirmation messages carefully
- Note backup timestamps for reference

❌ **DON'T:**
- Run clear scripts in production without testing
- Delete backup files unless you're sure
- Share backup files with sensitive data
- Ignore confirmation prompts

---

## Database Structure

### Models

- **Property** - Real estate listings (address, price, images, amenities)
- **Transaction** - Purchase/sale records (buyer, seller, property, date)
- **User** - Agent and user accounts (email, password hash, avatar)

### Collections

```
mongodb://localhost:27017/real-estate
├── properties
├── transactions
└── users
```

---

## Emergency Contact

If you lose important data:

1. **Check upload directory:** `/backend/uploads/` for property images
2. **Check backups:** `/backend/backups/` for automatic backups
3. **Check logs:** Look for deletion-log files with timestamps
4. **Database logs:** MongoDB may have recovery options

---

## Version History

- **v1.0** (2024) - Initial database management scripts with auto-backup
  - Clear all data with confirmation
  - Clear properties only
  - Clear transactions only
  - Restore from backup
  - Automatic backup creation
  - Deletion logging

---

**Last Updated:** 2024
**Maintenance:** Regular backups recommended weekly
