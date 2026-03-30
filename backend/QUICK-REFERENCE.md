# Database Management - Quick Reference

## 🚨 Most Important Commands

### If you accidentally deleted data:
```bash
cd backend
node restore-database.js
```
**Then:**
1. Select your backup number from the list
2. Choose `yes` to clear existing data (or `no` to merge)
3. Data will be restored!

---

## ⚠️ Before Deleting Data

Always run these commands to create a backup:

### Delete ALL Bất Động Sản, Giao Dịch, và Người Dùng:
```bash
cd backend
node clear-all-data.js
# Type: DELETE_ALL
```

### Delete ONLY Bất Động Sản:
```bash
cd backend
node clear-properties.js
# Type: DELETE_PROPERTIES
```

### Delete ONLY Giao Dịch:
```bash
cd backend
node clear-transactions.js
# Type: DELETE_TRANSACTIONS
```

---

## 📁 Backup Locations

All backups are automatically saved in:
```
backend/backups/
├── backup-*.json              (Your data backup)
└── deletion-log-*.txt         (What was deleted and when)
```

**Important:** List backups by looking at their timestamps!

---

## 🔄 Common Workflows

### Workflow 1: Clean Database for Testing
```bash
# Step 1: Create backup
node clear-all-data.js
# Type: DELETE_ALL
# ✓ Backup created, all data deleted

# Step 2: Upload sample data through UI
# (or add your own properties)

# Step 3: When ready to restore original data
node restore-database.js
# Select the backup from when you cleaned it
```

### Workflow 2: Remove Old Listings But Keep Users
```bash
# Delete properties only
node clear-properties.js
# Type: DELETE_PROPERTIES
# ✓ Backup created, properties deleted

# Users can still upload new properties
# Original property data saved in backup/
```

### Workflow 3: Emergency Recovery
```bash
# If you see "❌ Error", immediately run:
node restore-database.js

# Pick the most recent backup (at top of list)
# This usually recovers 95%+ of data
```

---

## ✅ Safety Checklist

Before running `clear-all-data.js`:
- [ ] Do I really want to delete this data?
- [ ] Have I checked the backup folder?
- [ ] Is MongoDB running?
- [ ] Do I have time to wait while this processes?

**If unsure:** Just don't run the delete command!

---

## 🆘 Troubleshooting

### Q: I can't restore my data!
```
Không tìm thấy backup nào
```
**A:** 
- Backups must be in: `backend/backups/`
- Files must start with: `backup-` and end with `.json`
- The clear script was never run (no backup created)

**Solution:** Check if you have a `backups/` folder first!

---

### Q: The delete command hangs!
**A:** Press `Ctrl+C` to stop it. Something is wrong:
- MongoDB might not be running
- Network connection lost
- Database is locked

**Solution:** Restart MongoDB and try again

---

### Q: Can I undo a deletion without a restore?
**A:** ❌ No - that's why backups are so important!

**Always:**
1. Wait for confirmation prompt
2. Type the exact code (slower = safer)
3. Verify backup was created before deletion

---

## 📊 What Gets Backed Up?

When you run `clear-all-data.js`, backup includes:
- ✓ All Bất Động Sản (Address, Price, Images, etc.)
- ✓ All Giao Dịch (Buyer, Seller, Date, etc.)
- ✓ All Người Dùng (Agent accounts, info)
- ✓ Timestamp of backup
- ✓ Counts of each item

**File size:** Usually 50KB - 500KB depending on data

---

## 🎯 Best Practices

✅ **DO:**
- Read messages carefully
- Wait for confirmation prompt (don't rush)
- Keep backups for at least 1 month
- Test restoration before needing it
- Make notes of backup times

❌ **DON'T:**
- Delete backup files manually
- Run clear scripts without reading output
- Run during peak hours
- Share backup files publicly
- Ignore confirmation prompts

---

## 📞 Emergency Contact

If things go very wrong:
1. **Stop immediately:** Press Ctrl+C
2. **Don't run any more commands**
3. **Check backups folder:** `backend/backups/`
4. **Check MongoDB logs**
5. **Consider reverse-backup procedure**

---

**Last Updated:** 2024  
**Version:** 1.0  

For detailed information, see: [`DATABASE-MANAGEMENT.md`](./DATABASE-MANAGEMENT.md)
