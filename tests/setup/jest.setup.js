import {
  connectTestDB,
  clearTestDB,
  closeTestDB,
} from "./db.js";

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await closeTestDB();
});
