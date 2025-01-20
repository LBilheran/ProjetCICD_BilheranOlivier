#!/usr/bin/env ts-node

import { program } from '@caporal/core';

program
  .command("add", "ajout d'un véhicule à la DB")
  .option("--code <code>", "code de 4 caractères")
  .option("--charge <charge>", "niveau de batterie")
  .option("--lng <lng>", "Longitude de la position du véhicule")
  .option("--lat <lat>", "Latitude de la position du véhicule")
  .option("--port <port>", "Port du serveur à contacter")
  .action(async ({ logger: log, options: opts }) => {
    if (!opts.code || !opts.charge || !opts.lng || !opts.lat || !opts.port) {
      log.error("Error: Missing required options.");
      return;
    }

    const endpoint = `http://localhost:${opts.port}/vehicles`;
    const vehicleData = {
      shortcode: opts.code,
      battery: opts.charge,
      longitude: opts.lng,
      latitude: opts.lat,
    };

    try {
      const apiResponse = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData),
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const result = await apiResponse.json();
      log.info("Vehicle added successfully:", result);
    } catch (err) {
      log.error("Error:", err);
    }
  });

program.run();
  