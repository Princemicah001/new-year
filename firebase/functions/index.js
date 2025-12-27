const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// Save user token
exports.saveToken = functions.https.onRequest(async (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(400);

  await db.collection("tokens").doc(token).set({ token });
  res.sendStatus(200);
});

// Run DAILY at 11:59 PM
exports.dailyCountdown = functions.pubsub
  .schedule("59 23 * * *")
  .timeZone("Africa/Nairobi") // CHANGE if needed
  .onRun(async () => {
    const target = new Date("2026-01-01T00:00:00");
    const now = new Date();
    const diff = target - now;

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const mins = Math.floor((diff / 60000) % 60);

    const snapshot = await db.collection("tokens").get();
    const tokens = snapshot.docs.map(d => d.id);

    if (tokens.length === 0) return null;

    await admin.messaging().sendMulticast({
      tokens,
      data: {
        body: `${days} days, ${hours} hrs, ${mins} mins to New Year 2026 💖`
      }
    });

    return null;
  });
