#!/usr/bin/env bash
# Migration script to fix username unique index problem
# Usage: DB=<dbName> COLLECTION=<collectionName> mongosh --file scripts/migrate-username-index.sh
# Example: DB=websterwork COLLECTION=users mongosh --file scripts/migrate-username-index.sh

DB_NAME=${DB:-websterwork}
COLLECTION=${COLLECTION:-users}

echo "Using DB: $DB_NAME, Collection: $COLLECTION"

cat <<'MONGO' | mongosh
// Connect to the correct database
const dbName = typeof DB !== 'undefined' ? DB : '$DB_NAME';
const collName = typeof COLLECTION !== 'undefined' ? COLLECTION : '$COLLECTION';
print('Switching to db: ' + dbName);
use(dbName);

// List indexes
print('Existing indexes:');
printjson(db[collName].getIndexes());

// Drop the old username index if it exists
try {
  const idxs = db[collName].getIndexes();
  if (idxs.some(i => i.name === 'username_1')) {
    db[collName].dropIndex('username_1');
    print('Dropped index username_1');
  } else {
    print('username_1 index not found');
  }
} catch (e) {
  print('Error dropping index: ' + e);
}

// Remove null usernames (unset the field) to avoid duplicate null entries
print('Cleaning documents with username: null');
const res = db[collName].updateMany({ username: null }, { $unset: { username: "" } });
printjson(res);

// Create the partial unique index for username only when it's a string
print('Creating partial unique index on username');
try {
  db[collName].createIndex({ username: 1 }, { unique: true, partialFilterExpression: { username: { $type: 'string' } } });
  print('Partial unique index created');
} catch (e) {
  print('Error creating partial index: ' + e);
}

print('Final indexes:');
printjson(db[collName].getIndexes());
MONGO
