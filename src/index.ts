import { connectDb, dbConfigFromEnv } from "./database";
import { setupApp } from "./app";
import { program } from "@caporal/core";
import { program as AddProg } from "./CaporalCommand/createvehicle";

export const port = process.env.PORT 
async function main() {
  let port = 8080;

  if (process.env.PORT) {
    port = parseInt(process.env.PORT, 10);
  }

  const db = await connectDb(dbConfigFromEnv());

  setupApp(db).listen(port, () => {
    console.log(`Server is running on port ${port.toString()}`);
  })
}

AddProg;

program.run();

main().catch((e: unknown) => { console.error(`Something went wrong ${e as string}`); });
