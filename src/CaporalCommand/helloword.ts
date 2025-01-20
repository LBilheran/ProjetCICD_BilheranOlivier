#!/usr/bin/env ts-node

// Import de Caporal
import { program } from "@caporal/core";

// Le programme le plus simple qui imprime "Hello, world!"
program.action(({ logger }) => {
  logger.info("Hello, world!");
});

// Toujours exécuter le programme à la fin
export { program };
