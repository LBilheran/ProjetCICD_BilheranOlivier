#!/usr/bin/env node

import { program } from '@caporal/core';

program
  .command("add", "ajout d'un véhicule à la DB")
  .option("--code <code>", "code de 4 caractères")
  .option("--charge <charge>", "niveau de batterie")
  .option("--lng <lng>", "Longitude de la position du véhicule")
  .option("--lat <lat>", "Latitude de la position du véhicule")
  .option("-p, --port <port>", "Port du serveur à contacter")
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
  })

  .command("list", "Lister tous les véhicules")
  .option("-p, --port <port>", "Port du serveur à contacter", { validator: program.NUMBER })
  .action(async ({ logger: log, options: opts }) => {
    if (!opts.port) {
      log.error("Error: Missing required options.");
      return;
    }

    const endpoint = `http://localhost:${opts.port}/vehicles`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const vehicles = await response.json();
      if (vehicles.vehicles.length === 0) {
        log.info('No vehicles found.');
      } else {
        log.info('Vehicles:', vehicles);
      }
    } catch (error) {
      log.error('Error:', error);
    }
  })

  .command("delete", "delete un véhicule selon son ID")
  .option("--id <ID>", "ID du véhicule à détruire")
  .option("-p, --port <port>", "Port du serveur à contacter")
  .action(async ({ logger: log, options: opts }) => {
    if (!opts.port || !opts.id) {
      log.error("Error: Missing required options.");
      return;
    }

    const endpoint = `http://localhost:${opts.port}/vehicles/${opts.id}`;

    try {
      const apiResponse = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }
      else {
        log.info("Vehicle deleted successfully");
      }
    } catch (error) {
      log.error('Error:', error);
    }
  });

      
program.run();
  